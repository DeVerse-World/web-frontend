import React, { CSSProperties, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { TimeFilter } from "../../data/enum/time_filter";
import { DataFilter } from "../../data/enum/data_filter";
import WalletService from "../../data/services/WalletService";
import { timestampToLabel } from "../../utils/time_util";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/common/Footer";
import { Nav, Tab } from "react-bootstrap";
import ProfileTab from "./ProfileTab";
import { AccountTab } from "../../data/enum/PageTabs";
import TabHeader from "../../components/common/TabHeader";

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

const selectedTabStyle: CSSProperties = {
    borderBottom: '2px solid white'
}

export default function Account() {
    const [selectedTab, setSelectedTab] = useState(AccountTab.Profile)
    const [dataSet, setDataSet] = useState([]);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.MONTH);
    const [dataFilter, setDataFilter] = useState<DataFilter>(DataFilter.STAKING_BALANCE);
    const [yLabels, setYLabel] = useState([]);

    // const today = new Date();

    useEffect(() => {

        displayData();
    }, [timeFilter, dataFilter]);


    const displayData = async () => {

        let res = await WalletService.getStats(dataFilter, timeFilter);
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

    // useEffect(() => {
    //     displayData();
    // }, []);

    useEffect(() => {
        switch (timeFilter) {
            case TimeFilter.DAY:

                break;
            case TimeFilter.WEEK:

                break;
            case TimeFilter.MONTH:
                setYLabel(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
                break;
            default:
                break;
        }
    }, [timeFilter])

    return (
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                <Tab.Container id="tabs-with-dropdown" activeKey={selectedTab} >
                    <Nav className="tab-bar"
                        onSelect={setSelectedTab} >
                        <TabHeader eventKey={AccountTab.Profile} selectedTab={selectedTab} label="Profile"/>
                        <TabHeader eventKey={AccountTab.Inventory} selectedTab={selectedTab} label="Inventory"/>
                        <TabHeader eventKey={AccountTab.Avatar} selectedTab={selectedTab} label="Avatar"/>
                        <TabHeader eventKey={AccountTab.Settings} selectedTab={selectedTab} label="Settings"/>
                    </Nav>

                    <Tab.Content className="grow flex">
                        <Tab.Pane eventKey={AccountTab.Profile} className="grow">
                            <ProfileTab />
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
                        <Tab.Pane eventKey={AccountTab.Settings} className="grow">
                            <div className="flex justify-center items-center text-white p-4" >
                                <h1 >Coming soon</h1>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>

                </Tab.Container>
                <Footer />
            </section>
        </div>
        // <div>
        //     <div className="flex flex-col bg-blue m-16 p-4 border-2 rounded-sm border-black">
        //         <b>$DVRS</b>
        //         <h2>123 Coins</h2>
        //         <div className="flex flex-row item-center justify-end">
        //             <Button className="btn btn-primary w-32 mx-2">Buy</Button>
        //             <Button className="btn btn-primary w-32 mx-2">Swap</Button>
        //         </div>
        //     </div>
        //     <div className="flex flex-col bg-blue m-16 ">
        //         {/* <div>
        //             <Form.Select aria-label="Default select example">
        //                 <option>Open this select menu</option>
        //                 <option value="1">One</option>
        //                 <option value="2">Two</option>
        //                 <option value="3">Three</option>
        //             </Form.Select>
        //         </div> */}

        //         <select className="w-40 mb-8"
        //             name="dataFilter"
        //             defaultValue={DataFilter.STAKING_BALANCE}
        //             onChange={(e) => {
        //                 setDataFilter(e.currentTarget.value as DataFilter);
        //             }}>
        //             <option value={DataFilter.ACTIVITIES}>{DataFilter.ACTIVITIES}</option>
        //             <option value={DataFilter.STAKING_BALANCE}>{DataFilter.STAKING_BALANCE}</option>
        //             <option value={DataFilter.TIME_SPENT}>{DataFilter.TIME_SPENT}</option>
        //         </select>


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
        // </div>
    );
}