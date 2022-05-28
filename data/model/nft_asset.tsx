import { AssetType } from "../enum/asset_type";

export type NFTAsset = {
    tokenUri?: string;
    supply: number;
    name: string;
    description?: string;
    fileAssetUri: string;
    fileAssetName: string;
    file2dUri?: string;
    file3dUri?: string;
    assetType: AssetType;
}