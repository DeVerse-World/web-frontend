import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import RootSubworldList, { RootTemplateViewModel } from "../../components/asset/RootSubworldsList";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import { AppContext, ViewState } from "../../components/contexts/app_context";

function SubworldsPage() {
    const { setViewState } = useContext(AppContext);
    const [rootTemplates, setRootTemplates] = useState<RootTemplateViewModel[]>([]);

    useEffect(() => {
        setViewState(ViewState.LOADING)
        SubWorldTemplateService.fetchRootTemplates().then(res => {
            if (res.isSuccess()) {
                const data = res.value.subworld_templates.map<RootTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setRootTemplates(data);
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        })
    }, [])

    return (
        <section id='section-content' className='flex flex-col justify-between '>
            <RootSubworldList data={rootTemplates} />
            <Footer />
        </section >
    )
}

export default SubworldsPage;