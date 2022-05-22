import { useEffect, useRef, useState } from "react";
import HomeNavbar from "../../components/home/HomeNavbar";
import { Button } from "react-bootstrap";

import CreateNftAssetSection from "../../components/asset/CreateNftAssetSection";
import { MiniTabButton } from "../../components/MiniTabButton";
import { useRouter } from "next/router";
import { MarketList } from "../../components/asset/MarketList";

enum MarketplaceTab {
    LISTING = "listing",
    MINT_NFT = "mint"
}

export default function Marketplace() {
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.LISTING);
    const [fileUri, setFileUri] = useState(null);
    const marketListingRef = useRef();
    const router = useRouter();

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

    // useEffect(() => {
    // }, [visibleTab])

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
            <div className='deverse-background flex flex-column justify-center items-center'>
                <div className="flex flex-row justify-center text-white mt-8">
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
                />
            </div>
        </>

    )
}