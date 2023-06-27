import { RootSubworldTemplateResponse } from "./response"

export type SubworldTemplate = {
    id: number,
    file_name: string,
    display_name: string,
    level_ipfs_uri: string,
    level_centralized_uri: string,
    thumbnail_centralized_uri: string,
    rating: number,
    creator_id: number,
    created_at: string,
    updated_at: string
}

export type SubworldCreatorInfo = {
    Id: number,
    Name: string,
}

export type DerivSubworldTemplate = {
    parent_subworld_template_id: number,
} & SubworldTemplate

export type RootSubworldTemplate = {
    derivative_uri: string
} & SubworldTemplate

export type RootEnrichedSubworldTemplate = {
    Template: RootSubworldTemplate,
    CreatorInfo: SubworldCreatorInfo,
}
export type IncrementStatsResponse = {
    message: string;
    data:
    RootSubworldTemplateResponse
}