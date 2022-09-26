import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import RootSubworldList, { RootTemplateViewModel } from "../../components/asset/RootSubworldsList";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import ListingTabComponent from "../../data/services/ListingTab";
import FilterHeader from "../../components/FilterHeader";
import Sidebar from "../../components/Sidebar";
import { Accordion } from "react-bootstrap";
import { MarketplaceTab } from "../../components/marketplace_tab";
import { useRouter } from "next/router";
import BaseLayout from "../../components/common/BaseLayout";

function SubworldsPage() {
    const { setViewState } = useContext(AppContext);
    const router = useRouter();
    const [rootTemplates, setRootTemplates] = useState<RootTemplateViewModel[]>([]);
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);
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
    }, [])

    return (
        <div className="flex flex-row bg-deverse">
            <Sidebar >
                <Accordion defaultActiveKey="nft_type" className="w-[170px] h-[100%] text-white" flush>
                    <FilterHeader eventKey="nft_type" label={'Categories'} />
                    <Accordion.Collapse eventKey="nft_type">
                        <div className="flex flex-col bg-gray-800 px-3 py-2 ">
                            <ListingTabComponent label="All"
                                tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                            {/* <ListingTabComponent label="Test"
                                tab={MarketplaceTab.BATTLE} isSelected={visibleTab} onSelect={onSelectTab} /> */}
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </Sidebar>
            <section id='section-content' className='flex flex-col justify-between '>
                <RootSubworldList data={rootTemplates} alignStart/>
                <Footer />
            </section >
        </div>

    )
}

SubworldsPage.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);
export default SubworldsPage;