import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import Card from "../Card";
import EventCard from "../cards/EventCard";
import PlayModal from "../asset/PlayModal";
import OverlayImage360Button from "../image360/OverlayImage360Button";

const itemPerPage = 4;

function sliceIntoPages(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const InfiniteList = ({ items, cardType = 'default' }) => {
    const pages = sliceIntoPages(items, itemPerPage);
    const [currentData, setCurrentData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);

    // HACK: Slice the items into smaller pages for infinite scrolling.
    // After the backend API supports pagination, we should refactor this component to remove this logic.
    const fetchDataByPage = () => {
        setCurrentData([
            ...currentData,
            ...pages[pageNumber],
        ]);
        setPageNumber(pageNumber + 1);
    }

    const ButtonGroup = ({ templateId, image360 }) => (
        <div className="mt-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplateId(templateId);
                    setShowPlayModal(true);
                }}>

                Launch
            </button>
            <OverlayImage360Button
                source={image360}
                className="inline-flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold overflow-hidden border border-brand text-brand"
            >
                Preview
            </OverlayImage360Button>
        </div>
    );

    return (
        <>
            <InfiniteScroll
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
                pageStart={0}
                loadMore={() => setTimeout(() => fetchDataByPage(), 800)}
                hasMore={pageNumber <= pages.length - 1}
                threshold={500}
                loader={
                    <button type="button" className="inline-flex justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0" disabled>
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <ArrowPathIcon className="h-5 w-5 flex-shrink-0 text-darkest" />
                        </svg>
                        Loading...
                    </button>
                }
            >
                {currentData.map(item => (
                    <>
                        {cardType === 'event' ? (
                            <EventCard
                                thumbnail={item.image}
                                name={item.name}
                                creatorName={item.author}
                                lastUpdate={item.lastUpdate}
                                category={item.category}
                            >
                                <ButtonGroup templateId={item.id} image360={item.image}  />
                            </EventCard>
                        ) : (
                            <Card
                                thumbnail={item.image}
                                name={item.name}
                                creatorName={item.creator?.name}
                                rating={item.rating}
                            >
                                <ButtonGroup templateId={item.id} image360={item.image} />
                            </Card>
                        )}
                    </>
                ))}
            </InfiniteScroll>
            {showPlayModal && (
                <PlayModal
                    templateId={selectedTemplateId}
                    onClose={() => setShowPlayModal(false)}
                />
            )}
        </>
    );
}

export default InfiniteList;