import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, Nav, NavDropdown, NavItem, Row, Tab, Tabs } from "react-bootstrap";
import BaseService from "../../data/services/BaseService";
import CreateNftAssetSection from "../../components/asset/CreateNftAssetSection";
import { useRouter } from "next/router";
import NFTList from "../../components/asset/NFTList";
import AssetService from "../../data/services/AssetService";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import NFTDetailCard from "../../components/asset/NFTDetailCard";
import Accordion from 'react-bootstrap/Accordion';
import ListingTabComponent from "./ListingTab";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/common/Footer";
import { MarketplaceTab } from "../../components/marketplace_tab";
import BaseLayout from "../../components/common/BaseLayout";
import { ApiStrategy } from "../../data/services/ApiStrategy";



function Marketplace() {
    const router = useRouter();
    const { setViewState } = useContext(AppContext);

    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);

    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        AssetService.getAll(ApiStrategy.GraphQl).then(assets => {
            setNfts(assets.filter((asset) => asset != null));
            console.log(assets)
            setViewState(ViewState.SUCCESS)
        }).catch(e => {
            console.log(e)
            setViewState(ViewState.ERROR)
        });
    }

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;
        if (!query['tab']) {
            onSelectTab(MarketplaceTab.All);
        }
    }, [router.isReady]);

    const onSelectTab = (tab: MarketplaceTab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        }, undefined, { shallow: true });
        setVisibleTab(tab);
    }

    const renderContent = () => {
        let data = nfts;
        switch (visibleTab) {
            case MarketplaceTab.TWO_D_IMAGE:
                data = data.filter(e => e.assetType == AssetType.IMAGE_2D);
                break;
            case MarketplaceTab.AVATAR:
                data = data.filter(e => e.assetType == AssetType.AVATAR);
                break;
            case MarketplaceTab.RACE:
                data = data.filter(e => e.assetType == AssetType.RACE);
                break;
            case MarketplaceTab.BOT_LOGIC:
                data = data.filter(e => e.assetType == AssetType.BOT_LOGIC);
                break;
            case MarketplaceTab.GAME_MODE:
                data = data.filter(e => e.assetType == AssetType.GAME_MODE);
                break;
        }
        if (data.length == 0) {
            return (
                <h1 className="  m-auto">Nothing to show</h1>
            )
        }
        return (
            <NFTList data={data}  />
        )
    }

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <Accordion defaultActiveKey="nft_type" className="w-[200px] bg-black text-white">
                    <Accordion.Item eventKey="nft_type">
                        <Accordion.Header  >NFT Type</Accordion.Header>
                        <Accordion.Body className="flex flex-col bg-gray-900">
                            <ListingTabComponent label="All"
                                tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="2D Image"
                                tab={MarketplaceTab.TWO_D_IMAGE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Character Skin"
                                tab={MarketplaceTab.AVATAR} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Character Race"
                                tab={MarketplaceTab.RACE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Game Mode"
                                tab={MarketplaceTab.GAME_MODE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Bot Logic"
                                tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="nft_collection">
                        <Accordion.Header>Collection</Accordion.Header>
                        <Accordion.Body className="flex flex-col bg-gray-900">
                            To be Announced
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Sidebar>

            <section id='section-content' className='bg-deverse flex flex-col text-white' >
                <div className='flex flex-row grow'>
                    {renderContent()}
                </div>
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