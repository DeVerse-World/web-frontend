import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AssetService from "../../data/services/AssetService";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import { ApiStrategy } from "../../data/services/ApiStrategy";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import EventsService from "../../data/services/EventsService";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import { getTimeString } from "../../utils/time_util";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import { RootTemplateViewModel } from "../../components/asset/RootWorldList";
import {
  MarketplaceTabKey,
  MarketplaceType,
} from "../../components/MarketplaceFilterTab";
import GalleryContainer from "../../components/gallery/GalleryContainer";
import classNames from "classnames";

import SearchWorldSection from "../../components/search/SearchWorldSection";

const Tabs = ({ tabs, selectedTab, router }) => {
  return (
    <div className="py-4 px-4 font-semibold leading-6 sm:px-6 lg:px-8">
      <div className="border-b border-medium">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  subtype: tab,
                },
              }}
              prefetch={false}
            >
              <a
                className={classNames(
                  tab === selectedTab
                    ? "border-brand text-brand hover:text-brand"
                    : "border-transparent text-lighter hover:border-light hover:text-light",
                  "cursor-pointer whitespace-nowrap border-b-2 py-2 px-1 text-md font-medium capitalize no-underline"
                )}
              >
                {tab}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

function Marketplace() {
  const router = useRouter();
  const { setViewState, remoteConfig } = useContext(AppContext);
  const [images, setImages] = useState<AvatarViewModel[]>([]);
  const [eventData, setEventData] = useState<EventViewModel[]>([]);
  const [rootTemplates, setRootTemplates] = useState<RootTemplateViewModel[]>(
    []
  );
  const [currentType, setCurrentType] = useState<
    MarketplaceTabKey | undefined
  >();
  const [currentSubtype, setCurrentSubtype] = useState<string | undefined>();
  const [selectedIndex, _setSelectedIndex] = useState(0);
  const setSelectedIndex = (index) => {
    setSlideOverOpen(true);
    _setSelectedIndex(index);
  };
  const [sidebarDetails, setSidebarDetails] = useState({
    id: "",
    name: "",
    creatorName: "",
    rating: null,
    thumbnail: "",
    description: "",
    buttons: null,
    derivativeUri: null,
    numViews: 0,
    numClicks: 0,
    numPlays: 0,
  });
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    setCurrentType(router.query["type"] || MarketplaceTabKey.WORLD_TYPE);
    setCurrentSubtype(router.query["subtype"]);

    switch (router.query["type"]) {
      case MarketplaceTabKey.WORLD_TYPE:
        loadWorlds();
        break;
      case MarketplaceTabKey.EVENT_TYPE:
        loadEvents();
        break;
      case MarketplaceTabKey.NFT_TYPE:
        loadNFTs("");
        break;
      default:
        router.push(
          {
            query: { type: MarketplaceTabKey.WORLD_TYPE },
          },
          undefined,
          { shallow: true }
        );
        loadWorlds();
        break;
    }
  }, [router]);

  const loadNFTs = async (query: string) => {
    // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
    // if (shouldShowLoading)
    setViewState(ViewState.LOADING);
    AssetService.getAll(ApiStrategy.GraphQl)
      .then((assets) => {
        const avatars = assets.filter((e) => e.assetType == AssetType.IMAGE_2D);
        let convertedData = avatars.map<AvatarViewModel>((item) => ({
          id: item.id.toString(),
          supply: item.supply,
          maxSupply: 9999,
          name: item.name,
          modelUri: item.image,
          image: item.fileAssetUri,
          deletable: true,
        }));
        setImages(convertedData);
        setViewState(ViewState.SUCCESS);
      })
      .catch((e) => {
        console.log(e);
        setViewState(ViewState.ERROR);
      })
      .finally(() => {
        setViewState(ViewState.ERROR);
      });
  };

  const loadEvents = async () => {
    // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
    // if (shouldShowLoading)
    setViewState(ViewState.LOADING);
    EventsService.fetchEvents()
      .then((res) => {
        if (res.isSuccess()) {
          const data = res
            .value!.events.map<EventViewModel>((e) => ({
              id: e.id.toString(),
              category: e.category,
              name: e.name,
              image: e.thumbnail_image,
              description: "Description of event",
              eventConfigUri: e.event_config_uri,
              lastUpdate: getTimeString(new Date(e.updated_at)),
              stage: e.stage,
              participants: e.max_num_participants,
            }))
            .filter((event) => event.stage !== "Finished");
          // switch (visibleTab) {
          //     case SecondaryTab.EVENT_BATTLE:
          //         setEventData(data.filter(e => e.category == EventCategory.BATTLE))
          //         break;
          //     case SecondaryTab.EVENT_CONCERT:
          //         setEventData(data.filter(e => e.category == EventCategory.CONCERT))
          //         break;
          //     case SecondaryTab.EVENT_GALLERY:
          //         setEventData(data.filter(e => e.category == EventCategory.GALLERY))
          //         break;
          //     case SecondaryTab.EVENT_GIVEAWAY:
          //         setEventData(data.filter(e => e.category == EventCategory.GIVEAWAY))
          //         break;
          //     case SecondaryTab.EVENT_SHOWCASE:
          //         setEventData(data.filter(e => e.category == EventCategory.SHOWCASE))
          //         break;
          //     case SecondaryTab.EVENT_SIMULATION:
          //         setEventData(data.filter(e => e.category == EventCategory.SIMULATION))
          //         break;
          //     case SecondaryTab.EVENT_TREASURE_HUNT:
          //         setEventData(data.filter(e => e.category == EventCategory.TREASURE_HUNT))
          //         break;
          //     default:
          //         setEventData(data);
          //         break;
          // }
          setEventData(data);
        } else {
          setEventData([]);
        }
      })
      .catch((e) => {
        console.log(e);
        setViewState(ViewState.ERROR);
      })
      .finally(() => {
        setViewState(ViewState.ERROR);
      });
  };

  const loadWorlds = async () => {
    // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
    // if (shouldShowLoading)
    setViewState(ViewState.LOADING);
    SubWorldTemplateService.fetchRootTemplates()
      .then((res) => {
        if (res.isSuccess()) {
          setRootTemplates(
            res.value!.enriched_subworld_templates.map<RootTemplateViewModel>(
              (e) => ({
                id: e.overview.id.toString(),
                name: e.overview.display_name,
                description: e.overview.display_name,
                image: e.overview.thumbnail_centralized_uri,
                fileAssetUriFromCentralized:
                  e.overview.thumbnail_centralized_uri,
                file2dUri: e.overview.thumbnail_centralized_uri,
                fileAssetUri: e.overview.level_ipfs_uri,
                file3dUri: e.overview.level_ipfs_uri,
                onlineOpenable: true,
                offlineOpenable: true,
                rating: e.overview.rating,
                derivable: e.overview.derivable,
                derivative_uri: e.overview.derivative_uri,
                // numViews: e.overview.num_views,
                // numClicks: e.overview.num_clicks,
                // numPlays: e.overview.num_plays,
                numViews: e.derived_world_stats.num_views_count,
                numClicks: e.derived_world_stats.num_clicks_count,
                numPlays: e.derived_world_stats.num_plays_count,
                numWorlds: e.derived_world_stats.num_world_count,
                creator: {
                  id: e.creator_info.id,
                  name:
                    e.creator_info.name === "" || e.creator_info.name === null
                      ? "Deverse World"
                      : e.creator_info.name,
                },
              })
            )
          );
        }
      })
      .finally(() => {
        setViewState(ViewState.SUCCESS);
      });
  };

  const renderList = () => {
    if (currentType === MarketplaceTabKey.NFT_TYPE)
      return (
        <AvatarList
          data={images}
          cardType="gallery"
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSidebarDetails={setSidebarDetails}
          dataType={currentType}
        />
      );
    if (currentType === MarketplaceTabKey.EVENT_TYPE)
      return (
        <EventList
          data={eventData}
          cardType="gallery"
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSidebarDetails={setSidebarDetails}
          dataType={currentType}
        />
      );
    if (currentType === MarketplaceTabKey.WORLD_TYPE)
      // return (<RootWorldList data={rootTemplates} cardType="gallery" selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setSidebarDetails={setSidebarDetails} dataType={currentType} />);
      return (
        <SearchWorldSection
          data={rootTemplates}
          cardType="gallery"
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSidebarDetails={setSidebarDetails}
          dataType={currentType}
        />
      );

    return;
  };

  const typeHref = new URLSearchParams({
    type: router.query["type"],
    subtype: "all",
  });
  const subtypeHref = new URLSearchParams({
    type: router.query["type"],
    subtype: router.query["subtype"],
  });
  let totalWorlds = 0;
  rootTemplates.forEach((rootWorld) => {
    totalWorlds += rootWorld.numWorlds;
  });

  return (
    <div className="h-full">
      {/* {currentType && <MarketplaceFilter defaultTab={currentType} />} */}
      {MarketplaceType[currentType] && (
        <Tabs
          tabs={MarketplaceType[currentType]}
          selectedTab={currentSubtype || MarketplaceType[currentType][0]}
          router={router}
        />
      )}
      {images.length > 0 || eventData.length > 0 || rootTemplates.length > 0 ? (
        <GalleryContainer
          details={sidebarDetails}
          type={router.query["type"]}
          slideOverOpen={slideOverOpen}
          setSlideOverOpen={setSlideOverOpen}
        >
          <div className="px-4 pb-4 mt-8">
            {/* {currentType === MarketplaceTabKey.WORLD_TYPE && rootTemplates && rootTemplates.length > 0 && (
                            <SearchWorldSection data={rootTemplates} />
                        )} */}
            {currentType === MarketplaceTabKey.WORLD_TYPE && (
              <h2 className="text-white my-4 text-xl font-bold tracking-tight sm:text-2xl">
                {totalWorlds} total worlds
              </h2>
            )}
            {renderList()}
          </div>
        </GalleryContainer>
      ) : null}
    </div>
  );
}

export default Marketplace;
