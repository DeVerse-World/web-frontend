import apiClient from "../api/deverse_client";
import { CreateAvatarResponse, GetAvatarResponse, Response } from "../model/response";

class AvatarService {
    createAvatar(rpmUrl: string) {
        apiClient.post<Response<CreateAvatarResponse>>('avatar', {
            avatar: {
                preprocess_url: rpmUrl
            },
        }, {
            withCredentials: true
        }).then((value) => {
            //TODO: do something with avatar
            console.log(value.data.data.avatar)
            window.alert("Successfully create/ update avatar in DB")
        }).catch((e) => {
            console.log(e);
            window.alert("Fail to create avatar in DB " + e)
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
            `avatar/${avatarId}`, {
                withCredentials: true
            }
        )
    }
}

export default new AvatarService();