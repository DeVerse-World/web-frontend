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
import { EventCategory } from "../../data/enum/asset_type";

function EventsPage() {
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);
    const [data, setData] = useState<EventViewModel[]>([]);
    const [filteredData, setFilteredData] = useState<EventViewModel[]>([]);
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
                setData(res.value.events.map<EventViewModel>(e => ({
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

    useEffect(() => {
        if (data.length == 0) {
            return;
        }
        switch (visibleTab) {
            case MarketplaceTab.BATTLE:
                setFilteredData(data.filter(e => e.category == EventCategory.BATTLE))
                break;
            case MarketplaceTab.CONCERT:
                setFilteredData(data.filter(e => e.category == EventCategory.CONCERT))
                break;
            case MarketplaceTab.GALLERY:
                setFilteredData(data.filter(e => e.category == EventCategory.GALLERY))
                break;
            case MarketplaceTab.GIVEAWAY:
                setFilteredData(data.filter(e => e.category == EventCategory.GIVEAWAY))
                break;
            case MarketplaceTab.SHOWCASE:
                setFilteredData(data.filter(e => e.category == EventCategory.SHOWCASE))
                break;
            case MarketplaceTab.SIMULATION:
                setFilteredData(data.filter(e => e.category == EventCategory.SIMULATION))
                break;
            case MarketplaceTab.TREASURE_HUNT:
                setFilteredData(data.filter(e => e.category == EventCategory.TREASURE_HUNT))
                break;
            default:
                setFilteredData(data)
                break;
        }
    }, [data, visibleTab])

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <div className="h-[100%] bg-gray-900">
                    <Accordion defaultActiveKey="nft_type" className=" text-white" flush>
                        <FilterHeader eventKey="nft_type" label={'Categories'} />
                        <Accordion.Collapse eventKey="nft_type">
                            <div className="flex flex-col px-3 py-2 ">
                                <ListingTabComponent tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.BATTLE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.CONCERT} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.GALLERY} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.GIVEAWAY} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.SHOWCASE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.SIMULATION} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.TREASURE_HUNT} isSelected={visibleTab} onSelect={onSelectTab} />
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            </Sidebar>

            <section id='section-content' className='flex flex-col justify-between '>
                <EventList data={filteredData} />
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