import BaseService from "./base_service";
import {Contract, ethers} from "ethers";
import {assetAddress} from "../../config";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import CID from 'cids';
import AssetABI from '../../smart-contracts/artifacts/contracts/v2/Asset.sol/Asset.json'
import axios from "../api/axios";
import Web3Modal from "web3modal";
import {NFTAsset} from "../model/nft_asset";
import CIDTool from 'cid-tool';
import {Event} from "@ethersproject/contracts";
import {AssetType} from "../enum/asset_type";
import ApiStrategy = BaseService.ApiStrategy;

class AssetService extends BaseService {
    _uriPrefix = 'https://ipfs.infura.io/ipfs/';
    // @ts-ignore
    _ipfsClient = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

    assetContract: Contract = null
    transferSingleEventFilter = null

    constructor() {
        super()
        this.assetContract = new ethers.Contract(assetAddress, AssetABI.abi, this.provider)
        this.transferSingleEventFilter = this.assetContract.filters.TransferSingle()
    }

    getFullAssetUrl(path: string) {
        return `${this._uriPrefix}${path}`;
    }

    async uploadAsset(file: File, onProgress: (number) => void): Promise<string> {
        let res = await this._ipfsClient.add(
            file,
            {
                progress: (progress, path) => { onProgress(Math.round((progress / file.size) * 100)) }
            }
        )
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
        asset.animation_url = asset.file3dUri;
        if (asset.assetType == AssetType.IMAGE_2D) {
            asset.image = asset.fileAssetUri;
        } else {
            asset.image = asset.file2dUri;
        }
        asset.image = await this._cidFullV0ToFullV1Base32(asset.image);
        if (asset.animation_url != "") {
            asset.animation_url = await this._cidFullV0ToFullV1Base32(asset.animation_url);
        }
        return asset;
    }

    async _cidFullV0ToFullV1Base32(fullV0: string): Promise<string> {
        let CIDv0 = fullV0.replace("https://ipfs.infura.io/ipfs/", "");
        let CIDv1 = new CID(CIDv0).toV1().toString('base32');
        return `https://${CIDv1}.ipfs.infura-ipfs.io/`;
    }

    async mint(apiStrategy: BaseService.ApiStrategy, ipfsHashString, supply) {
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
            case BaseService.ApiStrategy.REST:
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
            case BaseService.ApiStrategy.GraphQl:
                throw new Error("Graphql not supported here")
                break;
            default:
                throw new Error("Unrecognized api ")
                break;
        }
    }

    async getAll(apiStrategy: BaseService.ApiStrategy): Promise<NFTAsset[]> {
        let data: NFTAsset[] = [];

        switch (apiStrategy) {
            case BaseService.ApiStrategy.REST:
                let transferEvents = await this.assetContract.queryFilter(this.transferSingleEventFilter);
                let parallelJobs: Promise<Promise<NFTAsset>>[] = [];
                for (let i = 0; i < transferEvents.length; i++) {
                    parallelJobs.push(new Promise<Promise<NFTAsset>>(async (resolve) => {
                        resolve(this._fetchAssetFromEther(transferEvents[i]));
                    }));
                }
                data = await Promise.all(parallelJobs)
                break;
            case BaseService.ApiStrategy.GraphQl:
                throw new Error("Graphql not supported here")
                break;
            default:
                throw new Error("Unrecognized api ")
                break;
        }
        return data;
    }

    async _fetchAssetFromEther(data: ethers.Event): Promise<NFTAsset> {
        let [_, from, to, id, supply] = data.args;
        if (from == 0) { // from mint event
            // const tokenUri = await this.assetContract.uri2(id)
            // const tokenFullUri = `https://bafybei${tokenUri}.ipfs.infura-ipfs.io`
            const tokenFullUri = await this.assetContract.uri(id)
            const meta = await axios.get(tokenFullUri)
            if (meta == null || meta.data == null) {
                return null
            }
            return ({
                tokenUri: tokenFullUri,
                supply: meta.data.supply, name: meta.data.name, description: meta.data.description,
                assetType: meta.data.assetType, fileAssetUri: meta.data.fileAssetUri,
                file2dUri: meta.data.file2dUri, file3dUri: meta.data.file3dUri,
                fileAssetName: meta.data.fileAssetName,
            })
        }
        return null;
    }

    async checkName(name: string) {
        const response = await axios({
            method: "get",
            url: `/nft/checkName?name=${name}`,
        });
        return response;
    }

    async notifyMinted(asset: NFTAsset, tokenId) {
        await axios({
            method: "post",
            url: `/nft/notifyMinted`,
            data: {
                minted_nft: {
                    token_address: assetAddress, token_id: tokenId.toString(), name: asset.name, description: asset.description,
                    supply: parseInt(asset.supply.toString()), file_asset_uri: asset.fileAssetUri, file_asset_name: asset.fileAssetName,
                    file_asset_uri_from_centralized: asset.fileAssetUriFromCentralized, file_2d_uri: asset.file2dUri,
                    file_3d_uri: asset.file3dUri, asset_type: asset.assetType,
                }
            },
        });
    }
}

export default new AssetService();