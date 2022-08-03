import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { AiFillWindows } from "react-icons/ai";
import Footer from "../../components/common/Footer";
import TabHeader from "../../components/common/TabHeader";
import DownloadDemoButton from "../../components/DownloadDemoButton";
import Sidebar from "../../components/Sidebar";

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
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                <Tab.Container id="tabs-with-dropdown" activeKey={selectedTab} >
                    <span className="flex flex-row justify-between bg-black">
                        <Nav className="tab-bar flex-grow"
                            onSelect={setSelectedTab} >
                            <TabHeader eventKey={AlphaTab.INFO} selectedTab={selectedTab} label="Info" />
                            <TabHeader eventKey={AlphaTab.VERSE} selectedTab={selectedTab} label="Verses" />
                        </Nav>
                        <DownloadDemoButton />
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
        </div>

    );
}

export default Alpha;