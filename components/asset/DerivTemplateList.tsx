import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Paginator from "../Paginator";
import StarRatings from 'react-star-ratings';
import PlayModal from "./PlayModal";
import { BsFillPeopleFill, BsPlayFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { TemplateViewModel } from "./RootSubworldsList";

export type DerivTemplateViewModel = {
    deletable?: boolean;
    rootId?: string;
} & TemplateViewModel

type ListProps = {
    data: DerivTemplateViewModel[];
    alignStart?: boolean;
}

const itemPerPage = 5;

function DerivSubworldList(props: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className={`flex flex-row flex-wrap gap-2 ${props.alignStart ? "w-full" : "justify-center"}`}>
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
                        <DerivTemplateCard key={index} data={item} />)
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
    data: DerivTemplateViewModel;
}

function DerivTemplateCard(props: CardProps) {
    const [showPlayModal, setShowPlayModal] = useState(false);
    const onDelete = () => { //TODO: to be enabled
        // SubWorldTemplateService.deleteDerivTemplate(props.data.rootId, props.data.id).then(res => {
        //     console.log(res)
        //     props.onDeleted(props.data)
        // }).finally(() => {
        //     setIsDeleting(false);
        // })
    }
    return (
        <div className="w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2">
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={props.data.file2dUri || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold h-12">{props.data.name}</p>
            <div className=" px-4 flex flex-row gap-1 items-center text-lg">
                <TbWorld />15
                <BsFillPeopleFill className="ml-4" />35/500
            </div>
            <div className="px-4 flex flex-row items-center">
                150 <FaEthereum />
            </div>
            <div className="flex flex-row px-4 justify-between">
                <div className="flex flex-col">
                    <StarRatings
                        rating={5}
                        starRatedColor="yellow"
                        starDimension="20px"
                        starSpacing="1px"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
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
            {showPlayModal && <PlayModal templateId={props.data.id} onClose={() => setShowPlayModal(false)} />}

        </div>
    )
}

export default DerivSubworldList;