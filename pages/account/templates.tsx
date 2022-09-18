import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import BaseLayout from "../../components/common/BaseLayout";
import Footer from "../../components/common/Footer";
import TabHeader from "../../components/common/TabHeader";
import Sidebar from "../../components/Sidebar";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";

function Layout() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);
    useEffect(() => {
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                let data: NFTAsset[] = [];
                e.value.created_root_subworld_templates.forEach(template => {
                    let asset: NFTAsset = {
                        id: template.id.toString(),
                        name: template.display_name,
                        description: template.display_name,
                        image: template.thumbnail_centralized_uri,
                        fileAssetUriFromCentralized: template.thumbnail_centralized_uri,
                        file2dUri: template.thumbnail_centralized_uri,
                        fileAssetUri: template.level_ipfs_uri,
                        file3dUri: template.level_ipfs_uri,
                        deletable: true,
                        assetType: AssetType.ROOT_SUBWORLD_TEMPLATE
                    }
                    data.push(asset);
                })
                e.value.created_deriv_subworld_templates.forEach(template => {
                    let asset: NFTAsset = {
                        id: template.id.toString(),
                        name: template.display_name,
                        description: template.display_name,
                        image: template.thumbnail_centralized_uri,
                        fileAssetUriFromCentralized: template.thumbnail_centralized_uri,
                        file2dUri: template.thumbnail_centralized_uri,
                        fileAssetUri: template.level_ipfs_uri,
                        file3dUri: template.level_ipfs_uri,
                        rootId: template.parent_subworld_template_id.toString(),
                        deletable: true,
                        assetType: AssetType.DERIV_SUBWORLD_TEMPLATE
                    }
                    data.push(asset);
                })
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