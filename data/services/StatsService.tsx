import { string } from "hardhat/internal/core/params/argumentTypes";
import { URI } from "../../smart-contracts/AssetSubgraph/generated/Asset/Asset";
import deverseClient from "../api/deverse_client";
import { TemplateDetailResponse } from "../model/ipfs_response";
import { IncrementStatsResponse } from "../model/SubworldTemplate";
import { BaseService } from "./BaseService";


export enum IncrementTypes {
    CLICKS = "num_clicks",
    VIEWS = "num_views",
    PLAYS = "num_plays",
}
// click play = num play
// click to details = num click
// display on screen = num views

class StatsService extends BaseService {
    async incrementStats(id: string, type: IncrementTypes) {
        const uri = `subworld/template/${id}/incrementStats?type=${type}`;
        try {
            
        const res = await deverseClient.post<Response<IncrementStatsResponse>>(uri);        
        return this.parseResponse(res);
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default new StatsService();