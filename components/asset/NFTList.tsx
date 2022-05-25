import { Label } from 'semantic-ui-react'
import BaseService from "../../data/services/base_service";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import { Image } from "react-bootstrap";

type NFTListProps = {
    data: NFTAsset[];
    assetType?: AssetType;
}

function NftItem(nft: NFTAsset, index: number) {

    const get2dImage = (nft: NFTAsset) => {
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri
    }

    return (
        <div key={index} className="deverse-border w-[250px] h-[450px] bg-black/[.4] shadow rounded-xl text-white overflow-hidden">
            <div className="flex justify-center h-[225px] p-4 ">
                <Image src={get2dImage(nft)} />
            </div>

            <div className="p-4">
                <p className="text-2xl font-semibold ">{nft.name}</p>
                <div>
                    <p className="text-gray-400">{nft.description}</p>
                </div>
                <Label color='black'>
                    <Label.Detail>{nft.assetType}</Label.Detail>
                    <Label.Detail className="p-1">
                        <a href={nft.file3dUri} target="_blank">
                            <Image src={"/images/ic-download.png"} width={32} height={32} />
                        </a>
                    </Label.Detail>
                </Label>
            </div>
        </div>
    )
}

export default function NFTList(props: NFTListProps) {
    return (
        <div className="p-4 min-h-[60vh]" >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                    props.data.map((nft, i) => NftItem(nft, i))
                }
            </div>
        </div>
    )
}