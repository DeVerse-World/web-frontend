import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import AvatarContainer from "../../components/AvatarContainer";
import BaseLayout from "../../components/common/BaseLayout";
import Footer from "../../components/common/Footer";
import { AppContext } from "../../components/contexts/app_context";
import ListingTabComponent from "../../components/ListingTab";
import { MarketplaceTab } from "../../components/marketplace_tab";
import Sidebar from "../../components/Sidebar";

function CreatorDashboard() {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState<MarketplaceTab>(MarketplaceTab.CD_HOME);

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

    }

    if (user == null) {
        return (
            <div className="text-white">
                <h1>Login first please</h1>
            </div>
        )
    }



    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar >
                <div className="h-[100%] bg-gray-900 ">
                    <div className="flex flex-col text-white text-center gap-4 p-4">
                        <AvatarContainer />
                        Deverse Worlds
                    </div>
                    <div className="flex flex-col mt-8">
                        <ListingTabComponent tab={MarketplaceTab.CD_HOME} isSelected={visibleTab} onSelect={onSelectTab} />

                    </div>
                </div>

            </Sidebar>

            <section id='section-content' className='bg-deverse flex flex-col text-white ' >
                <div className="flex-grow p-4">
                    <div>
                        <h1>Home</h1>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="h-[350px] w-[200px] nft-card flex flex-col items-center p-4">
                            <h3>Statistics</h3>
                            <div className="w-full">
                                <h5>Total visits</h5>
                                <h3>6969</h3>
                                <h5>Total stars</h5>
                                <h3>1234</h3>

                                <p>Brief</p>
                                <h5>Total Active worlds</h5>
                                56
                            </div>
                        </div>
                        <div className="h-[350px] w-[200px] nft-card flex flex-col items-center p-4">
                            <h3>Revenue</h3>
                            <div className="w-full">
                                <h5>Total income</h5>
                                <h3>$8000</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    )
}
CreatorDashboard.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);
export default CreatorDashboard;