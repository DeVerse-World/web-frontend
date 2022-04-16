import {Asset} from "../model/asset";
import BaseService from "./base_service";
import {ethers} from "ethers";
import {assetAddress} from "../../config";
import AssetABI from '../../../smart-contracts/artifacts/contracts/v2/Asset.sol/Asset.json'
import axios from 'axios'
import Web3Modal from "web3modal";

class AssetService extends BaseService {
    assetContract = null
    transferSingleEventFilter = null

    constructor() {
        super()
        this.assetContract = new ethers.Contract(assetAddress, AssetABI.abi, this.provider)
        this.transferSingleEventFilter = this.assetContract.filters.TransferSingle()
    }

    async getAll(apiStrategy: BaseService.ApiStrategy): Promise<Asset[]> {
        let data: Asset[] = [];

        switch (apiStrategy) {
            case BaseService.ApiStrategy.REST:
                console.log("getAll");
                let id = 1
                let transferEvents = await this.assetContract.queryFilter(this.transferSingleEventFilter)
                for (let i = 0; i < transferEvents.length; i ++) {
                    let [_, from, to, id, supply] = transferEvents[i].args;
                    if (from == 0) { // from mint event
                        const tokenUri = await this.assetContract.uri2(id)
                        const tokenFullUri = `https://bafybei${tokenUri}.ipfs.infura-ipfs.io`
                        const meta = await axios.get(tokenFullUri)
                        data.push({
                            tokenUri: tokenFullUri,
                            supply: meta.data.supply, name: meta.data.name, description: meta.data.description,
                            assetType: meta.data.assetType, fileUri: meta.data.fileUrl,
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
        console.log(data);
        return data;
    }

    async mint(apiStrategy: BaseService.ApiStrategy, ipfsHashString, supply) {

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        console.log(signer);

        let assetContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", AssetABI.abi, signer)
        const creator = await signer.getAddress();
        const packId = 1;
        const hash = ipfsHashString;
        const rarity = 0;
        const owner = await signer.getAddress();
        const data = '0x';
        console.log("HERE");
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