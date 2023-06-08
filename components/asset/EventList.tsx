import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { EventCategory } from "../../data/enum/asset_type";
import Paginator from "../Paginator";
import styles from "../../styles/card-item.module.css";
import OverlayImage360Button from "../image360/OverlayImage360Button";
import PlayModal from "./PlayModal";
import InfiniteList from "../marketplace/InfiniteList";

type EventListProps = {
    data: EventViewModel[];
    onDeleted?: (EventViewModel) => void;
}
const itemPerPage = 4;

export default function EventList(props: EventListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);

    return (
        <InfiniteList items={props.data} cardType="event" />
    );
    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className={props.data.length < itemPerPage ? "flex flex-row flex-wrap gap-2 w-full" : `grid xl:grid-cols-2 grid-cols-1 gap-4`}>
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item: EventViewModel, index: number) =>
                        <Card key={item.id} thumbnail ={item.image} name = {item.name} 

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
                    )
                }
            </div>
            {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2 ">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            }
            {showPlayModal && <PlayModal templateId={selectedTemplateId} onClose={() => setShowPlayModal(false)} />}

        </section>
    )
}

type EventCardProps = {
    key: number,
    data: EventViewModel,
    // onDeleted: (AvatarViewModel) => void
}
export type EventViewModel = {
    id?: string;
    name?: string;
    author?: string;
    description?: string;
    category?: EventCategory;
    image?: string;
    startDate?: string;
    stage?: string;
    deletable?: boolean;
    lastUpdate?: string;
    eventConfigUri: string;
    participants: number;
}

export function EventCard(props: EventCardProps) {
    return (
        <div className={`${styles.nftCard} md:h-[500px] h-[350px] md:w-[500px] w-[350px] flex flex-col overflow-hidden`}>
            <div className="h-[300px] flex flex-row justify-center">
                <img
                    src={props.data.image || "/images/color-image-placeholder.webp"}
                    className="w-[100%]" />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <span className="text-blue-300">Last updated: {props.data.lastUpdate}</span>
                <span className="text-2xl font-semibold text-white" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.data.name}</span>
                <span className="text-blue-400">{props.data.category}</span>
                <div className="flex flex-row justify-between flex-grow items-end">
                    <div className="text-white flex-row flex items-center gap-2">
                        <img src="/images/logo.webp" />
                        <span className="text-lg">{props.data.author || "Deverse World"} </span>
                    </div>
                    <button className="w-[120px] h-[40px] text-white rounded-3xl flex flex-row justify-center items-center deverse-play-btn"><BsPlayFill /></button>
                </div>
            </div>
        </div>
    )
}