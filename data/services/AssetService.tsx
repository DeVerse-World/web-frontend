import { Contract, ethers } from "ethers";
import { assetAddress } from "../../config";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import CID from 'cids';
import AssetABI from '../../smart-contracts/artifacts/contracts/v2/Asset.sol/Asset.json'
import deverseClient from "../api/deverse_client";
import graphClient from "../api/graphql_client";
import Web3Modal from "web3modal";
import { NFTAsset } from "../model/nft_asset";
import CIDTool from 'cid-tool';
import { Event } from "@ethersproject/contracts";
import { AssetType } from "../enum/asset_type";
import { DeverseGraphResponse } from "../model/graph_response";
import { Failure, Result, Success } from "../model/Result";
import { ApiStrategy } from "./ApiStrategy";
import { BaseService } from "./BaseService";
import { Response } from "../model/response";

class AssetService extends BaseService {
    _oldUriPrefix = 'https://ipfs.infura.io/ipfs/'
    _uriPrefix = 'https://ipfs.io/ipfs/';

    // @ts-ignore
    _oldIpfsClient = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
    // TODO: Move these to secret
    projectId = "2EtZ9gieTPDmpdUQqSrPZYkdu10";
    projectSecret = "6010cb3d400ae981f10e2c40491a6aad";
    infuraAuth = "Basic " + Buffer.from(this.projectId + ":" + this.projectSecret).toString("base64");
    // @ts-ignore
    _ipfsClient = ipfsHttpClient({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: this.infuraAuth,
        },
    });
    assetContract: Contract = new ethers.Contract(assetAddress, AssetABI.abi, new ethers.providers.JsonRpcProvider(process.env.RPC_URL));
    transferSingleEventFilter: ethers.EventFilter = this.assetContract.filters.TransferSingle();

    // constructor() {
    //     super()
    //     this.transferSingleEventFilter = this.assetContract.filters.TransferSingle()
    // }

    getFullAssetUrl(path: string) {
        return `${this._uriPrefix}${path}`;
    }

    async uploadAsset(file: File, onProgress: (number) => void): Promise<string> {
        console.log("FILE\n")
        console.log(file);
        let res = await this._ipfsClient.add(
            file,
            {
                progress: (progress, path) => { onProgress(Math.round((progress / file.size) * 100)) }
            }
        )
        console.log(res.path);
        return `${this._uriPrefix}${res.path}`;
    }

    // Qm: CIDv0
    // bafy: CIDv1
    // f017...: bytes32 or base16 encoding
    // https://stackoverflow.com/questions/66927626/how-to-store-ipfs-hash-on-ethereum-blockchain-using-smart-contracts
    // # https://github.com/multiformats/js-cid-tool
    // const added = await client.add(data, { cidVersion: 1 })
    async createAsset(preAsset: NFTAsset): Promise<string> {
        console.log("ABOUT to create");
        const asset = await this._enrichOpenseaFields(preAsset);
        console.log(asset);
        const data = JSON.stringify(asset)
        let res = await this._ipfsClient.add(data);
        // https://ipfs.infura.io/ipfs/QmYMaUm2nRb5xPYSSuWmEJjP4zS5zkPqQng2Pt9oNEjUdH
        /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
        const url = `${this._uriPrefix}${res.path}`;
        let ipfsHashString = '0x' + CIDTool.format(CIDTool.base32(res.path), { base: 'base16' }).toString().slice(9);
        /* next, create the item */
        const tokenId = await this.mint(ApiStrategy.REST, ipfsHashString, asset.supply);
        this.notifyMinted(asset, tokenId)
        return res.path;
    }

    async _enrichOpenseaFields(asset: NFTAsset): Promise<NFTAsset> {
        console.log("Enrich Opensea Field");
        console.log(asset)
        asset.animation_url = asset.file3dUri;
        if (asset.assetType == AssetType.IMAGE_2D) {
            asset.image = asset.fileAssetUri;
        } else {
            asset.image = asset.file2dUri;
        }
        console.log(asset)
        asset.image = await this._cidFullV0ToFullV1Base32(asset.image);
        if (asset.animation_url != "") {
            asset.animation_url = await this._cidFullV0ToFullV1Base32(asset.animation_url);
        }
        return asset;
    }

    async _cidFullV0ToFullV1Base32(fullV0: string): Promise<string> {
        let CIDv0 = fullV0.replace(this._uriPrefix, "");
        let CIDv1 = new CID(CIDv0).toV1().toString('base32');
        return `https://${CIDv1}.ipfs.infura-ipfs.io/`;
    }

    async mint(apiStrategy: ApiStrategy, ipfsHashString, supply) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()

        let assetContract = new ethers.Contract(assetAddress, AssetABI.abi, signer)
        const creator = await signer.getAddress();
        const packId = 1;
        const hash = ipfsHashString;
        const rarity = 0;
        const owner = await signer.getAddress();
        const data = '0x';
        switch (apiStrategy) {
            case ApiStrategy.REST:
                let transaction = await assetContract.mint(creator, packId, hash, supply, rarity, owner, data, 0);
                let receipt = await transaction.wait()
                const event = receipt?.events?.filter(
                    (event: Event) => event.event === 'TransferSingle'
                )[0];
                if (!event) {
                    throw new Error('no TransferSingle event after mint single');
                }
                return BigInt(event.args?.id._hex).toString();
                break;
            case ApiStrategy.GraphQl:
                throw new Error("Graphql not supported here")
                break;
            default:
                throw new Error("Unrecognized api ")
                break;
        }
    }

    async getAll(apiStrategy: ApiStrategy, page: number = 1, filter: any = null): Promise<NFTAsset[]> {
        let data: NFTAsset[] = [];
        let parallelJobs: Promise<NFTAsset>[] = [];
        switch (apiStrategy) {
            case ApiStrategy.REST:
                let transferEvents = await this.assetContract.queryFilter(this.transferSingleEventFilter);
                transferEvents.forEach((transferEvent) => {
                    parallelJobs.push(new Promise<NFTAsset>(async (resolve, reject) => {
                        let [_, from, to, id, supply] = transferEvent.args;
                        if (from == 0) { // from mint event
                            // const tokenUri = await this.assetContract.uri2(id)
                            // const tokenFullUri = `https://bafybei${tokenUri}.ipfs.infura-ipfs.io`
                            let tokenFullUri = await this.assetContract.uri(id)
                            this._getAssetFromEther(tokenFullUri).then(res => {
                                if (res.isFailure()) {
                                    reject(res.error)
                                } else {
                                    resolve(res.getValue())
                                }
                            })
                        } else {
                            reject('this is not from mint event')
                        }
                    }));
                })
                data = await Promise.all(parallelJobs)
                break;
            case ApiStrategy.GraphQl:
                const query = `{
                    assetTokens {
                        id
                        tokenURI
                        supply
                        isNFT
                    }
                }`;
                const graphRes = await graphClient.request<DeverseGraphResponse>({
                    method: 'post',
                    data: {
                        query,
                    }
                })
                let assetTokens = graphRes.data.data.assetTokens;
                assetTokens.forEach((token) => {
                    parallelJobs.push(new Promise<NFTAsset>(async (resolve, reject) => {
                        this._getAssetFromEther(token.tokenURI).then(res => {
                            if (res.isFailure()) {
                                reject(res.error)
                            } else {
                                resolve(res.getValue())
                            }
                        })
                    }));
                })
                const res = await Promise.allSettled(parallelJobs)
                res.forEach(assetRes => {
                    if (assetRes.status == "fulfilled") {
                        data.push(assetRes.value)
                    }
                })
                 
                break;
            default:
                throw new Error("Unrecognized api ")
                break;
        }
        // for (let i =0; i< 20; i++) {
        //     data.push(data);
        // }
        return data;
    }

    async _getAssetFromEther(tokenFullUri: string): Promise<Result<NFTAsset>> {
        const response = await deverseClient.get<NFTAsset>(tokenFullUri);
        if (response.status != 200) {
            return new Failure(new Error(response.statusText));
        }
        const asset = response.data;
        asset.fileAssetUri = asset.fileAssetUri.replace(this._oldUriPrefix, this._uriPrefix)
        asset.file2dUri = asset.file2dUri.replace(this._oldUriPrefix, this._uriPrefix)
        asset.file3dUri = asset.file3dUri.replace(this._oldUriPrefix, this._uriPrefix)
        return new Success(asset);
    }

    async checkName(name: string) {
        const response = await deverseClient({
            method: "get",
            url: `/nft/checkName?name=${name}`,
            withCredentials: true
        });
        return response;
    }

    async fetchUserAssets(walletAddress: string): Promise<Result<NFTAsset[]>> {
        const query = `{
            owners(where: {id: "${walletAddress.toLocaleLowerCase()}"}) {
                id
                numAssets
                timestamp
                assetTokens {
                    id
                    token{
                        id
                        supply
                        isNFT
                        tokenURI
                    }
                }
            }
        }`;
        let res = await graphClient.post<DeverseGraphResponse>('', {
            query
        });
        if (res.status != 200) {
            return new Failure(new Error(res.statusText));
        }
        let owners = res.data.data.owners;
        if (owners[0] != null) {
            let assets = owners[0].assetTokens.map(o => {
                let asset: NFTAsset = {
                    id: o.id,
                    tokenURI: o.token.tokenURI,
                    supply: o.token.supply
                }
                return asset;
            });
            return new Success(assets);

        }
        return new Success([]);
    }

    notifyMinted(asset: NFTAsset, tokenId: string) {
        deverseClient({
            method: "post",
            url: `/nft/notifyMinted`,
            data: {
                minted_nft: {
                    token_address: assetAddress, token_id: tokenId, name: asset.name, description: asset.description,
                    supply: asset.supply, file_asset_uri: asset.fileAssetUri, file_asset_name: asset.fileAssetName,
                    file_asset_uri_from_centralized: asset.fileAssetUriFromCentralized, file_2d_uri: asset.file2dUri,
                    file_3d_uri: asset.file3dUri, asset_type: asset.assetType,
                }
            },
            withCredentials: true
        });
    }
}

export default new AssetService();