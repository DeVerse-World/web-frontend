import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill, BsPlayFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import NFTList from "../../components/asset/NFTList";
import PlayModal from "../../components/asset/PlayModal";
import { RootTemplateViewModel } from "../../components/asset/RootSubworldsList";
import DerivSubworldList, { DerivTemplateViewModel } from "../../components/asset/DerivTemplateList";
import Footer from "../../components/common/Footer";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

export async function getServerSideProps(context) {
    const rootid = context.params.rootid;
    // Fetch data from external API

    // Pass data to the page via props
    return {
        props: {
            rootId: rootid
        }
    }
}

export default function Deriv({ rootId }) {
    const { setViewState } = useContext(AppContext);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const router = useRouter();
    const [rootTemplate, setRootTemplate] = useState<RootTemplateViewModel>();
    const [derivTemplates, setDerivTemplates] = useState<DerivTemplateViewModel[]>([]);
    useEffect(() => {
        setViewState(ViewState.LOADING);
        SubWorldTemplateService.fetchRootTemplate(rootId).then(rootRes => {
            if (rootRes.isSuccess()) {
                setRootTemplate({
                    id: rootRes.value.subworld_template.id.toString(),
                    name: rootRes.value.subworld_template.display_name,
                    description: rootRes.value.subworld_template.display_name,
                    image: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    file2dUri: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUri: rootRes.value.subworld_template.level_ipfs_uri,
                    file3dUri: rootRes.value.subworld_template.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                })
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        });

        SubWorldTemplateService.fetchDerivTemplates(rootId).then(derivRes => {
            if (derivRes.isSuccess()) {
                setDerivTemplates(derivRes.value.subworld_templates.map<DerivTemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    rootId: rootId.toString(),
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                })))
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        });
    }, [rootId])

    return (
        <section id='section-content' className="flex flex-col">
            <div className='flex-grow p-4'>
                <button className="text-white flex flex-row items-center gap-2 py-2" onClick={() => {
                    router.back();
                }}><IoIosArrowBack />Back</button>
                {!rootTemplate ? null :
                    <div className="flex flex-row gap-2 ">
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center h-[350px] w-[350px]">
                                <img alt="Root Template Image" src={rootTemplate.file2dUri || "/images/color-image-placeholder.png"} />
                            </div>
                            <button className="w-[120px] h-[40px] rounded-3xl my-4 flex flex-row justify-center items-center text-white deverse-play-btn font-bold" onClick={() => setShowPlayModal(true)}>
                                <BsPlayFill /></button>
                        </div>

                        <div className="text-slate-400 ">
                            <div className="flex flex-col gap-2 px-4">
                                <h3 className="text-blue-200 text-3xl font-bold">{rootTemplate.name}</h3>
                                <div className="flex flex-row gap-1 items-center text-lg">
                                    <TbWorld />15
                                    <BsFillPeopleFill className="ml-4" />35/500
                                </div>
                                <div>
                                    <h5 className="text-blue-200">Description</h5>
                                    <p>Không còn nhiều cảnh xếp hàng dài trước các cửa hàng thời trang xa xỉ, ăn ở nhà hàng sang trọng dịp cuối tuần và du lịch các đảo nhiệt đớ</p>
                                </div>
                                <div className="text-blue-200">
                                    Connected worlds: {derivTemplates.length}
                                </div>
                            </div>
                            <DerivSubworldList data={derivTemplates} />
                        </div>
                    </div>
                }
            </div>
            {showPlayModal && <PlayModal templateId={rootId.toString()} onClose={() => setShowPlayModal(false)} />}
            <Footer />
        </section >
    )
}  