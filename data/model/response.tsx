import { Avatar } from "./avatar";

export class Response<T> {
    message: string;
    data: T;
}

export class GetAvatarResponse {
    avatars: Avatar[]
}

export class CreateAvatarResponse {
    avatar: Avatar
}