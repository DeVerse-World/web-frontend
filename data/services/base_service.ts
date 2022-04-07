import {ethers} from "ethers";

export class BaseService {
    rpcEndpoint = null
    provider = null

    constructor() {
        if (process.env.RPC_URL) {
            this.rpcEndpoint = process.env.RPC_URL
        }
        this.provider = new ethers.providers.JsonRpcProvider(this.rpcEndpoint)
    }
}

export namespace BaseService {
    export enum ApiStrategy {
        REST = 0,
        GraphQl = 1
    }
}

export default BaseService;
