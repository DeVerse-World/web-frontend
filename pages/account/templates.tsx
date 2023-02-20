import { useEffect, useState } from "react";
import DerivWorldList, { DerivTemplateViewModel } from "../../components/asset/DerivWorldList";
import RootWorldList, { RootTemplateViewModel } from "../../components/asset/RootWorldList";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";
import LayoutWrapper from "../../components/LayoutWrapper";

export default function Layout() {
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
        <LayoutWrapper>
            <div id="section-content" className="flex flex-col relative justify-center p-4" >
                <div >
                    <h3>Root</h3>
                    <RootWorldList data={rootTemplates} />
                </div>
                <div>
                    <h3>Deriv</h3>
                    <DerivWorldList data={derivTemplates} />
                </div>
            </div>
        </LayoutWrapper>
    )
}