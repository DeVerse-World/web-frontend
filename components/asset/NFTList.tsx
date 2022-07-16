import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
type NFTListProps = {
    data: NFTAsset[];
    totalCount: number;
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

    const renderPreview = (nft: NFTAsset) => {
        if (!nft.file3dUri) {
            return null;
        }

        let previewLink = `asset-preview?model=${nft.file3dUri.substring(nft.file3dUri.lastIndexOf('/') + 1)}`;
        return (
            <a className="no-underline font-bold" style={{
                color: "rgb(97 198 208)"
            }} href={previewLink} target="_blank">Preview</a>
        )
    }

    const renderNFTItem = (nft: NFTAsset, index: number) => {
        return (
            <div key={index} className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2"
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
                        {renderPreview(nft)}
                    </div>
                    <div className="grow flex flex-row justify-end">
                        <a title={nft.name} href={nft.fileAssetUri} target="_blank">
                            <img title={"Download"} src={"/images/ic-download.png"} width={32} height={32} />
                        </a>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <section id="nft-list" className="flex flex-col p-2 items-center">
            <div className="flex flex-row flex-wrap justify-center mb-4">
                {
                    props.data.map(renderNFTItem)
                }

            </div>
            <Paginator currentPage={1} totalPage={4} />
        </section>
    )
}