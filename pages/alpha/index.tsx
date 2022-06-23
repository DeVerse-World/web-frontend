import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { AiFillWindows } from "react-icons/ai";
import Footer from "../../components/common/Footer";

enum AlphaTab {
    INFO, VERSE
}

const selectedTabStyle: CSSProperties = {
    borderBottom: '2px solid blue'
}

function Alpha() {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState(AlphaTab.INFO)

    return (
        <section className='h-[100%]'>
            {/* <button onClick={() => router.push('/mint-nft')}>Test</button> */}
            <Tab.Container id="tabs-with-dropdown"  >
                <Nav className="flex flex-row justify-between  cursor-pointer text-xl bg-black align-middle py-2 px-8"
                    activeKey={selectedTab}
                    onSelect={setSelectedTab} >

                    <span className="flex flex-row grow justify-evenly " >
                        <Nav.Item className="grow text-center max-w-[150px]" style={selectedTab == AlphaTab.INFO ? selectedTabStyle : {}}>
                            <Nav.Link eventKey={AlphaTab.INFO}>Info</Nav.Link>
                        </Nav.Item>
                        
                        {/* <NavDropdown id="nav-dropdown-within-tab" title="Listing" menuVariant="dark" color="black">
                        <Dropdown.Item active={visibleTab == MarketplaceTab.LISTING} eventKey={MarketplaceTab.LISTING}>All</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.TWO_D_IMAGE} eventKey={MarketplaceTab.TWO_D_IMAGE}>2D Image</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.SKIN} eventKey={MarketplaceTab.SKIN}>Character Skin</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.RACE} eventKey={MarketplaceTab.RACE}>Character Race</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.GAME_MODE} eventKey={MarketplaceTab.GAME_MODE}>Game Mode</Dropdown.Item>
                        <Dropdown.Item active={visibleTab == MarketplaceTab.BOT_LOGIC} eventKey={MarketplaceTab.BOT_LOGIC}>Bot Logic</Dropdown.Item>
                    </NavDropdown> */}
                        <Nav.Item className="grow text-center max-w-[150px]" style={selectedTab == AlphaTab.VERSE ? selectedTabStyle : {}}>
                            <Nav.Link eventKey={AlphaTab.VERSE}>Verses</Nav.Link>
                        </Nav.Item>
                    </span>
                    <Nav.Item className="flex flex-row items-center text-white rounded-3xl py-2 px-4 bg-deverse-gradient" onClick={() => {
                        window.open("https://drive.google.com/file/d/1va5Nyvzbz0PfheMk2Ma10JVuN4rsGliH/view", "_blank")
                    }} >
                        <span className="me-2">Download</span>
                        <AiFillWindows fontSize="1.5rem" />
                    </Nav.Item>

                </Nav>
                <Tab.Content className="min-h-[90vh]">
                    <Tab.Pane eventKey={AlphaTab.INFO}>

                    </Tab.Pane>
                    <Tab.Pane eventKey={AlphaTab.VERSE}>

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
    );
}

export default Alpha;