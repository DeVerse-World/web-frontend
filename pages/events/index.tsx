import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import BaseLayout from "../../components/common/BaseLayout";
import Footer from "../../components/common/Footer";
import FilterHeader from "../../components/FilterHeader";
import { MarketplaceTab } from "../../components/marketplace_tab";
import Sidebar from "../../components/Sidebar";
import EventsService from "../../data/services/EventsService";
import { getTimeString } from "../../utils/time_util";
import ListingTabComponent from "../../components/ListingTab";

function EventsPage() {
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);
    const [nfts, setNfts] = useState<EventViewModel[]>([]);

    const onSelectTab = (tab: MarketplaceTab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        }, undefined, { shallow: true });
        setVisibleTab(tab);
    }

    useEffect(() => {
        EventsService.fetchEvents().then(res => {
            if (res.isSuccess()) {
                setNfts(res.value.events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    category: e.category,
                    name: e.name,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                })));
            }
        })
    }, [])

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <Accordion defaultActiveKey="nft_type" className="w-[170px] h-[100%] text-white" flush>
                    <FilterHeader eventKey="nft_type" label={'Categories'} />
                    <Accordion.Collapse eventKey="nft_type">
                        <div className="flex flex-col bg-gray-800 px-3 py-2 ">
                            <ListingTabComponent label="All"
                                tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Battle"
                                tab={MarketplaceTab.BATTLE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Concert"
                                tab={MarketplaceTab.CONCERT} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Gallery"
                                tab={MarketplaceTab.GALLERY} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Giveaway"
                                tab={MarketplaceTab.GIVEAWAY} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Showcase"
                                tab={MarketplaceTab.SHOWCASE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Simulation"
                                tab={MarketplaceTab.SIMULATION} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Treasure Hunt"
                                tab={MarketplaceTab.TREASURE_HUNT} isSelected={visibleTab} onSelect={onSelectTab} />
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </Sidebar>

            <section id='section-content' className='flex flex-col justify-between '>
                <EventList data={nfts} />
                <Footer />
            </section>
        </div>
    )
}
EventsPage.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);

export default EventsPage;