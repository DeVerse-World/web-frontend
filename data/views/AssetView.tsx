import { AssetType } from "../enum/asset_type";

export type AssetView = {
    id?: string;
    tokenURI?: string;
    supply?: number;
    name?: string;
    description?: string;
    fileAssetUri?: string;
    assetType?: AssetType;

    image?: string;
    animation_url?: string;

    deletable?: boolean;
    onlineOpenable?: boolean;
    offlineOpenable?: boolean;
    rootId?: string;
}