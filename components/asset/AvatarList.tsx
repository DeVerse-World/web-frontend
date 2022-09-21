import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import { useState } from "react";
import StarRatings from 'react-star-ratings';
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
const itemPerPage = 5;

type AvatarListProps = {
    data: AvatarViewModel[];
    onDeleted?: (AvatarViewModel) => void
}

export default function AvatarList(props: AvatarListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item: AvatarViewModel, index: number) =>
                        <AvatarCard key={index} data={item} />
                    )
                }
            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
        </section>
    )
}

type AvatarCardProps = {
    key: number,
    data: AvatarViewModel,
    // onDeleted: (AvatarViewModel) => void
}
export type AvatarViewModel = {
    id?: string;
    tokenURI?: string;
    supply?: number;
    maxSupply?: number;
    name?: string;
    description?: string;
    image?: string;
    modelUri?: string;

    deletable?: boolean;
}

export function AvatarCard(props: AvatarCardProps) {
    return (
        <Link href={`/asset-preview?avatarId=${props.data.id}`}>
            <div className="nft-card nft-card-hover w-[250px] h-[350px]  m-2">
                <div className="flex justify-center h-[225px] p-4 ">
                    <img src={props.data.image || "/images/color-image-placeholder.jpg"} />
                </div>
                <div className="flex flex-row pl-4">
                    <div className="flex-grow flex flex-col">
                        <span className="text-2xl font-semibold text-blue-300" style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>{props.data.name}</span>
                        <span>{props.data.supply || 0}{props.data.maxSupply && `/${props.data.maxSupply}`}</span>
                        <div >
                            <StarRatings
                                rating={5}
                                starRatedColor="yellow"
                                starDimension="20px"
                                starSpacing="1px"
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating' />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pe-4">
                        <span className="flex flex-row items-center">150 <FaEthereum /></span>
                    </div>
                </div>

            </div>
        </Link>
    )
}