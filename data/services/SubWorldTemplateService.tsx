import { URI } from "../../smart-contracts/AssetSubgraph/generated/Asset/Asset";
import deverseClient from "../api/deverse_client";
import { Response, RootSubworldTemplateResponse, RootSubworldTemplatesResponse } from "../model/response";
import { BaseService } from "./BaseService";

class SubWorldTemplateService extends BaseService {
    async fetchTemplates() {

    }

    async fetchRootTemplate(id: string) {
        let res = await deverseClient.get<Response<RootSubworldTemplateResponse>>(`subworld/template/${id}`);
        return this.parseResponse(res);
    }

    async fetchRootTemplates() {
        let res = await deverseClient.get<Response<RootSubworldTemplatesResponse>>('subworld/root_template');
        return this.parseResponse(res);
    }

    async fetchDerivTemplates(rootId: string) {
        let res = await deverseClient.get<Response<RootSubworldTemplatesResponse>>(`subworld/root_template/${rootId}/deriv`);
        return this.parseResponse(res);
    }

    async deleteRootTemplate(rootTemplateId: string) {
        let res = await deverseClient.delete<Response<any>>(`subworld/root_template/${rootTemplateId}`);
        return res;
    }

    async deleteDerivTemplate(rootTemplateId: string, derivTemplateId: string) {
        let res = await deverseClient.delete<Response<any>>(`subworld/root_template/${rootTemplateId}/deriv/${derivTemplateId}`);
        return res;
    }

    async createRootTemplate(fileName: string, displayName: string, levelIpfsUri: string, levelCentralizedUri: string, thumbnailUri: string) {
        let res = await deverseClient.post<Response<RootSubworldTemplateResponse>>(`subworld/root_template`, {
            subworld_template: {
                file_name: fileName,
                display_name: displayName,
                level_ipfs_uri: levelIpfsUri || "",
                level_centralized_uri: levelCentralizedUri || "",
                thumbnail_centralized_uri: thumbnailUri || ""
            }
        }, {
            withCredentials: true
        });
        return this.parseResponse(res);
    }

    async createDerivTemplate(fileName: string, displayName: string, thumbnailUri: string, rootId: string) {
        let res = await deverseClient.post<Response<RootSubworldTemplateResponse>>(`subworld/root_template/${rootId}/deriv`, {
            subworld_template: {
                file_name: fileName,
                display_name: displayName,
                thumbnail_centralized_uri: thumbnailUri || "",
                derivative_uri: "google.com"
            }
        }, {
            withCredentials: true
        });
        return this.parseResponse(res);
    }
}

export default new SubWorldTemplateService();