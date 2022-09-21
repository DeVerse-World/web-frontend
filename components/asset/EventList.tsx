import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Paginator from "../Paginator";

type EventListProps = {
    data: EventViewModel[];
    onDeleted?: (EventViewModel) => void
}
const itemPerPage = 5;

export default function EventList(props: EventListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center gap-4">
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item: EventViewModel, index: number) =>
                        <EventCard key={index} data={item} />
                    )
                }
            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
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
        <div className="nft-card h-[400px] w-[500px] flex flex-col">
            <div className="h-[225px] flex flex-row justify-center rounded-xl overflow-hidden">
                <img src={props.data.image || "/images/event-placeholder.jpg"} className="w-[100%]"/>
            </div>
            <div className="flex flex-col flex-grow p-4">
                <span className="text-blue-300">Last updated: {props.data.lastUpdate}</span>
                <span className="text-2xl font-semibold text-white" style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.data.name}</span>
                <div className="flex flex-row justify-between flex-grow items-end">
                    <span className="text-white">Author: {props.data.author}</span>
                    <button className="w-[120px] h-[40px]  rounded-3xl flex flex-row justify-center items-center deverse-play-btn"><BsPlayFill /></button>
                </div>
            </div>
        </div>
    )
}