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
import Items from "../../pages/account/items";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { IoLogoGameControllerB } from "react-icons/io";
import StatsService from "../../data/services/StatsService";
import { IncrementTypes } from "../../data/services/StatsService";

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
        // _setSelectedIndex(0);
        if (setSidebarDetails) setSidebarDetails({
            id: data.id,
            name: data.name,
            creatorName: data.author || data && data.creator && data.creator.name,
            rating: data.rating,
            description: data.description,
            thumbnail: data.image,
            derivativeUri: data.derivative_uri,
            numViews: data.numViews,
            numClicks: data.numClicks,
            numPlays: data.numPlays,
            buttons: <ButtonGroup index={0} image360={data.image}
              />,
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
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-flow-row-dense sm:grid-cols-2 gap-3">
            {cardType !== "avatar" && items[index].derivable !== 1 && 
            <Button
                primary
                onClick={async (e) => { 
                    e.stopPropagation();
                    _setSelectedIndex(index);
                    setShowPlayModal(true);
                    await StatsService.incrementStats(items[index].id, IncrementTypes.PLAYS);
                }}
                size="sm"
            >
                Play
            
                <IoLogoGameControllerB className="ml-2 h-5 w-5 inline-block" aria-hidden="true" />
            </Button>
            }                  
            {cardType === "avatar" && (
                <Button secondary href={`/asset-preview?avatarId=${items[index].id}`} size="sm">
                    Preview
                    <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 inline-block" aria-hidden="true" />
                </Button>
                
            )}
            {cardType !== "avatar" && items[index].derivable === 1 && (
                <Button
                    secondary
                    href={`/subworlds/${items[index].id}`}
                    size="sm"
                    linkInNewTab
                    onClick={async (e) => {
                        e.stopPropagation();
                        await StatsService.incrementStats(items[index].id, IncrementTypes.CLICKS);
                    }}
                >
                    Explore
                    <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 inline-block" aria-hidden="true" />
                </Button>
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
            console.log('data',data)

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
                            creatorName: data.author || data && data.creator && data.creator.name,
                            rating: data.rating,
                            description: data.description,
                            thumbnail: data.image,
                            buttons: <ButtonGroup index={index} image360={data.image} />,
                            numViews: data.numViews,
                            numClicks: data.numClicks,
                            numPlays: data.numPlays,
                            derivativeUri: data.derivative_uri,
                        });
                    }}
                    thumbnail={data.image}
                    name={data.name}
                    creatorName={data.author || data && data.creator && data.creator.name}        
                    numViews={data.numViews}
                    numClicks={data.numClicks}  
                    rating={data.rating}                         
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
                    "mx-auto max-w-screen-xl grid grid-cols-2 gap-4",
                    cardType === 'gallery' ? "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
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