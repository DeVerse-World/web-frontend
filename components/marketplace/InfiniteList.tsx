import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import Card from "../Card";
import EventCard from "../cards/EventCard";
import GalleryCard from "../gallery/GalleryCard";
import PlayModal from "../asset/PlayModal";
import OverlayImage360Button from "../image360/OverlayImage360Button";
import Button from "../Button";

const itemPerPage = 4;

function sliceIntoPages(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const InfiniteList = ({ items, cardType = 'default', selectedIndex, setSelectedIndex, setSidebarDetails }) => {
    const pages = sliceIntoPages(items, itemPerPage);
    const [currentData, setCurrentData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [selectedIndexLocal, setSelectedIndexLocal] = useState(0);
    let _selectedIndex = selectedIndex === undefined ? selectedIndexLocal : selectedIndex;
    let _setSelectedIndex = setSelectedIndex === undefined ? setSelectedIndexLocal : setSelectedIndex;

    useEffect(() => {
        const data = items[0];
        _setSelectedIndex(0);
        if (setSidebarDetails) setSidebarDetails({
            id: data.id,
            name: data.name,
            creatorName: data.author || data && data.creator && data.creator.name || 'Deverse World',
            rating: data.rating,
            description: data.description,
            thumbnail: data.image,
            buttons: <ButtonGroup index={0} image360={data.image}  />,
        });
    }, [items]);


    // HACK: Slice the items into smaller pages for infinite scrolling.
    // After the backend API supports pagination, we should refactor this component to remove this logic.
    const fetchDataByPage = () => {
        setCurrentData([
            ...currentData,
            ...pages[pageNumber],
        ]);
        setPageNumber(pageNumber + 1);
    }

    const ButtonGroup = ({ index, image360 }) => (
        <div className="mt-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0"
                onClick={(e) => {
                    e.stopPropagation();
                    _setSelectedIndex(index);
                    setShowPlayModal(true);
                }}>

                Launch
            </button>
            {cardType == "avatar" ? (
            <Button secondary href={`/asset-preview?avatarId=${items[index].id}`}>
                Preview
            </Button>
             ) : (
            <OverlayImage360Button
                source={image360}
                className="inline-flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold overflow-hidden border border-brand text-brand"
            >
                Preview
            </OverlayImage360Button>
)}

        </div>
    );

    const renderCard = (data, index) => {
        if (cardType === 'event')
            return (
                <EventCard
                    thumbnail={data.image}
                    name={data.name}
                    creatorName={data.author}
                    lastUpdate={data.lastUpdate}
                    category={data.category}
                >
                    <ButtonGroup index={index} image360={data.image}  />
                </EventCard>
            )
        
        if (cardType === 'gallery')
            return (
                <GalleryCard
                    current={index === _selectedIndex}
                    index={index}
                    setSelectedIndex={(index) => {
                        setSelectedIndex(index);
                        setSidebarDetails({
                            id: data.id,
                            name: data.name,
                            creatorName: data.author || data && data.creator && data.creator.name|| 'Deverse World',
                            rating: data.rating,
                            description: data.description,
                            thumbnail: data.image,
                            buttons: <ButtonGroup index={index} image360={data.image} />,
                        });
                    }}
                    thumbnail={data.image}
                    name={data.name}
                    creatorName={data.author || data && data.creator && data.creator.name || 'Deverse World'}
                    
                />
            );

        return (
            <Card
                thumbnail={data.image}
                name={data.name}
                creatorName={data && data.creator && data.creator.name}
                rating={data.rating}
            >
                <ButtonGroup index={index} image360={data.image} />
            </Card>
        );
    }

    return (
        <>
            <InfiniteScroll
                className={classNames(
                    "grid grid-cols-2 gap-4",
                    cardType === 'gallery' ? "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
                )}
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
                {currentData.map((item, index) => renderCard(item, index))}
            </InfiniteScroll>
            {showPlayModal && (
                <PlayModal
                    templateId={items[_selectedIndex].id}
                    onClose={() => setShowPlayModal(false)}
                />
            )}
        </>
    );
}

export default InfiniteList;