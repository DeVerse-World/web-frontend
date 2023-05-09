import { useState } from "react";
import { TemplateViewModel } from "./RootWorldList";
import SubworldCard from "../SubworldCard";
import ScrollableComponent from "../ScrollableComponent";

export type DerivTemplateViewModel = {
    deletable?: boolean;
    rootId?: string;
} & TemplateViewModel

type ListProps = {
    data: DerivTemplateViewModel[];
}

const itemPerPage = 10;

function sliceIntoPages(arr, chunkSize) {
    const res = [];
    let cursor = 0;
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function DerivWorldList(props: ListProps) {
    // HACK: Slice into smaller pages for infinite scrolling
    const pages = sliceIntoPages(props.data, itemPerPage);
    const [currentData, setCurrentData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const fetchDataByPage = () => {
        setCurrentData([
            ...currentData,
            ...pages[pageNumber],
        ]);
        setPageNumber(pageNumber + 1);
    }
    return (
        <div className="grid grid-cols-2 xl:grid-cols-5 md:grid-cols-4 gap-2">
            {props.data.map((item, index) => (
                <ScrollableComponent
                    showNext={() => fetchDataByPage()}
                    isLast={index === props.data.length - 1}
                >
                    <SubworldCard data={item} />
                </ScrollableComponent>
            ))
            }
        </div >
    );
}

export default DerivWorldList;