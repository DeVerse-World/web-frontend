import { useContext, useEffect, useRef, useState } from "react";
import HomeNavbar from "../../components/home/HomeNavbar";
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

enum MarketplaceTab {
    LISTING = "listing",
    TWO_D_IMAGE = "2d-image",
    RACE = "character-race",
    SKIN = "character-skin",
    GAME_MODE = "game-mode",
    BOT_LOGIC = "bot-logic",
    MINT_NFT = "mint"
}

export default function Marketplace() {
    const { setViewState } = useContext(AppContext);
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<NFTAsset>(null);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [visibleTab, setVisibleTab] = useState<string>(MarketplaceTab.LISTING);
    const [fileUri, setFileUri] = useState(null);
    const router = useRouter();

    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        let assets = await AssetService.getAll(ApiStrategy.REST);
        assets = assets.filter(function(asset) {return asset != null;})
        setNfts(assets);
        setViewState(ViewState.SUCCESS)
    }

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;
        if (!query['tab']) {
            onSelectTab(MarketplaceTab.LISTING)
        } else if (query['tab'] == MarketplaceTab.MINT_NFT) {
            setVisibleTab(MarketplaceTab.MINT_NFT)
        }
        if (query['fileUri']) {
            setFileUri(`https://ipfs.infura.io/ipfs/${query['fileUri']}`);
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

    return (
        <>
            <HomeNavbar />
            <div className='deverse-background flex flex-column items-center min-h-[90vh]'>
                <Tab.Container id="tabs-with-dropdown" defaultActiveKey={MarketplaceTab.LISTING} >
                    <Nav className="w-[95%] cursor-pointer text-xl" activeKey={visibleTab}
                        onSelect={(e: MarketplaceTab) => {
                            onSelectTab(e);
                        }}>
                        <NavDropdown id="nav-dropdown-within-tab" title="Listing" menuVariant="dark"  color="black">
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
                            <NFTList data={nfts.filter(e => e.assetType == AssetType.IMAGE_2D)} onOpen={onOpenNFTDescription}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={MarketplaceTab.SKIN}>
                            <NFTList data={nfts.filter(e => e.assetType == AssetType.SKIN)} onOpen={onOpenNFTDescription}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={MarketplaceTab.RACE}>
                            <NFTList data={nfts.filter(e => e.assetType == AssetType.RACE)} onOpen={onOpenNFTDescription}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={MarketplaceTab.GAME_MODE}>
                            <NFTList data={nfts.filter(e => e.assetType == AssetType.GAME_MODE)} onOpen={onOpenNFTDescription}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={MarketplaceTab.BOT_LOGIC}>
                            <NFTList data={nfts.filter(e => e.assetType == AssetType.BOT_LOGIC)} onOpen={onOpenNFTDescription}/>
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
                <NFTDetailCard data={selectedAsset} show={showDetail} onHide={() => setShowDetail(false)}/>
            </div>
        </>

    )
}