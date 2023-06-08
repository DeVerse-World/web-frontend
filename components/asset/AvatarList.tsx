import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import { useState } from "react";
import StarRatings from 'react-star-ratings';
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import AvatarService from "../../data/services/AvatarService";
import styles from "../../styles/card-item.module.css";
import Card from "../Card";
import OverlayImage360Button from "../image360/OverlayImage360Button";
import PlayModal from "./PlayModal";

const itemPerPage = 4;

type AvatarListProps = {
    data: AvatarViewModel[];
    onDeleted?: (AvatarViewModel) => void;
}

export default function AvatarList(props: AvatarListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-full">
            <div className={props.data.length < itemPerPage ? "flex flex-row flex-wrap gap-2 w-full" : `grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-2`}>
                {
                    props.data.map((item: AvatarViewModel, index: number) =>
                        <Card key={item.id} thumbnail={item.image} name = {item.name} 

                        >
                         <div className="mt-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTemplateId(item.id);
                                setShowPlayModal(true);
                            }}>

                            Launch
                        </button>
                        <OverlayImage360Button
                            source={item?.image}
                            className="inline-flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold overflow-hidden border border-brand text-brand"
                        >
                            Preview
                        </OverlayImage360Button>
                </div>
                </Card>

                    )}
                
            </div>
            {/* {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            } */}
              {showPlayModal && <PlayModal templateId={selectedTemplateId} onClose={() => setShowPlayModal(false)} />}

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
            <div className={`${styles.nftCard} ${styles.nftCardHover} w-[250px] h-[310px] overflow-hidden flex flex-col`}>
                <div className="h-[250px] flex flex-col justify-center">
                    <img src={props.data.image || "/images/placeholder.webp"} />
                </div>
                <span className="text-2xl px-4 py-2 font-semibold text-blue-300" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.data.name}</span>
            </div>
        )
    }

    if (!props.data.id) {
        return renderContent()
    }
    return (
        <Link href={`/asset-preview?avatarId=${props.data.id}`} className="no-underline" prefetch={false}>
            {renderContent()}
        </Link>
    )
}