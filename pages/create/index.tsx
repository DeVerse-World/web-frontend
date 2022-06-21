import { useEffect } from "react";
import { Nav, Tab } from "react-bootstrap";
import Footer from "../../components/common/Footer";

function Create() {

    const handleIFrameEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me')) {
            return;
        }
        let glbUri = e.data;
        console.log(e);
    }

    useEffect(() => {
        window.addEventListener('message', handleIFrameEvent);
        return () => {
            window.removeEventListener('keydown', handleIFrameEvent);
        };
    }, [])

    return (
        <section className='bg-deverse h-[100%]'>
            {/* <button onClick={() => router.push('/mint-nft')}>Test</button> */}
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={"Avatar"} >
                <Nav className="w-[95%] cursor-pointer text-xl  align-middle" activeKey={"Avatar"} >
                    <Nav.Item >
                        <Nav.Link eventKey={"Avatar"}>Avatar</Nav.Link>
                    </Nav.Item>
                    {/* <NavDropdown id="nav-dropdown-within-tab" title="Listing" menuVariant="dark" color="black">
                    <Dropdown.Item active={visibleTab == MarketplaceTab.LISTING} eventKey={MarketplaceTab.LISTING}>All</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.TWO_D_IMAGE} eventKey={MarketplaceTab.TWO_D_IMAGE}>2D Image</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.SKIN} eventKey={MarketplaceTab.SKIN}>Character Skin</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.RACE} eventKey={MarketplaceTab.RACE}>Character Race</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.GAME_MODE} eventKey={MarketplaceTab.GAME_MODE}>Game Mode</Dropdown.Item>
                    <Dropdown.Item active={visibleTab == MarketplaceTab.BOT_LOGIC} eventKey={MarketplaceTab.BOT_LOGIC}>Bot Logic</Dropdown.Item>
                </NavDropdown> */}
                    <Nav.Item>
                        <Nav.Link eventKey={"In-game Editor"}>In-game Editor</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={"UE SDK"}>UE SDK</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="min-h-[70vh]">
                    <Tab.Pane eventKey={"Avatar"}>
                        <iframe allow="camera *; microphone *" className='rpo' src='https://deverse.readyplayer.me/avatar?frameApi'></iframe>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"In-game Editor"}>

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
            <Footer/>
        </section>
    )
}

export default Create;