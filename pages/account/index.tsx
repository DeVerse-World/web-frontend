import React, { useContext, useEffect, useState } from "react";
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import AccountService from "../../data/services/AccountService";
import AssetService from "../../data/services/AssetService";
import { AppContext } from "../../components/contexts/app_context";
import AvatarContainer from "../../components/AvatarContainer";
import { GiDoubleFaceMask } from "react-icons/gi";
import {RiImageFill} from "react-icons/ri";
import Link from "next/link";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { formatWalletAddress } from "../../utils/wallet_util";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import RootSubworldList, { TemplateViewModel } from "../../components/asset/RootSubworldsList";
import { getTimeString } from "../../utils/time_util";
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// X-axis: filter by day/week/month/year
// y-axis: filter by activities, minute spent, staking balance, and more

function Account() {
    const { user } = useContext(AppContext);
    const [showAddMetamask, setShowAddMetamask] = useState(false);
    const [showAddGoogle, setShowAddGoogle] = useState(false);

    const [avatars, setAvatars] = useState<AvatarViewModel[]>([]);
    const [events, setEvents] = useState<EventViewModel[]>([]);
    const [templates, setTemplates] = useState<TemplateViewModel[]>([]);

    useEffect(() => {
        if (user == null) {
            return;
        }
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                setAvatars(e.value.avatars.map<AvatarViewModel>(item=> ({
                    id: item.id?.toString(),
                    supply: 9999,
                    maxSupply: 9999,
                    name: "Avatar #",
                    modelUri: item.preprocess_url,
                    image: item.postprocess_url,
                }))) 
                setEvents(e.value.created_events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                })));
                const roots = e.value.created_root_subworld_templates.map<TemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                const derivs = e.value.created_deriv_subworld_templates.map<TemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setTemplates(roots.concat(derivs));
            }
        })
        // if (user.wallet_address != null) {
        //     AssetService.fetchUserAssets(user.wallet_address).then(e => {
        //         console.log(e.value);
        //     })
        // }
    }, [user]);


    const renderMainContent = () => {
        return (
            <div className="flex flex-col items-center text-white">
                <section id='cover-picture' className="h-[300px] overflow-hidden flex items-center">
                    <img title="cover-image" src="images/01.png" />
                </section>
                <section id="avatar-section" className="flex flex-row w-[80%]">
                    <div className="flex flex-row gap-4">
                        <AvatarContainer style={{
                            position: 'relative',
                            borderRadius: '50%',
                            borderWidth: '2px',
                            bottom: '50%'
                        }} />
                        <div className="py-2">
                            {user?.name || <h1>{user?.name}</h1>} 
                            <h5 className="text-deverse">{formatWalletAddress(user?.wallet_address)}</h5>
                            <h5 className="text-deverse">{user?.social_email}</h5>
                            {/* {user?.social_email == "" ? <button onClick={() => setShowAddGoogle(true)}>Link Google Mail</button> : ""}
                            {showAddGoogle && <LoginModal show={true} onHide={() => setShowAddGoogle(false)} isAddMetamaskOnly={false} isAddGoogleOnly={true} fullscreen />}
                            {user?.wallet_address == "" ? <button onClick={() => setShowAddMetamask(true)}>Link Metamask</button> : ""}
                            {showAddMetamask && <LoginModal show={true} onHide={() => setShowAddMetamask(false)} isAddMetamaskOnly={true} isAddGoogleOnly={false} fullscreen />} */}
                        </div>
                    </div>
                </section>
                <section id="wallet-section" className="w-full px-4">
                    <div className="p-4">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-blue-300 text-3xl font-bold pl-4">Avatars ({avatars?.length || 0})</h3>
                            <Link href="/account/avatar">
                                <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                            </Link>
                        </div>
                        <AvatarList alignStart data={avatars}/>
                    </div>

                    <div className="p-4">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-blue-300 text-3xl font-bold pl-4">Events ({events?.length || 0})</h3>
                            <Link href="/account/events">
                                <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                            </Link>
                        </div>
                        <EventList alignStart data={events}/>
                    </div>

                    <div className="p-4">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-blue-300 text-3xl font-bold pl-4">Templates ({templates?.length || 0})</h3>
                            <Link href="/account/templates">
                                <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                            </Link>
                        </div>
                        <RootSubworldList alignStart data={templates}/>
                    </div>
                </section>  
            </div>
        );
    }

    return (
        user ? renderMainContent() :
            <div className="text-center text-white m-auto"><h1>Please Login first</h1></div>
    );
}

Account.getLayout = getAccountWrapperLayout;

export default Account;

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


       // const today = new Date();

    // useEffect(() => {
    //     displayData();
    // }, [timeFilter, dataFilter]);

    // const displayData = async () => {

    //     let res = await AccountService.getStats(dataFilter, timeFilter);
    //     let convertedData = res.map(item => ({
    //         y: item.count,
    //         x: timestampToLabel(item.timestamp, timeFilter)
    //     }));

    //     const data = [
    //         {
    //             data: convertedData,
    //             borderColor: '#FF0000',
    //             backgroundColor: '#FF0000',
    //         }
    //     ];
    //     setDataSet(data);
    // }

    // const [selectedTab, setSelectedTab] = useState<AccountTab>(AccountTab.Profile)
    // const [dataSet, setDataSet] = useState([]);
    // const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.MONTH);
    // const [yLabels, setYLabel] = useState([]);
    // const [dataFilter, setDataFilter] = useState<DataFilter>(DataFilter.STAKING_BALANCE);