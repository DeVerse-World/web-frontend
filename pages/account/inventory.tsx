import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/contexts/app_context";
import { NFTAsset } from "../../data/model/nft_asset";
import AssetService from "../../data/services/AssetService";

export default function Inventory() {
    const { user } = useContext(AppContext);
    const [data, setData] = useState<NFTAsset[]>([]);

    useEffect(() => {
        if (!user) {
            return
        }
        if (user.wallet_address) {
            AssetService.fetchUserAssets(user.wallet_address).then(e => {
                setData(e.value);
            })
        }
    }, [user])

    return (
        <div>
            {/*<NFTList data={data} />*/}
        </div>
    )
}