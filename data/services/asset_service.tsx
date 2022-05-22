import BaseService from "./base_service";
import { Contract, ethers } from "ethers";
import { assetAddress } from "../../config";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import AssetABI from '../../smart-contracts/artifacts/contracts/v2/Asset.sol/Asset.json'
import axios from 'axios'
import Web3Modal from "web3modal";
import { NFTAsset } from "../model/nft_asset";
import CIDTool from 'cid-tool';
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
    async createAsset(asset: NFTAsset): Promise<string> {
        const data = JSON.stringify(asset);
        let res = await this._ipfsClient.add(data);
        // https://ipfs.infura.io/ipfs/QmYMaUm2nRb5xPYSSuWmEJjP4zS5zkPqQng2Pt9oNEjUdH
        /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
        const url = `${this._uriPrefix}${res.path}`;
        console.log(url)
        let ipfsHashString = '0x' + CIDTool.format(CIDTool.base32(res.path), { base: 'base16' }).toString().slice(9);
        /* next, create the item */
        this.mint(ApiStrategy.REST, ipfsHashString, asset.supply);
        return res.path;
    }

    async getAll(apiStrategy: BaseService.ApiStrategy): Promise<NFTAsset[]> {
        let data: NFTAsset[] = [];

        switch (apiStrategy) {
            case BaseService.ApiStrategy.REST:
                console.log("getAll");
                let id = 1
                let transferEvents = await this.assetContract.queryFilter(this.transferSingleEventFilter)
                for (let i = 0; i < transferEvents.length; i++) {
                    let [_, from, to, id, supply] = transferEvents[i].args;
                    if (from == 0) { // from mint event
                        const tokenUri = await this.assetContract.uri2(id)
                        const tokenFullUri = `https://bafybei${tokenUri}.ipfs.infura-ipfs.io`
                        const meta = await axios.get(tokenFullUri)
                        console.log(meta.data);
                        data.push({
                            tokenUri: tokenFullUri,
                            supply: meta.data.supply, name: meta.data.name, description: meta.data.description,
                            assetType: meta.data.assetType, fileAssetUri: meta.data.fileAssetUri,
                            file2dUri: meta.data.file2dUri, file3dUri: meta.data.file3dUri,
                        })
                    }
                }
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
                await transaction.wait()
                break;
            case BaseService.ApiStrategy.GraphQl:
                throw new Error("Graphql not supported here")
                break;
            default:
                throw new Error("Unrecognized api ")
                break;
        }
    }
}

export default new AssetService();