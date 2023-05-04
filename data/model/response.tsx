import { Avatar } from "./avatar";
import { Event } from "./Event";
import { DerivSubworldTemplate, RootSubworldTemplate, RootEnrichedSubworldTemplate } from "./SubworldTemplate";
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

export type GetAccountResponse = {
    user: User,
    require_auth?: boolean,
}

export type GetUserProfileResponse = Readonly<{
    avatars: Avatar[],
    created_deriv_subworld_templates: DerivSubworldTemplate[],
    created_events: Event[],
    created_root_subworld_templates: RootSubworldTemplate[],
    user: User
}>

export type EventResponse = {
    events: Event[]
}

export type RootSubworldTemplatesResponse = {
    enriched_subworld_templates: RootEnrichedSubworldTemplate[];
    subworld_templates: RootSubworldTemplate[];
}

export type RootSubworldTemplateResponse = {
    subworld_template: RootSubworldTemplate;
}

export type LoginResponse = {
    login_url: string;
}