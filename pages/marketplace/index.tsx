import { useContext, useEffect, useRef, useState } from "react";
import HomeNavbar from "../../components/home/HomeNavbar";
import { Button, Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import BaseService from "../../data/services/base_service";
import ApiStrategy = BaseService.ApiStrategy;
import CreateNftAssetSection from "../../components/asset/CreateNftAssetSection";
import { MiniTabButton } from "../../components/MiniTabButton";
import { useRouter } from "next/router";
import NFTList from "../../components/asset/NFTList";
import AssetService from "../../data/services/asset_service";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";

enum MarketplaceTab {
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
    const [visibleTab, setVisibleTab] = useState<string>(MarketplaceTab.TWO_D_IMAGE);
    const [fileUri, setFileUri] = useState(null);
    const router = useRouter();

    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        const assets = await AssetService.getAll(ApiStrategy.REST);
        setNfts(assets);
        setViewState(ViewState.SUCCESS)
    }

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;
        if (!query['tab']) {
            onSelectTab(MarketplaceTab.TWO_D_IMAGE)
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

    const isTabSelected = (tab: MarketplaceTab) => {
        return visibleTab == tab;
    }

    return (
        <>
            <HomeNavbar />
            <div className='deverse-background flex flex-column justify-center  items-center'>
                <Tabs id="deverse-tabs" className="mt-4 w-[95%]"
                    activeKey={visibleTab}
                    onSelect={(e: MarketplaceTab) => {
                        onSelectTab(e)
                    }} >
                    <Tab eventKey={MarketplaceTab.TWO_D_IMAGE} title="2D Image" >
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.IMAGE_2D)} />
                    </Tab>
                    <Tab eventKey={MarketplaceTab.RACE} title="Character Race" >
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.RACE)} />
                    </Tab>
                    <Tab eventKey={MarketplaceTab.SKIN} title="Character Skin" >
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.SKIN)} />
                    </Tab>
                    <Tab eventKey={MarketplaceTab.GAME_MODE} title="Game Mode" >
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.GAME_MODE)} />
                    </Tab>
                    <Tab eventKey={MarketplaceTab.BOT_LOGIC} title="Bot Logic" >
                        <NFTList data={nfts.filter(e => e.assetType == AssetType.BOT_LOGIC)} />
                    </Tab>
                    <Tab eventKey={MarketplaceTab.MINT_NFT} title="Mint NFT">
                        <CreateNftAssetSection
                            fileUri={fileUri}
                            isSelected={isTabSelected(MarketplaceTab.MINT_NFT)}
                            onNftCreated={(assetType: AssetType, fileUri: string) => {
                                //TODO: 
                                onSelectTab(MarketplaceTab.TWO_D_IMAGE);
                            }}
                        />
                    </Tab>
                </Tabs>
                {/* <div className="flex flex-row justify-center text-white mt-8">
                    <MiniTabButton title="Listing"
                        isSelected={isTabSelected(MarketplaceTab.LISTING)}
                        onClick={() => onSelectTab(MarketplaceTab.LISTING)} />
                    <MiniTabButton title="Mint NFT"
                        isSelected={isTabSelected(MarketplaceTab.MINT_NFT)}
                        onClick={() => onSelectTab(MarketplaceTab.MINT_NFT)} />
                </div>
                <MarketList ref={marketListingRef}
                    isSelected={isTabSelected(MarketplaceTab.LISTING)} />
                <CreateNftAssetSection
                    fileUri={fileUri}
                    isSelected={isTabSelected(MarketplaceTab.MINT_NFT)}
                    onNftCreated={(fileUri: string) => {
                        marketListingRef.current?.loadData(fileUri);
                        onSelectTab(MarketplaceTab.LISTING);
                    }}
                /> */}
            </div>
        </>

    )
}