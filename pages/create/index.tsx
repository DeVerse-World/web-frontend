import { CSSProperties, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Footer from "../../components/common/Footer";

enum CreateTab {
    AVATAR, IG_EDITOR, UE_SDK
}

const selectedTabStyle: CSSProperties = {
    borderBottom: '2px solid blue'
}

function Create() {
    const [selectedTab, setSelectedTab] = useState(CreateTab.AVATAR)

    const handleIFrameEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        let glbUri = e.data;
        console.log(glbUri);
    }

    useEffect(() => {
        window.addEventListener('message', handleIFrameEvent);
        return () => {
            window.removeEventListener('keydown', handleIFrameEvent);
        };
    }, [])

    return (
        <section>
            {/* <button onClick={() => router.push('/mint-nft')}>Test</button> */}
            <Tab.Container id="tabs-with-dropdown" >
                <Nav className="flex flex-row justify-evenly  cursor-pointer text-xl bg-black align-middle py-2 px-8"
                    activeKey={CreateTab.AVATAR}
                    onSelect={setSelectedTab}>
                    <Nav.Item style={selectedTab == CreateTab.AVATAR ? selectedTabStyle : {}}>
                        <Nav.Link eventKey={CreateTab.AVATAR}>Avatar</Nav.Link>
                    </Nav.Item>
                    {/* <NavDropdown id="nav-dropdown-within-tab" title="Listing" menuVariant="dark" color="black">
                    <Dropdown.Item active={visibleTab == MarketplaceTab.LISTING} eventKey={MarketplaceTab.LISTING}>All</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.TWO_D_IMAGE} eventKey={MarketplaceTab.TWO_D_IMAGE}>2D Image</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.SKIN} eventKey={MarketplaceTab.SKIN}>Character Skin</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.RACE} eventKey={MarketplaceTab.RACE}>Character Race</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.GAME_MODE} eventKey={MarketplaceTab.GAME_MODE}>Game Mode</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.BOT_LOGIC} eventKey={MarketplaceTab.BOT_LOGIC}>Bot Logic</Dropdown.Item>
                </NavDropdown> */}
                    <Nav.Item style={selectedTab == CreateTab.IG_EDITOR ? selectedTabStyle : {}}>
                        <Nav.Link eventKey={CreateTab.IG_EDITOR}>In-game Editor</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={selectedTab == CreateTab.UE_SDK ? selectedTabStyle : {}}>
                        <Nav.Link eventKey={CreateTab.UE_SDK}>Unreal Engine SDK</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='min-h-[90vh]'>
                    <Tab.Pane eventKey={CreateTab.AVATAR}>
                        <iframe allow="camera *; microphone *"
                            className='rpo'
                            src='https://deverse.readyplayer.me/avatar?frameApi'></iframe>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CreateTab.IG_EDITOR}>

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
    )
}

export default Create;