import { Avatar } from "./avatar";
import { SubworldTemplate } from "./SubworldTemplate";
import {User} from "./user";

export class Response<T> {
    message: string;
    data: T;
    error: string;
}

export class GetAvatarResponse {
    avatars: Avatar[]
}

export class CreateAvatarResponse {
    avatar: Avatar
}

export type GetAccountResponse = Readonly<{
    user: User,
    require_auth?: boolean,
}>

export type GetUserProfileResponse = Readonly<{
    avatars: any[],
    created_deriv_subworld_templates: SubworldTemplate[],
    created_events: any[],
    created_root_subworld_templates: SubworldTemplate[],
    user: User
}>