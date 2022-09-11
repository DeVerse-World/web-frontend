import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";

function Layout() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    useEffect(() => {
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                const data = e.value.created_events.map<NFTAsset>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: e.stage,
                    assetType: AssetType.EVENTS
                }))
                setNfts(data);
            }
        })
    }, [])

    const deleteItem = (asset: NFTAsset) => {
        let deletedIndex = nfts.indexOf(asset);
        if (deletedIndex > -1) {
            let clonedData = [...nfts];
            clonedData.splice(deletedIndex, 1);
            setNfts(clonedData);
        }
    }

    return (
        <div className="flex flex-col relativejustify-center items-center text-white p-4" >
            <div className="flex flex-row gap-2">
                <NFTList data={nfts} onDeleted={deleteItem} />
            </div>
        </div>
    )
}

Layout.getLayout = getAccountWrapperLayout;

export default Layout;