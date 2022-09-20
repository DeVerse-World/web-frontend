import Link from "next/link";
import { useState } from "react";
import Paginator from "../Paginator";

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
}

type ListProps = {
    data: RootTemplateViewModel[];
}

function RootSubworldList(props: ListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="nft-list" className="flex flex-col p-2 gap-2 items-center w-[100%]">
            <div className="flex flex-row flex-wrap justify-center">
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
    return (
        <div className="deverse-border w-[250px] h-[400px] bg-black/[.4] rounded-xl text-white m-2">
            <div className="flex justify-center h-[225px] p-4 ">
                <img src={props.data.file2dUri || "/images/placeholder.png"} />
            </div>
            <p className="px-4 text-2xl font-semibold" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{props.data.name}</p>
            <div className="flex flex-row px-4">
                <div>
                    <Link href={`/subworlds/${props.data.id}`}>
                        <h5 style={{
                            cursor: "pointer",
                            color: "rgb(97 198 208)",
                            fontWeight: 800
                        }}>Browse Templates</h5>
                    </Link>
                </div>
                {/* <div className="grow flex flex-col items-center gap-4">
                    <a title={props.data.name} href={props.data.fileAssetUri} target="_blank">
                        <img title={"Download"} src={"/images/ic-download.png"} width={32} height={32} />
                    </a>
                </div> */}
            </div>
        </div>
    )
}

export default RootSubworldList;