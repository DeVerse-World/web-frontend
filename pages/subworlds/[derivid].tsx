import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import { DerivTemplateViewModel } from "../../components/asset/RootTemplateList";
import Footer from "../../components/common/Footer";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

export default function Deriv() {
    const { setViewState } = useContext(AppContext);
    const router = useRouter();
    const [derivTemplates, setDerivTemplates] = useState<DerivTemplateViewModel[]>([]);
    const { derivid } = router.query

    useEffect(() => {
        if (!router.isReady || parseInt(derivid.toString()) <= 0) {
            return;
        }
        setViewState(ViewState.LOADING);
        SubWorldTemplateService.fetchDerivTemplates(derivid.toString()).then(res => {
            if (res.isSuccess()) {
                const data = res.value.subworld_templates.map<DerivTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    rootId: derivid.toString(),
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setDerivTemplates(data);
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        })
    }, [router.isReady])

    return (
        <section id='section-content' className='flex flex-col justify-between '>
            <button className="text-white" onClick={() => {
                router.back();
            }}>Back button</button>
            <div className="flex flex-row gap-2">
                <NFTList data={derivTemplates} />
            </div>
            <Footer />
        </section >
    )
}  