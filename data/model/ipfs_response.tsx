export type EventUriResponse = {
    duration: string;
    file_uri: string;
    file_type: string;
    thumbnail_image: string;
}

export type TemplateDetailResponse = {
    helpers: string[];
    twitter: string;
    youtube: string;
    facebook: string;
    ipfs_uri: string;
    descriptions: string[];
    centralized_uri: string;
    loading_image_url: string;
    ipfs_loading_image_uri: string;
}