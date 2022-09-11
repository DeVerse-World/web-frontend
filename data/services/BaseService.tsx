import { AxiosResponse } from "axios";
import { Response } from "../model/response";
import { Failure, Success } from "../model/Result";

export class BaseService {
    parseResponse<T>(response: AxiosResponse<Response<T>>) {
        if (response.status != 200) {
            return new Failure(new Error(response.statusText));
        }
        return new Success(response.data.data);
    }
    // constructor() {
    //     console.log("base service rpc endpoint " + process.env.RPC_URL);
    //     this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // }
}