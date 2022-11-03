import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { EventCategory } from "../../data/enum/asset_type";
import Paginator from "../Paginator";

type EventListProps = {
    data: EventViewModel[];
    onDeleted?: (EventViewModel) => void;
}
const itemPerPage = 4;

export default function EventList(props: EventListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className={props.data.length < itemPerPage ? "flex flex-row flex-wrap gap-2 w-full" : `grid xl:grid-cols-2 grid-cols-1 gap-4`}>
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item: EventViewModel, index: number) =>
                        <EventCard key={index} data={item} />
                    )
                }
            </div>
            {props.data.length > itemPerPage &&
                <div className="flex flex-row gap-2 ">
                    <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
                </div>
            }
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
        <div className="nft-card md:h-[500px] h-[350px] md:w-[500px] w-[350px] flex flex-col overflow-hidden">
            <div className="h-[300px] flex flex-row justify-center">
                <img
                    src={props.data.image || "/images/event-placeholder.jpg"}
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
                        <img src="/images/logo.png" />
                        <span className="text-lg">{props.data.author || "Deverse World"} </span>
                    </div>
                    <button className="w-[120px] h-[40px] text-white rounded-3xl flex flex-row justify-center items-center deverse-play-btn"><BsPlayFill /></button>
                </div>
            </div>
        </div>
    )
}