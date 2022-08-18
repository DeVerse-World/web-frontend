import React, { CSSProperties, useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { TimeFilter } from "../../data/enum/time_filter";
import { DataFilter } from "../../data/enum/data_filter";
import AccountService from "../../data/services/AccountService";
import { timestampToLabel } from "../../utils/time_util";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/common/Footer";
import { Nav, Tab } from "react-bootstrap";
import ProfileTab from "./ProfileTab";
import { AccountTab } from "../../data/enum/PageTabs";
import TabHeader from "../../components/common/TabHeader";
import AccountSetting from "./AccountSettings";
import AssetService from "../../data/services/AssetService";
import { AppContext } from "../../components/contexts/app_context";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// X-axis: filter by day/week/month/year
// y-axis: filter by activities, minute spent, staking balance, and more

export default function Account() {
    const { user } = useContext(AppContext);
    const [selectedTab, setSelectedTab] = useState<AccountTab>(AccountTab.Profile)
    const [dataSet, setDataSet] = useState([]);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.MONTH);
    const [dataFilter, setDataFilter] = useState<DataFilter>(DataFilter.STAKING_BALANCE);
    const [yLabels, setYLabel] = useState([]);

    // const today = new Date();

    // useEffect(() => {
    //     displayData();
    // }, [timeFilter, dataFilter]);

    const displayData = async () => {

        let res = await AccountService.getStats(dataFilter, timeFilter);
        let convertedData = res.map(item => ({
            y: item.count,
            x: timestampToLabel(item.timestamp, timeFilter)
        }));

        const data = [
            {
                data: convertedData,
                borderColor: '#FF0000',
                backgroundColor: '#FF0000',
            }
        ];
        setDataSet(data);
    }

    useEffect(() => {
        if (user == null) {
            return;
        }
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess) {
                console.log(e.value);
            }
        })
        if (user.wallet_address != null) {
            AssetService.fetchUserAssets(user.wallet_address).then(e => {
                console.log(e.value);
            })
        }
    }, [user]);

    // useEffect(() => {
    //     switch (timeFilter) {
    //         case TimeFilter.DAY:

    //             break;
    //         case TimeFilter.WEEK:

    //             break;
    //         case TimeFilter.MONTH:
    //             setYLabel(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    //             break;
    //         default:
    //             break;
    //     }
    // }, [timeFilter])

    const renderMainContent = () => {
        return (
            <Tab.Container id="tabs-with-dropdown" activeKey={selectedTab} >
                <Nav className="tab-bar"
                    onSelect={setSelectedTab} >
                    <TabHeader eventKey={AccountTab.Profile} selectedTab={selectedTab} label="Profile" />
                    <TabHeader eventKey={AccountTab.Inventory} selectedTab={selectedTab} label="Inventory" />
                    <TabHeader eventKey={AccountTab.Avatar} selectedTab={selectedTab} label="Avatar" />
                </Nav>

                <Tab.Content className="grow flex">
                    <Tab.Pane eventKey={AccountTab.Profile} className="grow">
                        <ProfileTab onSwitchTab={setSelectedTab} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={AccountTab.Inventory} className="grow">
                        <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={AccountTab.Avatar} className="grow">
                        <div className="flex justify-center items-center text-white p-4" >
                            <h1 >Coming soon</h1>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        );
    }

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                {user ? renderMainContent() :
                    <div className="text-center text-white m-auto"><h1>Please Login first</h1></div>
                }
                <Footer />
            </section>
        </div>
 


        //         <Line className="p-8 border-2 rounded-sm border-black" options={{
        //             responsive: true,
        //             plugins: {
        //                 legend: {
        //                     // position: 'top' as const,
        //                     display: false
        //                 },
        //                 // title: {
        //                 //     display: true,
        //                 //     text: 'User statistics',
        //                 // },
        //             },
        //         }}
        //             data={{
        //                 labels: yLabels,
        //                 datasets: dataSet
        //             }} />
        //     </div>
    );
}