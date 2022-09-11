import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import Footer from "../../components/common/Footer";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

function SubworldsPage() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);

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
                    assetType: AssetType.ROOT_SUBWORLD_TEMPLATE
                }))
                setNfts(data);
            }
        })
    }, [])

    return (
        <section id='section-content' className='flex flex-col justify-between '>
            <div className="flex flex-row gap-2">
                <NFTList data={nfts} />
            </div>
            <Footer />
        </section>
    )
}

export default SubworldsPage;