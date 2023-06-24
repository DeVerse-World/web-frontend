import { useState } from "react";
import { TemplateViewModel } from "./RootWorldList";
import Card from "../Card";
import InfiniteScroll from 'react-infinite-scroller';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import OverlayImage360Button from "../image360/OverlayImage360Button";
import PlayModal from "./PlayModal";

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
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);

    const fetchDataByPage = () => {
        setCurrentData([
            ...currentData,
            ...pages[pageNumber],
        ]);
        setPageNumber(pageNumber + 1);
    }
    return (
        <>
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
                {currentData.map(item => (
                    <Card
                        thumbnail={item.image} name={item.name}
                        creatorName={item && item.creator && item.creator.name}
                        numClicks={item.numClicks}
                        numViews={item.numViews}
                        rating={item.rating}

                    >
                        <div className="mt-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTemplateId(item.id);
                                    setShowPlayModal(true);
                                }}>

                                Launch
                            </button>
                            <OverlayImage360Button
                                source={item && item.image}
                                className="inline-flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold overflow-hidden border border-brand text-brand"
                            >
                                Preview
                            </OverlayImage360Button>

                        </div>
                    </Card>
                ))}
            </InfiniteScroll>
            {showPlayModal && <PlayModal templateId={selectedTemplateId} onClose={() => setShowPlayModal(false)} />}
        </>
    );
}

export default DerivWorldList;
