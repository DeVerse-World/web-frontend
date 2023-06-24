import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill, BsPlayFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import PlayModal from "../../components/asset/PlayModal";
import { RootTemplateViewModel, CreatorViewModel } from "../../components/asset/RootWorldList";
import DerivWorldList, { DerivTemplateViewModel } from "../../components/asset/DerivWorldList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import RootTemplate from "../../components/subworlds/RootTemplate";
import OverlayImage360Button from "../../components/image360/OverlayImage360Button";

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
    const [rootCreator, setRootCreator] = useState<CreatorViewModel>();
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
                    rating: rootRes.value.subworld_template.rating,
                    onlineOpenable: true,
                    offlineOpenable: true,
                    numViews: rootRes.value.subworld_template.num_views,
                    numPlays: rootRes.value.subworld_template.num_plays,
                    numClicks: rootRes.value.subworld_template.num_clicks,
                }
                const rootCreator: CreatorViewModel = {
                    id: rootRes.value.creator_info.id.toString(),
                    name: rootRes.value.creator_info.name,
                }
                if (rootRes.value.subworld_template.derivative_uri) {
                    const descriptionRes = await SubWorldTemplateService.fetchTemplateDescription(rootRes.value.subworld_template.derivative_uri);
                    rootData.description = descriptionRes.descriptions && descriptionRes.descriptions.join(", ");
                }
                setRootTemplate(rootData);
                setRootCreator(rootCreator);
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
                    numViews: e.Template.num_views,
                    numPlays: e.Template.num_plays,
                    numClicks: e.Template.num_clicks,
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
        <>
            <section className="flex flex-col bg-darkest text-light">
                <div className="mx-auto px-6 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
                    {rootTemplate && rootCreator && (
                      <RootTemplate template={rootTemplate} creator={rootCreator} />
                    )}
                    {derivTemplates && (
                        <>
                            <h2 className="text-white mt-24 sm:mt-32 text-xl font-bold tracking-tight sm:text-2xl">
                                {derivTemplates.length} connected worlds
                            </h2>
                            <DerivWorldList data={derivTemplates} />
                        </>
                    )}
                </div>
            </section>       
            {showPlayModal && <PlayModal templateId={rootId.toString()} onClose={() => setShowPlayModal(false)} />}
        </>
    );
}
