import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AvatarContainer from "../../components/AvatarContainer";
import { AppContext } from "../../components/contexts/app_context";
import ListingTabComponent from "../../components/ListingTab";
import { SecondaryTab } from "../../components/marketplace_tab";
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend, BarElement, LineController } from 'chart.js';
import { TimeFilter } from "../../data/enum/time_filter";
import { DataFilter } from "../../data/enum/data_filter";
import AccountService from "../../data/services/AccountService";
import { timestampToLabel } from "../../utils/time_util";
import UnauthorizedView from "../../components/UnauthorizedView";
import LayoutWrapper from "../../components/LayoutWrapper";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend
);

// X-axis: filter by day/week/month/year
// y-axis: filter by activities, minute spent, staking balance, and more
export default function CreatorDashboard() {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState<SecondaryTab>(SecondaryTab.CD_HOME);
    const [playDataset, setPlayDataSet] = useState([]);
    const [revDataset, setRevPlayDataSet] = useState([]);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.MONTH);
    const [playLabels, setPlayLabels] = useState([]);
    const [revLabels, setRevPlayLabels] = useState([]);

    useEffect(() => {
        switch (timeFilter) {
            case TimeFilter.DAY:

                break;
            case TimeFilter.WEEK:

                break;
            case TimeFilter.MONTH:
                setPlayLabels(['April', 'May', 'June', 'July',]);
                break;
            default:
                break;
        }
    }, [timeFilter])

    useEffect(() => {
        displayData();
    }, []);

    const onSelectTab = (tab: SecondaryTab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        }, undefined, { shallow: true });
        setVisibleTab(tab);
    }

    const displayData = async () => {
        let offlineRes = await AccountService.getStats(DataFilter.OFFLINE, timeFilter);
        let convertedData = offlineRes.map(item => ({
            y: item.count,
            x: timestampToLabel(item.timestamp, timeFilter)
        }));

        let onlineRes = await AccountService.getStats(DataFilter.ONLINE, timeFilter);
        let convertedonlineRes = onlineRes.map(item => ({
            y: item.count,
            x: timestampToLabel(item.timestamp, timeFilter)
        }));
        const data = [
            {
                label: 'Offline plays',
                data: convertedData,
                borderColor: '#FF0000',
                backgroundColor: '#FF0000',
            },
            {
                label: 'Online plays',
                data: convertedonlineRes,
                borderColor: '#FF00FF',
                backgroundColor: '#FF00FF',
            }
        ];
        setPlayDataSet(data);

        let revRes = await AccountService.getStats(DataFilter.REVENUE, timeFilter);
        let convertedRev = revRes.map(item => ({
            y: item.count,
            x: timestampToLabel(item.timestamp, TimeFilter.DAY)
        }));
        const revData = [
            {
                data: convertedRev,
                borderColor: '#FF00FF',
                backgroundColor: '#FF00FF',
            }
        ];
        const l = convertedRev.map(i => i.x);
        setRevPlayDataSet(revData);
        setRevPlayLabels(l)
    }

    if (user == null) {
        return <UnauthorizedView />
    }
    return (
        <LayoutWrapper tab={
            <div className="h-[100%] bg-gray-900 ">
                <div className="flex flex-col text-white text-center gap-4 p-4">
                    <AvatarContainer />
                    Deverse Worlds
                </div>
                <div className="flex flex-col mt-8">
                    <ListingTabComponent label="Home" tab={SecondaryTab.CD_HOME} isSelected={visibleTab} onSelect={onSelectTab} />
                </div>
            </div>
        }>
            <section id='section-content' className='flex flex-col' >
                <div className="flex-grow p-4 flex flex-col gap-4">
                    <h1 className="section-header-lg pl-4">Home</h1>
                    <div className="flex flex-row gap-8">
                        <div className="w-[350px] nft-card flex flex-col items-center p-4">
                            <h2>Overal Statistics</h2>
                            <div className="w-full grid grid-cols-2 gap-2">
                                <div >
                                    <h5>Total plays</h5>
                                    <h5>Total stars</h5>
                                    <h5>Active worlds</h5>
                                    <h5>Subscribers</h5>
                                </div>
                                <div className="text-end">
                                    <h5>6969</h5>
                                    <h5>32</h5>
                                    <h5>5</h5>
                                    <h5>56</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flex flex-row flex-wrap gap-4">
                        <div className="rounded-xl overflow-hidden w-[500px]">
                            <Bar className="p-4 bg-white" options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom' as const,
                                        display: true
                                    },
                                    title: {
                                        display: true,
                                        text: 'Play counts',
                                    },
                                },
                            }}
                                data={{
                                    labels: playLabels,
                                    datasets: playDataset
                                }} />
                        </div>
                        <div className="rounded-xl overflow-hidden w-[500px]">
                            <Chart type="line" className="p-4 bg-white" options={{

                                plugins: {
                                    legend: {
                                        // position: 'bottom' as const,
                                        display: false
                                    },
                                    title: {
                                        display: true,
                                        text: 'Revenue $DVS',
                                    },
                                },
                            }}
                                data={{
                                    labels: revLabels,
                                    datasets: revDataset
                                }} />
                        </div>
                    </section>
                </div>
            </section >
        </LayoutWrapper>
    )
}