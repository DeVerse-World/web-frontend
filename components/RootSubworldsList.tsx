import { useState } from "react";
import { NFTAsset } from "../data/model/nft_asset";
import Paginator from "./Paginator";

const itemPerPage = 5;

type Props = {
    data: NFTAsset[];
    onSelect?: (NFTAsset) => void;
}

function RootSubworldList(props: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
                        <SubworldCard key={index} data={item} onSelect={() => props.onSelect(item)} />)
                }

            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
        </section>
    )
}

type CardProps = {
    data: NFTAsset;
    onSelect?: () => void;
}

function SubworldCard(props: CardProps) {
    const [showDetail, setShowDetail] = useState(false);

    const get2dImage = (nft: NFTAsset) => {
        return nft.file2dUri;
    }

    return (
        <div className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2 cursor-pointer"
            onClick={props.onSelect}>
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={get2dImage(props.data) || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{props.data.name}</p>
            <div className="flex flex-row px-4">
                <div>
                    <h5 style={{
                        cursor: "pointer",
                        color: "rgb(97 198 208)",
                        fontWeight: 800
                    }}>Browse Templates</h5>
                    <p>{props.data.assetType}</p>
                    {props.data.supply > 0 && <h5>Supply: {props.data.supply}</h5>}
                </div>
                {/* <div className="grow flex flex-col items-center gap-4">
                    <a title={props.data.name} href={props.data.fileAssetUri} target="_blank">
                        <img title={"Download"} src={"/images/ic-download.png"} width={32} height={32} />
                    </a>
                </div> */}
            </div>
        </div>
    )
}

export default RootSubworldList;