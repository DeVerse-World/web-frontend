import { useContext, useEffect, useState } from "react";
import NFTDetailCard from "../../components/asset/NFTDetailCard";
import NFTList from "../../components/asset/NFTList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import BaseLayout from "../../components/common/BaseLayout";
import { getCommonLayout } from "../../components/common/CommonLayout";
import Footer from "../../components/common/Footer";
import HomeNavbar from "../../components/common/HomeNavbar";
import TabHeader from "../../components/common/TabHeader";
import { AppContext } from "../../components/contexts/app_context";
import Sidebar from "../../components/Sidebar";
import { NFTAsset } from "../../data/model/nft_asset";
import AssetService from "../../data/services/AssetService";

function Inventory() {
    const { user } = useContext(AppContext);
    const [data, setData] = useState<NFTAsset[]>([]);

    useEffect(() => {
        if (user?.wallet_address) {
            AssetService.fetchUserAssets(user.wallet_address).then(e => {
                setData(e.value);
            })
        }
    }, [user])

    if (!user) {
        return (
            <div className="flex justify-center items-center text-white p-4" >
                <h1>Please login first</h1>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center text-white p-4" >
            <NFTList data={data} />
        </div>
    )
}

Inventory.getLayout = getAccountWrapperLayout;

export default Inventory;