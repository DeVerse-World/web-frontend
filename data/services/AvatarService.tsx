import deverseClient from "../api/deverse_client";
import { Avatar } from "../model/avatar";
import { AvatarResponse, GetAvatarResponse, Response } from "../model/response";
import { BaseService } from "./BaseService";

class AvatarService extends BaseService {
    createAvatar(name: string, rpmUrl: string, avatarUrl: string) {
        return deverseClient.post<Response<AvatarResponse>>('avatar', {
            avatar: {
                name: name,
                preprocess_url: rpmUrl,
                postprocess_url: avatarUrl
            },
        }, {
            withCredentials: true
        })
    }

    async get2DAvatarRPM(glbPath: string): Promise<any> {
        let res = await deverseClient.post('render', {
            model: glbPath,
            scene: "fullbody-portrait-v1",
            armature: "ArmatureTargetMale",
        }, {
            baseURL: 'https://render.readyplayer.me'
        });
        return res.data.renders[0];
    }

    async getAvatars(userId: number) {
        const res = await deverseClient.get<Response<GetAvatarResponse>>(`user/profile/${userId}/getAvatars`)
        return this.parseResponse<GetAvatarResponse>(res)
    }

    async getAvatar(avatarId: number): Promise<Avatar> {
        let res = await deverseClient.get<Response<AvatarResponse>>(`avatar/${avatarId}`);
        return res.data.data.avatar;
    }

    async deleteAvatar(avatarId: string): Promise<Response<any>> {
        let res = await deverseClient.delete<Response<any>>(
            `avatar/${avatarId}`, {
            withCredentials: true
        })
        return res.data;
    }
}

export default new AvatarService();