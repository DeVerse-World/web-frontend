import React, { useContext, useEffect, useState } from "react";
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import AccountService from "../../data/services/AccountService";
import AssetService from "../../data/services/AssetService";
import { AppContext } from "../../components/contexts/app_context";
import AvatarContainer from "./AvatarContainer";
import LoginModal from "../../components/login/LoginModal";
import { GiDoubleFaceMask } from "react-icons/gi";
import {RiImageFill} from "react-icons/ri";
import { MdOutlineInventory2} from "react-icons/md";
import Link from "next/link";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { formatWalletAddress } from "../../utils/wallet_util";
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
    const [avatarCount, setAvatarCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [subworldTemplateCount, setSubworldTemplateCount] = useState(0);
    const [inventoryCount, setInventoryCount] = useState(0);

    useEffect(() => {
        if (user == null) {
            return;
        }
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                setAvatarCount(e.value.avatars.length);
                setEventCount(e.value.created_events.length);
                setSubworldTemplateCount(e.value.created_deriv_subworld_templates.length + e.value.created_root_subworld_templates.length);
            }
        })
        if (user.wallet_address != null) {
            AssetService.fetchUserAssets(user.wallet_address).then(e => {
                setInventoryCount(e.value.length);
            })
        }
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
                <section id="wallet-section" className="w-[80%]">
                    <header>
                        <h3>Your Collection</h3>
                    </header>
                    <div className="flex flex-row gap-2 justify-between py-4">
                        <Link href="/account/avatar">
                            <div className="bg-gray-600 rounded-3xl w-[150px] h-[230px] cursor-pointer flex flex-col justify-center items-center" >
                                <GiDoubleFaceMask size={120}/>
                                <h3>Avatars</h3>
                                <span>x{avatarCount}</span>
                            </div>
                        </Link>
                        {/* <Link href="/account/inventory">
                            <div className="bg-gray-600 rounded-3xl w-[150px] h-[230px] cursor-pointer flex flex-col justify-center items-center" >
                                <MdOutlineInventory2 size={120}/>
                                <h3>Inventory</h3>
                                <span>x{inventoryCount}</span>
                            </div>
                        </Link> */}
                        <Link href="/account/events">
                            <div className="bg-gray-600 rounded-3xl w-[150px] h-[230px] cursor-pointer flex flex-col justify-center items-center" >
                                <RiImageFill size={120}/>
                                <h3>Events</h3>
                                <span>x{eventCount}</span>
                            </div>
                        </Link>
                        <Link href="/account/templates">
                            <div className="bg-gray-600 rounded-3xl w-[150px] h-[230px] cursor-pointer flex flex-col justify-center items-center text-center" >
                                <RiImageFill size={120}/>
                                <h3>Subworld Templates</h3>
                                <span>x{subworldTemplateCount}</span>
                            </div>
                        </Link>
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