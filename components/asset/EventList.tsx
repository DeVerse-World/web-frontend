import { BsPlayFill } from "react-icons/bs";
import { EventCategory } from "../../data/enum/asset_type";
import styles from "../../styles/card-item.module.css";
import InfiniteList from "../marketplace/InfiniteList";

type EventListProps = {
    data: EventViewModel[];
    cardType: string;
    onDeleted?: (EventViewModel) => void;
}
const itemPerPage = 4;

export default function EventList({ data, ...props }: EventListProps) {
    return (
        <InfiniteList items={data} {...props} />
    );

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