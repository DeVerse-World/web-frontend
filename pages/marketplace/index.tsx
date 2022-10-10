import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AssetService from "../../data/services/AssetService";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import Accordion from 'react-bootstrap/Accordion';
import ListingTabComponent from "../../components/ListingTab";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/common/Footer";
import { MarketplaceTab } from "../../components/marketplace_tab";
import BaseLayout from "../../components/common/BaseLayout";
import { ApiStrategy } from "../../data/services/ApiStrategy";
import FilterHeader from "../../components/FilterHeader";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";



function Marketplace() {
    const router = useRouter();
    const { setViewState } = useContext(AppContext);
    const [images, setImages] = useState<AvatarViewModel[]>([]);
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);

    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        AssetService.getAll(ApiStrategy.GraphQl).then(assets => {
            const avatars = assets.filter(e => e.assetType == AssetType.IMAGE_2D);
            let convertedData = avatars.map<AvatarViewModel>(item => ({
                id: item.id?.toString(),
                supply: item.supply,
                maxSupply: 9999,
                name: item.name,
                modelUri: item.image,
                image: item.fileAssetUri,
                deletable: true,
            }))
            setImages(convertedData)
            setViewState(ViewState.SUCCESS)
        }).catch(e => {
            console.log(e)
            setViewState(ViewState.ERROR)
        }).finally(() => {
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

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <div className="h-[100%] bg-gray-900">
                    <Accordion defaultActiveKey="nft_type" className="text-white" flush>
                        <FilterHeader eventKey="nft_type" label={'Categories'} />
                        <Accordion.Collapse eventKey="nft_type">
                            <div className="flex flex-col  px-3 py-2 ">
                                <ListingTabComponent tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.TWO_D_IMAGE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent tab={MarketplaceTab.AVATAR} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent isDisable tab={MarketplaceTab.RACE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent isDisable tab={MarketplaceTab.GAME_MODE} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent isDisable tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} />
                                <ListingTabComponent isDisable tab={MarketplaceTab.WORLDS} isSelected={visibleTab} onSelect={onSelectTab} />
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>

            </Sidebar>

            <section id='section-content' className='bg-deverse flex flex-col text-white ' >
                <div className="flex-grow p-4">
                    <span className="text-blue-300 text-3xl font-bold pl-4">Images</span>
                    <AvatarList data={images} />
                </div>
                {/* <div className='flex flex-row grow'>
                    {renderContent()}
                </div> */}
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