import Link from "next/link";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Paginator from "../Paginator";
import PlayModal from "./PlayModal";
import StarRatings from 'react-star-ratings';
import { FaEthereum } from "react-icons/fa";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

const itemPerPage = 5;

export type RootTemplateViewModel = {
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
    animation_url?: string;

    deletable?: boolean;
    onlineOpenable?: boolean;
    offlineOpenable?: boolean;
}

type ListProps = {
    data: RootTemplateViewModel[];
    alignStart?: boolean;
}

function RootSubworldList(props: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-full">
            <div className={`flex flex-row flex-wrap ${props.alignStart ? "w-full" : "justify-center"}`}>
                {
                    props.data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) =>
                        <RootTemplateCard key={index} data={item} />)
                }
            </div>
            <div className="flex flex-row gap-2">
                <Paginator currentPage={1} totalPage={Math.ceil(props.data.length / itemPerPage)} onChangePage={setCurrentPage} />
            </div>
        </section>
    )
}

type CardProps = {
    data: RootTemplateViewModel;
}

function RootTemplateCard(props: CardProps) {
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
        <div className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2">
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={props.data.file2dUri || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold h-12">{props.data.name}</p>
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
                    <Link href={`/subworlds/${props.data.id}`}>
                        <h5 style={{
                            cursor: "pointer",
                            color: "rgb(97 198 208)",
                            fontWeight: 800
                        }}>Details</h5>
                    </Link>
                </div>
                <button className="deverse-play-btn w-16 h-8 flex flex-row justify-center rounded-2xl items-center" onClick={() => setShowPlayModal(true)}><BsPlayFill /></button>
            </div>
            {showPlayModal && <PlayModal templateId={props.data.id} onClose={() => setShowPlayModal(false)} />}

        </div>
    )
}

export default RootSubworldList;