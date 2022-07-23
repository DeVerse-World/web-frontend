import apiClient from "../api/deverse_client";
import { CreateAvatarResponse, GetAvatarResponse, Response } from "../model/response";

class AvatarService {
    createAvatar(rpmUrl: string) {
        apiClient.post<Response<CreateAvatarResponse>>('avatar', {
            avatar: {
                preprocess_url: rpmUrl
            }
        }).then((value) => {
            //TODO: do something with avatar
            console.log(value.data.data.avatar)
        }).catch((e) => {
            console.log(e);
        })
    }
    getAvatar(walletAddress: string) {
        apiClient.get<Response<GetAvatarResponse>>(`wallet/getAvatars/${walletAddress}`).then(e => {
            //TODO: 
            console.log(e.data.data.avatars)
        })
    }
    deleteAvatar(avatarId: string) {
        apiClient.delete(
            `avatar/${avatarId}`,
        )
    }
}

export default new AvatarService();