import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
type NFTListProps = {
    data: NFTAsset[];
    assetType?: AssetType;
    onOpen: (NFTAsset) => void;
}

export default function NFTList(props: NFTListProps) {
    const get2dImage = (nft: NFTAsset) => {
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri;
    }

    const renderNFTItem = (nft: NFTAsset, index: number) => {
        return (
            <div key={index} className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white"
            >
                <div className="flex justify-center h-[225px] p-4 ">
                    <img src={get2dImage(nft)} />
                </div>
                <p className="px-4 text-2xl font-semibold" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{nft.name}</p>
                <div className="flex flex-row px-4">
                    <div>
                        <h5 style={{
                            cursor: "pointer",
                            color: "rgb(97 198 208)",
                            fontWeight: 800
                        }} onClick={() => props.onOpen(nft)}>Show Detail</h5>
                        <p>{nft.assetType}</p>
                    </div>
                    <div className="grow flex flex-row justify-end">
                        <a title={nft.name} href={nft.fileAssetUri} target="_blank">
                            <img title={"ic-download.png"} src={"/images/ic-download.png"} width={32} height={32} />
                        </a>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 min-h-[60vh]">
            {
                props.data.map(renderNFTItem)
            }
        </div>
    )
}