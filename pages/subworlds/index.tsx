import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import Footer from "../../components/common/Footer";
import RootSubworldList from "../../components/RootSubworldsList";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import { IoMdArrowBack } from 'react-icons/io';

function SubworldsPage() {
    const [rootTemplates, setRootTemplates] = useState<NFTAsset[]>([]);
    const [selectedRootTemplate, setSelectedRootTemplate] = useState<NFTAsset>(null);
    const [derivTemplates, setDerivTemplates] = useState<NFTAsset[]>([]);

    useEffect(() => {
        SubWorldTemplateService.fetchRootTemplates().then(res => {
            if (res.isSuccess()) {
                const data = res.value.subworld_templates.map<NFTAsset>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    assetType: AssetType.ROOT_SUBWORLD_TEMPLATE,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setRootTemplates(data);
            }
        })
    }, [])

    useEffect(() => {
        if (selectedRootTemplate == null) {
            setDerivTemplates([])
            return;
        }
        SubWorldTemplateService.fetchDerivTemplates(selectedRootTemplate.id).then(res => {
            if (res.isSuccess()) {
                const data = res.value.subworld_templates.map<NFTAsset>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    rootId: selectedRootTemplate.id,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    assetType: AssetType.DERIV_SUBWORLD_TEMPLATE,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setDerivTemplates(data);
            }
        })
    }, [selectedRootTemplate])

    return (
        <section id='section-content' className='flex flex-col justify-between '>
            {selectedRootTemplate &&
                < div className="relative w-full">
                    <IoMdArrowBack size={60} color='rgb(97 198 208)' cursor="pointer" onClick={() => setSelectedRootTemplate(null)} />
                    <h5 className="text-center text-white">{selectedRootTemplate.name}</h5>
                </div>
            }
            <div className="flex flex-row gap-2">
                {selectedRootTemplate ?
                    <NFTList data={derivTemplates} /> :
                    <RootSubworldList data={rootTemplates} onSelect={setSelectedRootTemplate} />}
            </div>
            <Footer />
        </section >
    )
}

export default SubworldsPage;