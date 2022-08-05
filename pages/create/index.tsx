import { CSSProperties, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Footer from "../../components/common/Footer";
import TabHeader from "../../components/common/TabHeader";
import Sidebar from "../../components/Sidebar";
import avatar_service from "../../data/services/AvatarService";

enum CreateTab {
    AVATAR, IG_EDITOR, UE_SDK
}

function Create() {
    const [selectedTab, setSelectedTab] = useState(CreateTab.AVATAR)

    const handleIFrameEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        if (e.data.includes('.glb')) {
            avatar_service.createAvatar(e.data);
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleIFrameEvent);
        return () => {
            window.removeEventListener('keydown', handleIFrameEvent);
        };
    }, [])

    return (
        <div className='flex flex-row bg-deverse '>
        <Sidebar />
        <section id='section-content' className="flex flex-col justify-between ">
            <Tab.Container id="tabs-with-dropdown" activeKey={selectedTab}>
                <Nav className="tab-bar" onSelect={setSelectedTab}>
                    <TabHeader eventKey={CreateTab.AVATAR} label="Avatar" selectedTab={selectedTab}/>
                    <TabHeader eventKey={CreateTab.IG_EDITOR} label="In-game Editor" selectedTab={selectedTab}/>
                    <TabHeader eventKey={CreateTab.UE_SDK} label="Unreal Engine SDK" selectedTab={selectedTab}/>
                </Nav>
                <Tab.Content className="grow flex">
                    <Tab.Pane eventKey={CreateTab.AVATAR} className="grow">
                        <iframe allow="camera *; microphone *"
                            className='rpo'
                            src='https://deverse.readyplayer.me/avatar?frameApi' />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CreateTab.IG_EDITOR} className="grow">
                        <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CreateTab.UE_SDK} className="grow">
                    <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey={MarketplaceTab.SKIN}>
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
                </Tab.Pane> */}
                </Tab.Content>
            </Tab.Container>
            <Footer />
        </section>
        </div>
    )
}

export default Create;