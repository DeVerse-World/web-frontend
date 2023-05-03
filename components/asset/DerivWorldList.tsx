import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Paginator from "../Paginator";
import StarRatings from 'react-star-ratings';
import PlayModal from "./PlayModal";
import { BsFillPeopleFill, BsPlayFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { TemplateViewModel } from "./RootWorldList";
import styles from "../../styles/card-item.module.css";
import OverlayImage360Button from "../image360/OverlayImage360Button";
import SubworldCard from "../SubworldCard";

export type DerivTemplateViewModel = {
    deletable?: boolean;
    rootId?: string;
} & TemplateViewModel

type ListProps = {
    data: DerivTemplateViewModel[];
}

const itemPerPage = 4;

function DerivWorldList(props: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className={`grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-2`}>
                {
                    props.data.map((item, index) =>
                        <SubworldCard key={index} data={item} />)
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

export default DerivWorldList;