import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NFTList from "../../components/asset/NFTList";
import AssetService from "../../data/services/AssetService";
import { NFTAsset } from "../../data/model/nft_asset";
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
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.All);

    useEffect(() => {
        loadNFTs(null)
    }, [])

    const loadNFTs = async (query: string) => {
        setViewState(ViewState.LOADING)
        AssetService.getAll(ApiStrategy.GraphQl).then(assets => {
            const avatars = assets.filter(e => e.assetType == AssetType.IMAGE_2D);
            console.log(avatars)
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
            setNfts(assets.filter((asset) => asset != null));
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

    const renderContent = () => {
        let data = nfts;
        switch (visibleTab) {
            case MarketplaceTab.TWO_D_IMAGE:
                data = data.filter(e => e.assetType === AssetType.IMAGE_2D);
                break;
            case MarketplaceTab.AVATAR:
                data = data.filter(e => e.assetType === AssetType.AVATAR);
                break;
            case MarketplaceTab.RACE:
                data = data.filter(e => e.assetType === AssetType.RACE);
                break;
            case MarketplaceTab.BOT_LOGIC:
                data = data.filter(e => e.assetType === AssetType.BOT_LOGIC);
                break;
            case MarketplaceTab.GAME_MODE:
                data = data.filter(e => e.assetType === AssetType.GAME_MODE);
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
                <Accordion defaultActiveKey="nft_type" className="w-[150px] h-[100%] text-white" flush>
                    <FilterHeader eventKey="nft_type" label={'Categories'} />
                    <Accordion.Collapse eventKey="nft_type">
                        <div className="flex flex-col bg-gray-800 px-3 py-2 ">
                            <ListingTabComponent label="All"
                                tab={MarketplaceTab.All} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Image"
                                tab={MarketplaceTab.TWO_D_IMAGE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Avatar"
                                tab={MarketplaceTab.AVATAR} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Race" isDisable
                                tab={MarketplaceTab.RACE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Gameplay" isDisable
                                tab={MarketplaceTab.GAME_MODE} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Item" isDisable
                                tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="World" isDisable
                                tab={MarketplaceTab.BOT_LOGIC} isSelected={visibleTab} onSelect={onSelectTab} /></div>
                    </Accordion.Collapse>
                </Accordion>
            </Sidebar>

            <section id='section-content' className='bg-deverse flex flex-col text-white ' >
                <div className="flex-grow p-4">
                    <span className="text-blue-300 text-3xl font-bold pl-4">Images</span>
                    <AvatarList alignStart data={images}/>
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