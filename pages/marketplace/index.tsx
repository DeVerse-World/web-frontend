import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import AssetService from "../../data/services/AssetService";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import { ApiStrategy } from "../../data/services/ApiStrategy";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import EventsService from "../../data/services/EventsService";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import { getTimeString } from "../../utils/time_util";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import RootWorldList, { RootTemplateViewModel } from "../../components/asset/RootWorldList";
import MarketplaceFilter, { MarketplaceTabKey, MarketplaceType } from "../../components/MarketplaceFilterTab";

function Marketplace() {
    const router = useRouter();
    const { setViewState, remoteConfig } = useContext(AppContext);
    const [images, setImages] = useState<AvatarViewModel[]>([]);
    const [eventData, setEventData] = useState<EventViewModel[]>([]);
    const [rootTemplates, setRootTemplates] = useState<RootTemplateViewModel[]>([]);
    const [currentType, setCurrentType] = useState<MarketplaceTabKey>(null);

    useEffect(() => {
        if (!router.isReady) return;
        switch (router.query['type']) {
            case MarketplaceTabKey.WORLD_TYPE:
                setCurrentType(MarketplaceTabKey.WORLD_TYPE)
                loadWorlds();
                break;
            case MarketplaceTabKey.EVENT_TYPE:
                setCurrentType(MarketplaceTabKey.EVENT_TYPE)
                loadEvents();
                break;
            case MarketplaceTabKey.NFT_TYPE:
                setCurrentType(MarketplaceTabKey.NFT_TYPE)
                loadNFTs('');
                break;
            default:
                router.push({
                    query: { type: MarketplaceTabKey.WORLD_TYPE }
                }, undefined, { shallow: true })
                setCurrentType(MarketplaceTabKey.WORLD_TYPE)
                loadWorlds();
                break;
        }
    }, [router]);

    const loadNFTs = async (query: string) => {
        // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
        // if (shouldShowLoading)
        setViewState(ViewState.LOADING)
        AssetService.getAll(ApiStrategy.GraphQl).then(assets => {
            const avatars = assets.filter(e => e.assetType == AssetType.IMAGE_2D);
            let convertedData = avatars.map<AvatarViewModel>(item => ({
                id: item.id.toString(),
                supply: item.supply,
                maxSupply: 9999,
                name: item.name,
                modelUri: item.image,
                image: item.fileAssetUri,
                deletable: true,
            }))
            setImages(convertedData)
            setViewState(ViewState.SUCCESS)
        }).catch(e => {
            console.log(e)
            setViewState(ViewState.ERROR)
        }).finally(() => {
            setViewState(ViewState.ERROR)
        });
    }

    const loadEvents = async () => {
        // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
        // if (shouldShowLoading)
        setViewState(ViewState.LOADING)
        EventsService.fetchEvents().then(res => {
            if (res.isSuccess()) {
                const data = res.value!.events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    category: e.category,
                    name: e.name,
                    image: e.thumbnail_image,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                })).filter(event => event.stage != "Finished");
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

            } else {
                setEventData([]);
            }
        }).catch(e => {
            console.log(e)
            setViewState(ViewState.ERROR)
        }).finally(() => {
            setViewState(ViewState.ERROR)
        });
    }

    const loadWorlds = async () => {
        // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
        // if (shouldShowLoading)
        setViewState(ViewState.LOADING)
        SubWorldTemplateService.fetchRootTemplates().then(res => {
            if (res.isSuccess()) {
                setRootTemplates(res.value!.subworld_templates.map<RootTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                })));
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        })
    }
    const typeHref = new URLSearchParams({ type: router.query['type'], subtype: 'all' });
    const subtypeHref = new URLSearchParams({ type: router.query['type'], subtype: router.query['subtype'] })

    return (
        <div className="flex flex-row h-full">
            <MarketplaceFilter defaultTab={MarketplaceTabKey.WORLD_TYPE} />
            <div id="section-content" className="p-4">
                <nav className="flex text-base" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        <li >
                            <div className="flex items-center">
                                <a
                                    href={`/marketplace?${typeHref.toString()}`}
                                    className="font-medium text-lighter hover:text-light capitalize no-underline"
                                >
                                    {router.query['type']}
                                </a>
                            </div>
                        </li>
                        <li >
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-lighter capitalize" aria-hidden="true" />
                                <a
                                    href={`/marketplace?${subtypeHref.toString()}`}
                                    className="ml-4 font-medium text-lighter hover:text-light no-underline capitalize"
                                >
                                    {router.query['subtype']}
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h2 className="text-lightest mt-6 sm:mt-8 ml-8 text-3xl font-bold tracking-tight text-darkest sm:text-4xl capitalize">
                    {router.query['subtype']}
                </h2>
                {currentType == MarketplaceTabKey.NFT_TYPE && <AvatarList data={images} />}
                {currentType == MarketplaceTabKey.EVENT_TYPE && <EventList data={eventData} />}
                {currentType == MarketplaceTabKey.WORLD_TYPE && <RootWorldList data={rootTemplates} />}
            </div>
        </div>
    )
}

export default Marketplace;