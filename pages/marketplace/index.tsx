import { useEffect, useState } from "react";
import BaseService from "../../data/services/base_service";
import HomeNavbar from "../../components/home/HomeNavbar";
import { Button } from "react-bootstrap";
import MarketList from "./MarketList";
import CreateNftAssetSection from "./CreateNftAssetSection";

enum MarketplaceTab {
    MARKET, NFT_CREATOR
}

export default function Marketplace() {
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.NFT_CREATOR);

    const renderTabContent = () => {
        let content = null;
        switch (visibleTab) {
            case MarketplaceTab.NFT_CREATOR:
                content = (<CreateNftAssetSection />)
                break;

            default:
                content = (<MarketList />)
                break;
        }
        return content;
    }

    return (
        <>
            <HomeNavbar />
            <div className='deverse-background flex flex-column justify-center items-center'>
                <div className="flex flex-row justify-center text-white mt-8">
                    <h2 className="deverse-gradient rounded mx-8 p-2 cursor-pointer"
                        onClick={() => setVisibleTab(MarketplaceTab.MARKET)}>Markets</h2>
                    <h2 className="deverse-gradient rounded mx-8 p-2 cursor-pointer"
                        onClick={() => setVisibleTab(MarketplaceTab.NFT_CREATOR)}>Mint NFT</h2>
                </div>
                {renderTabContent()}
            </div>
        </>

    )
}