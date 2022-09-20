import { useContext, useEffect, useRef, useState } from "react";
import { AccordionContext, Dropdown, Nav, NavDropdown, NavItem, Row, Tab, Tabs, useAccordionButton } from "react-bootstrap";
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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";



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
            <NFTList data={data} />
        )
    }

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <Accordion defaultActiveKey="nft_type" className="w-[150px]  text-white" flush>
                    <FilterHeader eventKey="nft_type" label={'Categories'} />
                    <Accordion.Collapse eventKey="nft_type">
                        <div className="flex flex-col bg-gray-800 px-3 py-2">                            <ListingTabComponent label="All"
                            tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Image"
                                tab={MarketplaceTab.TWO_D_IMAGE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Avatar"
                                tab={MarketplaceTab.AVATAR} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Race"
                                tab={MarketplaceTab.RACE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Gameplay"
                                tab={MarketplaceTab.GAME_MODE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Item" isDisable
                                tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="World" isDisable
                                tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} /></div>
                    </Accordion.Collapse>
                    {/* <Accordion.Item eventKey="nft_type">
                        <Accordion.Header className="bg-red-500" >Categories</Accordion.Header>
                        <Accordion.Body className="flex flex-col bg-gray-900">

                        </Accordion.Body>
                    </Accordion.Item> */}
                    {/* <Accordion.Item eventKey="nft_collection">
                        <Accordion.Header>Collection</Accordion.Header>
                        <Accordion.Body className="flex flex-col bg-gray-900">
                            To be Announced
                        </Accordion.Body>
                    </Accordion.Item> */}
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

function FilterHeader({ label, eventKey }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, null);
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
        <div
            className="cursor-pointer px-3 py-2 text-lg bg-slate-800 text-blue-300 flex flex-row justify-between items-center"
            onClick={decoratedOnClick}>
            {label}
            {isCurrentEventKey ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
    );
}

Marketplace.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);

export default Marketplace;