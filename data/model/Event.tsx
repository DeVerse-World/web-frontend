import { EventCategory } from "../enum/asset_type";

export type Event = {
    id: number;
    max_num_participants: number;
    allow_temporary_hold: number;
    event_config_uri: string;
    name: string;
    category: EventCategory;
    stage: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}