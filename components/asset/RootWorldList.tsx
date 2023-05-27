import Link from "next/link";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Paginator from "../Paginator";
import PlayModal from "./PlayModal";
import StarRatings from 'react-star-ratings';
import { FaEthereum } from "react-icons/fa";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import styles from "../../styles/card-item.module.css";

const itemPerPage = 4;

export type TemplateViewModel = {
    id?: string;
    tokenURI?: string;
    name?: string;
    description?: string;
    fileAssetUri?: string;
    fileAssetName?: string;
    fileAssetUriFromCentralized?: string;
    file2dUri?: string;
    file3dUri?: string;
    image?: string;
    rating?: number;
    animation_url?: string;
    onlineOpenable?: boolean;
    offlineOpenable?: boolean;
}

export type CreatorViewModel = {
    id: number;
    social_email?: string;
    custom_email?: string;
    wallet_address: string;
    wallet_nonce: string;
    steam_id?: string;
    name: string;
    created_at: string; // e.g. "2022-08-20T07:10:39Z"
    updated_at: string; // e.g. "2023-05-17T08:35:35Z"
}

export type RootTemplateViewModel = {
    deletable?: boolean;
} & TemplateViewModel

type ListProps = {
    data: RootTemplateViewModel[];
}

function RootWorldList(props: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-full">
            <div className={props.data.length < itemPerPage ? "flex flex-row flex-wrap gap-2 w-full" : `grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-2`}>
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
                        <RootWorldCard key={index} data={item} />)
                }
            </div>
            {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            }
        </section>
    )
}

type CardProps = {
    data: RootTemplateViewModel;
}

function RootWorldCard(props: CardProps) {
    const [showPlayModal, setShowPlayModal] = useState(false);
    const onDelete = () => { //TODO: to be enabled
        SubWorldTemplateService.deleteRootTemplate(props.data.id).then(res => {
            console.log(res)
            // props.onDeleted(props.data)
        }).finally(() => {
            // setIsDeleting(false);
        })
    }

    return (
        <>
            <Link href={`/subworlds/${props.data.id}`} prefetch={false}>
                <div className={`${styles.nftCardHover} w-[250px] h-[350px] bg-black/[.4] rounded-xl text-white m-2 overflow-hidden`}>
                    <div className="h-[225px] ">
                        <img className="h-full w-full" src={props.data.image || "/images/color-image-placeholder.webp"} />
                    </div>
                    <p className="px-4 py-2 text-2xl font-semibold h-12">{props.data.name}</p>
                    {/* <div className="px-4 flex flex-row items-center">
                        150 <FaEthereum />
                    </div> */}
                    <div className="flex flex-row px-4 justify-between">
                        <div className="flex flex-col">
                            <StarRatings
                                rating={props.data.rating}
                                starRatedColor="yellow"
                                starDimension="20px"
                                starSpacing="1px"
                                // changeRating={this.changeRating}
                                numberOfStars={props.data.rating}
                                name='rating' />
                        </div>

                        <button className="w-[60px] h-[25px] text-white rounded-3xl flex flex-row justify-center items-center deverse-play-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPlayModal(true);
                            }}>
                            <BsPlayFill />
                        </button>
                    </div>

                </div>
            </Link >
            {showPlayModal && <PlayModal templateId={props.data.id} onClose={() => setShowPlayModal(false)} />}
        </>

    )
}

export default RootWorldList;