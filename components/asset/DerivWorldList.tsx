import { useState } from "react";
import { TemplateViewModel } from "./RootWorldList";
import SubworldCard from "../SubworldCard";
import InfiniteScroll from 'react-infinite-scroller';

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
        <InfiniteScroll
            className="grid grid-cols-2 xl:grid-cols-5 md:grid-cols-4 gap-2"
            pageStart={0}
            loadMore={() => fetchDataByPage()}
            hasMore={pageNumber < pages.length - 1}
        >
            {currentData.map(item => <SubworldCard data={item} />)}
        </InfiniteScroll >
    );
}

export default DerivWorldList;