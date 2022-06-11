import { AssetType } from "../enum/asset_type";

export type NFTAsset = {
    tokenUri?: string;
    supply: number;
    name: string;
    description?: string;
    fileAssetUri: string;
    fileAssetName: string;
    fileAssetUriFromCentralized?: string;
    file2dUri?: string;
    file3dUri?: string;
    assetType: AssetType;
    image?: string;
    animation_url?: string;
}