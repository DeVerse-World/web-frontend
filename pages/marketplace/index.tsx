import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AssetService from "../../data/services/AssetService";
import { AssetType, EventCategory } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import Accordion from 'react-bootstrap/Accordion';
import ListingTabComponent from "../../components/ListingTab";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/common/Footer";
import { SecondaryTab } from "../../components/marketplace_tab";
import BaseLayout from "../../components/common/BaseLayout";
import { ApiStrategy } from "../../data/services/ApiStrategy";
import FilterHeader from "../../components/FilterHeader";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import EventsService from "../../data/services/EventsService";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import { getTimeString } from "../../utils/time_util";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import RootWorldList, { RootTemplateViewModel } from "../../components/asset/RootWorldList";
import FirebaseService from "../../data/services/FirebaseService";

function Marketplace() {
    const router = useRouter();
    const { setViewState, setIsMobileSidebarVisible, remoteConfig } = useContext(AppContext);
    const [images, setImages] = useState<AvatarViewModel[]>([]);
    const [eventData, setEventData] = useState<EventViewModel[]>([]);
    const [rootTemplates, setRootTemplates] = useState<RootTemplateViewModel[]>([]);
    const [visibleTab, setVisibleTab] = useState<SecondaryTab>(SecondaryTab.WORLD_ALL);

    useEffect(() => {
        if (visibleTab.startsWith("NFT")) {
            loadNFTs(null)
        } else if (visibleTab.startsWith("EVENT")) {
            loadEvents();
        } else if (visibleTab.startsWith("WORLD")) {
            loadWorlds()
        }
        setIsMobileSidebarVisible(false);
    }, [visibleTab])

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;
        if (!query['tab']) {
            onSelectTab(SecondaryTab.WORLD_ALL);
        } else {
            onSelectTab(query['tab'])
        }
    }, [router.isReady]);

    const onSelectTab = (tab: SecondaryTab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        }, undefined, { shallow: true });
        setVisibleTab(tab);
    }

    const loadNFTs = async (query: string) => {
        // const shouldShowLoading = await FirebaseService.getShouldShowLoading();
        // if (shouldShowLoading)
        setViewState(ViewState.LOADING)
        AssetService.getAll(ApiStrategy.GraphQl).then(assets => {
            const avatars = assets.filter(e => e.assetType == AssetType.IMAGE_2D);
            let convertedData = avatars.map<AvatarViewModel>(item => ({
                id: item.id?.toString(),
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
                const data = res.value.events.map<EventViewModel>(e => ({
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
                switch (visibleTab) {
                    case SecondaryTab.EVENT_BATTLE:
                        setEventData(data.filter(e => e.category == EventCategory.BATTLE))
                        break;
                    case SecondaryTab.EVENT_CONCERT:
                        setEventData(data.filter(e => e.category == EventCategory.CONCERT))
                        break;
                    case SecondaryTab.EVENT_GALLERY:
                        setEventData(data.filter(e => e.category == EventCategory.GALLERY))
                        break;
                    case SecondaryTab.EVENT_GIVEAWAY:
                        setEventData(data.filter(e => e.category == EventCategory.GIVEAWAY))
                        break;
                    case SecondaryTab.EVENT_SHOWCASE:
                        setEventData(data.filter(e => e.category == EventCategory.SHOWCASE))
                        break;
                    case SecondaryTab.EVENT_SIMULATION:
                        setEventData(data.filter(e => e.category == EventCategory.SIMULATION))
                        break;
                    case SecondaryTab.EVENT_TREASURE_HUNT:
                        setEventData(data.filter(e => e.category == EventCategory.TREASURE_HUNT))
                        break;
                    default:
                        setEventData(data);
                        break;
                }

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
                setRootTemplates(res.value.subworld_templates.map<RootTemplateViewModel>(e => ({
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

    const renderContent = () => {
        if (visibleTab.startsWith("NFT"))
            return (
                <div className="flex-grow p-4">
                    <span className="section-header-lg pl-4">Images</span>
                    <AvatarList data={images} />
                </div>
            );
        if (visibleTab.startsWith("EVENT"))
            return (
                <div className="flex-grow p-4">
                    <span className="section-header-lg pl-4">Events</span>
                    <EventList data={eventData} />
                </div>
            )
        if (visibleTab.startsWith("WORLD"))
            return (
                <div className="flex-grow p-4">
                    <span className="section-header-lg pl-4">Worlds</span>
                    <RootWorldList data={rootTemplates} />
                </div>
            )
        return null;
    }

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <div className="h-[100%] bg-gray-900 w-[160px]">
                    <Accordion defaultActiveKey="nft_type" className="text-white" flush>
                        <FilterHeader eventKey="worlds_type" label={'Worlds'} />
                        <Accordion.Collapse eventKey="worlds_type">
                            <div className="flex flex-col ">
                                <ListingTabComponent label="All"
                                    tab={SecondaryTab.WORLD_ALL} isSelected={visibleTab} onSelect={onSelectTab} />
                            </div>
                        </Accordion.Collapse>
                        <FilterHeader eventKey="events_type" label='Events' />
                        <Accordion.Collapse eventKey="events_type">
                            <div className="flex flex-col">
                                <ListingTabComponent label="All" tab={SecondaryTab.EVENT_ALL} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Battle" tab={SecondaryTab.EVENT_BATTLE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Concert" tab={SecondaryTab.EVENT_CONCERT} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Gallery" tab={SecondaryTab.EVENT_GALLERY} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Giveaway" tab={SecondaryTab.EVENT_GIVEAWAY} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Showcase" tab={SecondaryTab.EVENT_SHOWCASE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Simluation" tab={SecondaryTab.EVENT_SIMULATION} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Treasure Hunt" tab={SecondaryTab.EVENT_TREASURE_HUNT} isSelected={visibleTab} onSelect={onSelectTab} />
                            </div>
                        </Accordion.Collapse>
                        <FilterHeader eventKey="nft_type" label='NFT' />
                        <Accordion.Collapse eventKey="nft_type">
                            <div className="flex flex-col ">
                                <ListingTabComponent label="All" tab={SecondaryTab.NFT_ALL} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Image" tab={SecondaryTab.NFT_TWO_D_IMAGE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Avatar" tab={SecondaryTab.NFT_AVATAR} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Race" isDisable tab={SecondaryTab.NFT_RACE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Game" isDisable tab={SecondaryTab.NFT_GAME_MODE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent label="Bot Logic" isDisable tab={SecondaryTab.NFT_BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} />
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>

            </Sidebar>

            <section id='section-content' className='bg-deverse flex flex-col text-white ' >
                {renderContent()}
                <Footer />
            </section>
        </div>
    )
}

Marketplace.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);

export default Marketplace;