import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill, BsPlayFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import PlayModal from "../../components/asset/PlayModal";
import { RootTemplateViewModel } from "../../components/asset/RootWorldList";
import DerivWorldList, { DerivTemplateViewModel } from "../../components/asset/DerivWorldList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import LayoutWrapper from "../../components/LayoutWrapper";


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
        SubWorldTemplateService.fetchRootTemplate(rootId).then(async rootRes => {
            if (rootRes.isSuccess()) {
                console.log(rootRes.value)
                const rootData: RootTemplateViewModel = {
                    id: rootRes.value.subworld_template.id.toString(),
                    name: rootRes.value.subworld_template.display_name,
                    image: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    file2dUri: rootRes.value.subworld_template.thumbnail_centralized_uri,
                    fileAssetUri: rootRes.value.subworld_template.level_ipfs_uri,
                    file3dUri: rootRes.value.subworld_template.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }
                if (rootRes.value.subworld_template.derivative_uri) {
                    const descriptionRes = await SubWorldTemplateService.fetchTemplateDescription(rootRes.value.subworld_template.derivative_uri);
                    rootData.description = descriptionRes.descriptions.join(", ");
                }
                setRootTemplate(rootData)
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        });

        SubWorldTemplateService.fetchDerivTemplates(rootId).then(derivRes => {
            if (derivRes.isSuccess()) {
                setDerivTemplates(derivRes.value.enriched_subworld_templates.map<DerivTemplateViewModel>(e => ({
                    id: e.Template.id.toString(),
                    name: e.Template.display_name,
                    description: e.Template.display_name,
                    image: e.Template.thumbnail_centralized_uri,
                    rootId: rootId.toString(),
                    fileAssetUriFromCentralized: e.Template.thumbnail_centralized_uri,
                    file2dUri: e.Template.thumbnail_centralized_uri,
                    fileAssetUri: e.Template.level_ipfs_uri,
                    file3dUri: e.Template.level_ipfs_uri,
                    rating: e.Template.rating,
                    onlineOpenable: true,
                    offlineOpenable: true,
                    creator: {
                        id: e.CreatorInfo.Id,
                        name: (e.CreatorInfo.Name === "" || e.CreatorInfo.Name === null) ? "Anonymous" : e.CreatorInfo.Name,
                    },
                })).sort((a, b) => b.rating - a.rating))
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        });
    }, [rootId])

    const onLoadMore = () => {

    }

    return (
        <LayoutWrapper>
            {/* <section id='section-content' className="flex flex-col bg-darkest"> */}
            <section className="flex flex-col bg-darkest text-light">
                <div className='flex-grow p-4 flex flex-col'>
                    <button className="text-white flex flex-row items-center gap-2 py-2 text-xl" onClick={() => {
                        router.back();
                    }}><IoIosArrowBack />Back</button>
                    {rootTemplate && (
                        // <div className="flex flex-row gap-2 ">
                        //     <div className="flex flex-col items-center">
                        //         <div className="flex justify-center h-[350px] w-[350px] ">
                        //             <img className="rounded-lg" alt="Root Template Image" src={rootTemplate.file2dUri || "/images/color-image-placeholder.webp"} />
                        //         </div>
                        //         <button className="w-[120px] h-[40px] rounded-3xl my-4 flex flex-row justify-center items-center text-white deverse-play-btn font-bold" onClick={() => setShowPlayModal(true)}>
                        //             <BsPlayFill /></button>
                        //     </div>

                        //     <div className="text-slate-400 ">
                        //         <div className="flex flex-col gap-2 px-4">
                        //             <h3 className="text-blue-200 text-3xl font-bold">{rootTemplate.name}</h3>
                        //             {/* <div className="flex flex-row gap-1 items-center text-lg">
                        //         <TbWorld />15
                        //         <BsFillPeopleFill className="ml-4" />35/500
                        //     </div> */}
                        //             <div>
                        //                 <h5 className="text-blue-200">Description</h5>
                        //                 <p>{rootTemplate.description}</p>
                        //             </div>

                        //         </div>

                        //     </div>
                        // </div>
                        <div className="mt-16 overflow-hidden mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="lg:flex">
                                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                                    <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                                        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                                            {rootTemplate.name}
                                        </h2>
                                        <p className="mt-6 text-xl leading-8 text-lighter">
                                            {rootTemplate.description}
                                        </p>
                                        {/* <p className="mt-6 text-base leading-7 text-lighter">
                                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                                            amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.
                                        </p> */}
                                    </div>
                                    <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                        <img
                                            src={rootTemplate.file2dUri || "/images/color-image-placeholder.webp"}
                                            alt=""
                                            className="aspect-square w-[26rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-white mt-32 sm:mt-40 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {derivTemplates.length} connected worlds
                            </h2>
                            <DerivWorldList data={derivTemplates} />
                        </div>
                    )}
                </div>
            </section >
            {showPlayModal && <PlayModal templateId={rootId.toString()} onClose={() => setShowPlayModal(false)} />}
        </LayoutWrapper>
    )
}  