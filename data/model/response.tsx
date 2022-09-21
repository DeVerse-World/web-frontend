import { Avatar } from "./avatar";
import { Event } from "./Event";
import { DerivSubworldTemplates, RootSubworldTemplates, SubworldTemplate } from "./SubworldTemplate";
import { User } from "./user";

export class Response<T> {
    message: string;
    data: T;
    error: string;
}

export class GetAvatarResponse {
    avatars: Avatar[]
}

export class AvatarResponse {
    avatar: Avatar
}

export type GetAccountResponse = Readonly<{
    user: User,
    require_auth?: boolean,
}>

export type GetUserProfileResponse = Readonly<{
    avatars: Avatar[],
    created_deriv_subworld_templates: DerivSubworldTemplates[],
    created_events: Event[],
    created_root_subworld_templates: RootSubworldTemplates[],
    user: User
}>

export type EventResponse = {
    events: Event[]
}

export type RootSubworldTemplatesResponse = {
    subworld_templates: RootSubworldTemplates[];
}

export type RootSubworldTemplateResponse = {
    subworld_template: RootSubworldTemplates;
}

export type DerivSubworldTemplateResponse = {
    subworld_templates: DerivSubworldTemplates[];
}