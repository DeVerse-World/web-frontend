import deverseClient from "../api/deverse_client";
import { Response } from "../model/response";

class SubWorldTemplateService {
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