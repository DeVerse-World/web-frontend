import { useEffect, useState } from "react";
import DerivSubworldList, { DerivTemplateViewModel } from "../../components/asset/DerivTemplateList";
import NFTList from "../../components/asset/NFTList";
import RootSubworldList, { RootTemplateViewModel } from "../../components/asset/RootSubworldsList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import BaseLayout from "../../components/common/BaseLayout";
import Footer from "../../components/common/Footer";
import TabHeader from "../../components/common/TabHeader";
import Sidebar from "../../components/Sidebar";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";

function Layout() {
    const [rootTemplates, setRootTemplates] = useState<NFTAsset[]>([]);
    const [derivTemplates, setDerivTemplates] = useState<NFTAsset[]>([]);

    useEffect(() => {
        AccountService.getUserInfo().then(res => {
            if (res.isSuccess && res.value) {
                const roots = res.value.created_root_subworld_templates.map<RootTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    deletable: true,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setRootTemplates(roots);

                const derivs = res.value.created_deriv_subworld_templates.map<DerivTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    rootId: e.parent_subworld_template_id.toString(),
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    deletable: true,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setDerivTemplates(derivs);
            }
        })
    }, [])

    const deleteItem = (asset: NFTAsset) => {
        let deletedIndex = rootTemplates.indexOf(asset);
        if (deletedIndex > -1) {
            let clonedData = [...rootTemplates];
            clonedData.splice(deletedIndex, 1);
            setRootTemplates(clonedData);
        }
    }

    return (
        <div className="flex flex-col relative justify-center text-white p-4" >
            <div >
                <h3>Root</h3>
                <RootSubworldList data={rootTemplates} />
            </div>
            <div>
                <h3>Deriv</h3>
                <DerivSubworldList data={derivTemplates} />
            </div>
        </div>
    )
}

Layout.getLayout = getAccountWrapperLayout;

export default Layout;