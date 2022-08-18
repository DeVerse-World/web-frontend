import {ethers} from "ethers";

export class BaseService {
    provider: ethers.providers.JsonRpcProvider = null

    constructor() {
        console.log("base service rpc endpoint " + process.env.RPC_URL);
        this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    }
}

export namespace BaseService {
    export enum ApiStrategy {
        REST = 0,
        GraphQl = 1
    }
}

export default BaseService;
