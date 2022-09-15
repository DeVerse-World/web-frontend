export type SubworldTemplate = {
    id: number,
    file_name: string,
    display_name: string,
    level_ipfs_uri: string,
    level_centralized_uri: string,
    thumbnail_centralized_uri: string,
    creator_id: number,
    created_at: string,
    updated_at: string
}

export type DerivSubworldTemplates = {
    parent_subworld_template_id: number,
} & SubworldTemplate

export type RootSubworldTemplates = {
    derivative_uri: string
} & SubworldTemplate