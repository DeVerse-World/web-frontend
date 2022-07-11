import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { AiFillWindows } from "react-icons/ai";
import Footer from "../../components/common/Footer";
import DownloadDemoButton from "../../components/DownloadDemoButton";

enum AlphaTab {
    INFO, VERSE
}

const selectedTabStyle: CSSProperties = {
    borderBottom: '2px solid white'
}

function Alpha() {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState(AlphaTab.INFO)

    return (
        <section className='flex flex-col justify-between min-h-[100vh]'>
            {/* <button onClick={() => router.push('/mint-nft')}>Test</button> */}
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={AlphaTab.INFO} >
                <span className="flex flex-row justify-between bg-black">
                    <Nav className="flex flex-row flex-grow justify-between  cursor-pointer text-xl  align-middle py-2 px-8"
                        activeKey={selectedTab}
                        onSelect={setSelectedTab} >
                        <span className="flex flex-row grow justify-evenly " >
                            <Nav.Item className="grow text-center max-w-[150px] " style={selectedTab == AlphaTab.INFO ? selectedTabStyle : {}}>
                                <Nav.Link className="text-white" eventKey={AlphaTab.INFO}>Info</Nav.Link>
                            </Nav.Item>

                            <Nav.Item className="grow text-center max-w-[150px]" style={selectedTab == AlphaTab.VERSE ? selectedTabStyle : {}}>
                                <Nav.Link className="text-white" eventKey={AlphaTab.VERSE}>Verses</Nav.Link>
                            </Nav.Item>
                            
                        </span>
                    </Nav>
                    <DownloadDemoButton/>
                </span>

                <Tab.Content className="grow flex">
                    <Tab.Pane eventKey={AlphaTab.INFO} className="grow">
                        <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={AlphaTab.VERSE} className="grow">
                        <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <Footer />
        </section>
    );
}

export default Alpha;