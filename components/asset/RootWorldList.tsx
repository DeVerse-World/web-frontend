import Link from "next/link";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Paginator from "../Paginator";
import PlayModal from "./PlayModal";
import StarRatings from 'react-star-ratings';
import { FaEthereum } from "react-icons/fa";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import styles from "../../styles/card-item.module.css";
import Card from "../Card";
import OverlayImage360Button from "../image360/OverlayImage360Button";

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
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);



    return (
       
        <section>
            <div className="mx-auto px-6 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-">
                <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-4">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
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
            {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            }
            </div>
            
            {showPlayModal && <PlayModal templateId={selectedTemplateId} onClose={() => setShowPlayModal(false)} />}

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