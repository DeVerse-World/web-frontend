import { Avatar } from "./avatar";
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

export type GetAccountResponse = {
    user: User,
    require_auth?: boolean,
}
