import { useState } from "react";
import { TemplateViewModel } from "./RootWorldList";
import SubworldCard from "../SubworldCard";
import InfiniteScroll from 'react-infinite-scroller';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

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
            className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-4"
            pageStart={0}
            loadMore={() => setTimeout(() => fetchDataByPage(), 800)}
            hasMore={pageNumber <= pages.length - 1}
            threshold={500}
            loader={
              <button type="button" class="inline-flex justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0" disabled>
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <ArrowPathIcon className="h-5 w-5 flex-shrink-0 text-darkest" />
                </svg>
                Loading...
              </button>
            }
        >
            {currentData.map(item => <SubworldCard data={item} />)}
        </InfiniteScroll >
    );
}

export default DerivWorldList;
