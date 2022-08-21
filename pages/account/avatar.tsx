import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import BaseLayout from "../../components/common/BaseLayout";
import { getCommonLayout } from "../../components/common/CommonLayout";
import Footer from "../../components/common/Footer";
import HomeNavbar from "../../components/common/HomeNavbar";
import TabHeader from "../../components/common/TabHeader";
import Sidebar from "../../components/Sidebar";
import { AssetType } from "../../data/enum/asset_type";
import { Avatar } from "../../data/model/avatar";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";

function Content() {
    const [data, setData] = useState<Avatar[]>([]);
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    useEffect(() => {
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                setData(e.value.avatars);
                setNfts(e.value.avatars.map(item => {
                    let asset: NFTAsset = {
                        id: item.id.toString(),
                        file3dUri: item.preprocess_url,
                        deletable: true,
                        assetType: AssetType.AVATAR
                    }
                    return asset;
                }))
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

Content.getLayout = page => (
    <BaseLayout>
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                <span className="flex flex-row justify-between bg-black">
                    <span className="tab-bar flex-grow" >
                        <TabHeader href="/account">Info</TabHeader>
                        <TabHeader href="/account/avatar">Avatar</TabHeader>
                        <TabHeader href="/account/inventory">Inventory</TabHeader>
                    </span>
                </span>
                <div className="grow">
                    {page}
                </div>
                <Footer />
            </section>
        </div>
    </BaseLayout>
)

export default Content;