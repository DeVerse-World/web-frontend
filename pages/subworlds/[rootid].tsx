import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import NFTList from "../../components/asset/NFTList";
import PlayModal from "../../components/asset/PlayModal";
import { RootTemplateViewModel } from "../../components/asset/RootSubworldsList";
import { DerivTemplateViewModel } from "../../components/asset/RootTemplateList";
import Footer from "../../components/common/Footer";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

export default function Deriv() {
    const { setViewState } = useContext(AppContext);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const router = useRouter();
    const [rootTemplate, setRootTemplate] = useState<RootTemplateViewModel>();
    const [derivTemplates, setDerivTemplates] = useState<DerivTemplateViewModel[]>([]);
    const { rootid } = router.query

    useEffect(() => {
        if (!router.isReady || parseInt(rootid.toString()) <= 0) {
            return;
        }
        SubWorldTemplateService.fetchRootTemplate(rootid.toString()).then(res => {
            if (res.isSuccess()) {
                const data: RootTemplateViewModel = {
                    id: res.value.subworld_template.id.toString(),
                    name: res.value.subworld_template.display_name,
                    description: res.value.subworld_template.display_name,
                    image: res.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: res.value.subworld_template.thumbnail_centralized_uri,
                    file2dUri: res.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUri: res.value.subworld_template.level_ipfs_uri,
                    file3dUri: res.value.subworld_template.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }
                setRootTemplate(data)
            }
        })
        // setViewState(ViewState.LOADING);
        // SubWorldTemplateService.fetchDerivTemplates(derivid.toString()).then(res => {
        //     if (res.isSuccess()) {
        //         const data = res.value.subworld_templates.map<DerivTemplateViewModel>(e => ({
        //             id: e.id.toString(),
        //             name: e.display_name,
        //             description: e.display_name,
        //             image: e.thumbnail_centralized_uri,
        //             rootId: derivid.toString(),
        //             fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
        //             file2dUri: e.thumbnail_centralized_uri,
        //             fileAssetUri: e.level_ipfs_uri,
        //             file3dUri: e.level_ipfs_uri,
        //             onlineOpenable: true,
        //             offlineOpenable: true
        //         }))
        //         setDerivTemplates(data);
        //     }
        // }).finally(() => {
        //     setViewState(ViewState.SUCCESS)
        // })
    }, [router.isReady])

    return (
        <section id='section-content' className="flex flex-col">
            <div className='flex-grow p-4'>
                <button className="text-white flex flex-row items-center gap-2 py-2" onClick={() => {
                    router.back();
                }}><IoIosArrowBack />Back</button>
                {!rootTemplate ? null :
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center h-[350px] w-[350px]">
                                <img src={rootTemplate.file2dUri || "/images/color-image-placeholder.png"} />
                            </div>
                            <button className="w-[120px] h-[40px] rounded-3xl flex flex-row justify-center items-center text-white deverse-play-btn font-bold" onClick={() => setShowPlayModal(true)}>Play</button>
                        </div>

                        <div className="flex flex-col gap-2 text-white">
                            <h3>{rootTemplate.name}</h3>
                            <div className="flex flex-row gap-1 items-center text-lg">
                                15<TbWorld className="mr-4" />
                                35/500<BsFillPeopleFill />
                            </div>
                            <div>
                                <h5>Description</h5>
                                <p>A very long description will eb placed here</p>
                            </div>
                            <div>
                                Connected worlds: {derivTemplates?.length}
                            </div>
                            <NFTList data={derivTemplates} />
                        </div>
                    </div>

                }
            </div>
            {showPlayModal && <PlayModal onClose={() => setShowPlayModal(false)} />}
            <Footer />
        </section >
    )
}  