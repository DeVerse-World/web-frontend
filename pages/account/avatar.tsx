import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
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
import AvatarService from "../../data/services/AvatarService";

function Content() {
    const [data, setData] = useState<Avatar[]>([]);
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    useEffect(() => {
        AccountService.getUserInfo().then(async e => {
            if (e.isSuccess && e.value) {
                setData(e.value.avatars);
                let convertedData = e.value.avatars.map(item => {
                    let asset: NFTAsset = {
                        id: item.id.toString(),
                        file3dUri: item.preprocess_url,
                        deletable: true,
                        assetType: AssetType.AVATAR
                    }
                    return asset;
                })
                const fetchJobs: Promise<any>[] = [];
                convertedData.forEach(e => {
                    if (e.file3dUri.includes('.glb')) {
                        fetchJobs.push(AvatarService.get2DAvatarRPM(e.file3dUri))
                    }
                })
                Promise.allSettled(fetchJobs).then(images => {
                    convertedData.forEach((e, i) => {
                        e.file2dUri = images[i].value
                    })
                    setNfts(convertedData)
                })

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

Content.getLayout = getAccountWrapperLayout;

export default Content;