import deverseClient from "../api/deverse_client";
import { Response, RootSubworldTemplateResponse } from "../model/response";
import { BaseService } from "./BaseService";

class SubWorldTemplateService extends BaseService {
    async fetchTemplates() {

    }

    async fetchRootTemplates() {
        let res = await deverseClient.get<Response<RootSubworldTemplateResponse>>('subworld/root_template');
        return this.parseResponse(res);
    }

    async fetchDerivTemplates(rootId: string) {
        let res = await deverseClient.get<Response<RootSubworldTemplateResponse>>(`subworld/root_template/${rootId}/deriv`);
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
}

export default new SubWorldTemplateService();