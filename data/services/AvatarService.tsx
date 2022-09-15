import deverseClient from "../api/deverse_client";
import { Avatar } from "../model/avatar";
import { AvatarResponse, GetAvatarResponse, Response } from "../model/response";

class AvatarService {
    createAvatar(rpmUrl: string) {
        deverseClient.post<Response<AvatarResponse>>('avatar', {
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
    getAvatars(walletAddress: string) {
        deverseClient.get<Response<GetAvatarResponse>>(`wallet/getAvatars/${walletAddress}`).then(e => {
            //TODO: 
            console.log(e.data.data.avatars)
        })
    }

    async getAvatar(avatarId: number) : Promise<Avatar> {
        let res = await deverseClient.get<Response<AvatarResponse>>(`avatar/${avatarId}`);
        return res.data.data.avatar;
    }

    async deleteAvatar(avatarId: string) : Promise<Response<any>> {
        let res = await deverseClient.delete<Response<any>>(
            `avatar/${avatarId}`, {
                withCredentials: true
            }
        )
        return res.data;
    }
}

export default new AvatarService();