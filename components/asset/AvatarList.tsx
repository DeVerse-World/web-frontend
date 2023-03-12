import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import { useState } from "react";
import StarRatings from 'react-star-ratings';
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import AvatarService from "../../data/services/AvatarService";
import styles from "../../styles/card-item.module.css";

const itemPerPage = 4;

type AvatarListProps = {
    data: AvatarViewModel[];
    onDeleted?: (AvatarViewModel) => void;
}

export default function AvatarList(props: AvatarListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-full">
            <div className={props.data.length < itemPerPage ? "flex flex-row flex-wrap gap-2 w-full" : `grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-2`}>
                {
                    props.data.map((item: AvatarViewModel, index: number) =>
                        <AvatarCard key={index} data={item} />
                    )
                }
            </div>
            {/* {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            } */}
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
    const onDelete = () => {
        AvatarService.deleteAvatar(props.data.id).then(res => {
            // props.onDeleted(props.data)
        }).finally(() => {
            // setIsDeleting(false);
        })
    }

    const renderContent = () => {
        return (
            <div className={`${styles.nftCard} ${styles.nftCardHover} w-[250px] h-[350px] overflow-hidden flex flex-col`}>
                <div className="h-[250px] flex flex-col justify-center">
                    <img src={props.data.image || "/images/placeholder.webp"} />
                </div>
                <span className="text-2xl px-4 py-2 font-semibold text-blue-300" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.data.name}</span>
                <div className="flex flex-row justify-between px-4">
                    <div className="flex flex-col">
                        {/* <span>{props.data.supply || 0}{props.data.maxSupply && `/${props.data.maxSupply}`}</span> */}
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
                    {/* <div className="flex flex-col justify-center ">
                        <span className="flex flex-row items-center">150 <FaEthereum /></span>
                    </div> */}
                </div>

            </div>
        )
    }

    if (!props.data.id) {
        return renderContent()
    }
    return (
        <Link href={`/asset-preview?avatarId=${props.data.id}`} className="no-underline">
            {renderContent()}
        </Link>
    )
}