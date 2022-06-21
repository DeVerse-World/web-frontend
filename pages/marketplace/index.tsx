import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, Nav, NavDropdown, NavItem, Row, Tab, Tabs } from "react-bootstrap";
import BaseService from "../../data/services/base_service";
import ApiStrategy = BaseService.ApiStrategy;
import CreateNftAssetSection from "../../components/asset/CreateNftAssetSection";
import { useRouter } from "next/router";
import NFTList from "../../components/asset/NFTList";
import AssetService from "../../data/services/asset_service";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import NFTDetailCard from "../../components/asset/NFTDetailCard";
import Accordion from 'react-bootstrap/Accordion';
import ListingTabComponent from "./ListingTab";

enum MarketplaceTab {
    All = "all",
    TWO_D_IMAGE = "2d-image",
    RACE = "character-race",
    SKIN = "character-skin",
    GAME_MODE = "game-mode",
    BOT_LOGIC = "bot-logic",
}

export default function Marketplace() {
    const router = useRouter();
    const { setViewState } = useContext(AppContext);

    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<NFTAsset>(null);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);


    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        let assets = await AssetService.getAll(ApiStrategy.REST);
        setNfts(assets.filter((asset) => asset != null));
        console.log(assets)
        setViewState(ViewState.SUCCESS)
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

    const onOpenNFTDescription = (data: NFTAsset) => {
        setSelectedAsset(data);
        setShowDetail(true);
    }

    const renderContent = () => {
        let data = nfts;
        console.log(visibleTab)
        switch (visibleTab) {
            case MarketplaceTab.TWO_D_IMAGE:
                data = data.filter(e => e.assetType == AssetType.IMAGE_2D);
                break;
            case MarketplaceTab.SKIN:
                data = data.filter(e => e.assetType == AssetType.SKIN);
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
        return (
            <NFTList data={data} onOpen={onOpenNFTDescription} />
        )
    }

    return (
        <section className='deverse-background flex flex-row text-white' style={{
            minHeight: "calc(100vh - 60px)"
        }}>
            <Accordion defaultActiveKey="nft_type" className="w-[200px] min-h-[100%] bg-gray-900">
                <Accordion.Item eventKey="nft_type">
                    <Accordion.Header  >NFT Type</Accordion.Header>
                    <Accordion.Body className="flex flex-col bg-gray-900">
                        <ListingTabComponent label="All" isSelected={visibleTab == MarketplaceTab.All}
                            onSelect={() => onSelectTab(MarketplaceTab.All)} />
                        <ListingTabComponent label="2D Image" isSelected={visibleTab == MarketplaceTab.TWO_D_IMAGE}
                            onSelect={() => onSelectTab(MarketplaceTab.TWO_D_IMAGE)} />
                        <ListingTabComponent label="Character Skin" isSelected={visibleTab == MarketplaceTab.SKIN}
                            onSelect={() => onSelectTab(MarketplaceTab.SKIN)} />
                        <ListingTabComponent label="Character Race" isSelected={visibleTab == MarketplaceTab.RACE}
                            onSelect={() => onSelectTab(MarketplaceTab.RACE)} />
                        <ListingTabComponent label="Game Mode" isSelected={visibleTab == MarketplaceTab.GAME_MODE}
                            onSelect={() => onSelectTab(MarketplaceTab.GAME_MODE)} />
                        <ListingTabComponent label="Bot Logic" isSelected={visibleTab == MarketplaceTab.BOT_LOGIC}
                            onSelect={() => onSelectTab(MarketplaceTab.BOT_LOGIC)} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="nft_collection">
                    <Accordion.Header>Collection</Accordion.Header>
                    <Accordion.Body className="flex flex-col bg-gray-900">
                        Lorem ipsum dolo
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div>
                {renderContent()}
                <NFTDetailCard data={selectedAsset} show={showDetail} onHide={() => setShowDetail(false)} />
            </div>

            {/* <Tab.Container id="tabs-with-dropdown" defaultActiveKey={MarketplaceTab.LISTING} >
                <Nav className="w-[95%] cursor-pointer text-xl" activeKey={visibleTab}
                    onSelect={(e: MarketplaceTab) => {
                        onSelectTab(e);
                    }}>
                    <NavDropdown id="nav-dropdown-within-tab" title="Listing" menuVariant="dark" color="black">
                        <Dropdown.Item active={visibleTab == MarketplaceTab.LISTING} eventKey={MarketplaceTab.LISTING}>All</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.TWO_D_IMAGE} eventKey={MarketplaceTab.TWO_D_IMAGE}>2D Image</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.SKIN} eventKey={MarketplaceTab.SKIN}>Character Skin</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.RACE} eventKey={MarketplaceTab.RACE}>Character Race</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.GAME_MODE} eventKey={MarketplaceTab.GAME_MODE}>Game Mode</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.BOT_LOGIC} eventKey={MarketplaceTab.BOT_LOGIC}>Bot Logic</Dropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link eventKey={MarketplaceTab.MINT_NFT}>Mint NFT</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="min-h-[70vh]">
                    <Tab.Pane active={visibleTab == MarketplaceTab.LISTING} eventKey={MarketplaceTab.LISTING}>
                        <NFTList data={nfts} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={MarketplaceTab.TWO_D_IMAGE}>
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.IMAGE_2D)} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={MarketplaceTab.SKIN}>
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.SKIN)} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={MarketplaceTab.RACE}>
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.RACE)} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={MarketplaceTab.GAME_MODE}>
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.GAME_MODE)} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={MarketplaceTab.BOT_LOGIC}>
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.BOT_LOGIC)} onOpen={onOpenNFTDescription} />
                    </Tab.Pane>
                    <Tab.Pane active={visibleTab == MarketplaceTab.MINT_NFT} eventKey={MarketplaceTab.MINT_NFT}>
                        <CreateNftAssetSection
                            fileUri={fileUri}
                            onNftCreated={(assetType: AssetType, fileUri: string) => {
                                //TODO: should we reload everything?
                                loadNFTs(null);
                                onSelectTab(MarketplaceTab.LISTING);
                            }}
                        />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
             */}

        </section>

    )
}