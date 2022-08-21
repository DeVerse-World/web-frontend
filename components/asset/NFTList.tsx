import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import { useState } from "react";
import NFTCard from "./NFTCard";
type NFTListProps = {
    data: NFTAsset[];
    assetType?: AssetType;
    onDeleted?: (NFTAsset) => void
}

export default function NFTList(props: NFTListProps) {
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
                        <NFTCard key={index} data={item} onDeleted={props.onDeleted} />)
                }

            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
        </section>
    )
}