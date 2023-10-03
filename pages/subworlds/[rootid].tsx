import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PlayModal from "../../components/asset/PlayModal";
import {
  RootTemplateViewModel,
  CreatorViewModel,
} from "../../components/asset/RootWorldList";
import DerivWorldList, {
  DerivTemplateViewModel,
} from "../../components/asset/DerivWorldList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import RootTemplate from "../../components/subworlds/RootTemplate";
import StatsService from "../../data/services/StatsService";
import { IncrementTypes } from "../../data/services/StatsService";
import BreadCrumb from "../../components/BreadCrumb";

export async function getServerSideProps(context) {
  const rootid = context.params.rootid;
  // Fetch data from external API

  // Pass data to the page via props
  return {
    props: {
      rootId: rootid,
    },
  };
}

export default function Deriv({ rootId }) {
  const { setViewState } = useContext(AppContext);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const router = useRouter();
  const [rootTemplate, setRootTemplate] = useState<RootTemplateViewModel>();
  const [rootCreator, setRootCreator] = useState<CreatorViewModel>();
  const [derivTemplates, setDerivTemplates] = useState<
    DerivTemplateViewModel[]
  >([]);

  useEffect(() => {
    StatsService.incrementStats(rootId, IncrementTypes.VIEWS).then(
      (_res) => {}
    );
  }, []);
  useEffect(() => {
    setViewState(ViewState.LOADING);
    SubWorldTemplateService.fetchRootTemplate(rootId)
      .then(async (rootRes) => {
        if (rootRes.isSuccess()) {
          const enrichedData = rootRes.value.enriched_subworld_template;
          const rootData: RootTemplateViewModel = {
            id: enrichedData.overview.id.toString(),
            name: enrichedData.overview.display_name,
            image: enrichedData.overview.thumbnail_centralized_uri,
            image360: enrichedData.overview.image_paronama_uri,
            fileAssetUriFromCentralized:
              enrichedData.overview.thumbnail_centralized_uri,
            file2dUri: enrichedData.overview.thumbnail_centralized_uri,
            fileAssetUri: enrichedData.overview.level_ipfs_uri,
            file3dUri: enrichedData.overview.level_ipfs_uri,
            rating: enrichedData.overview.rating,
            onlineOpenable: true,
            offlineOpenable: true,
            numViews: enrichedData.derived_world_stats.num_views_count,
            numPlays: enrichedData.derived_world_stats.num_plays_count,
            numClicks: enrichedData.derived_world_stats.num_clicks_count,
          };
          const rootCreator: CreatorViewModel = {
            id: enrichedData.creator_info.id.toString(),
            name: enrichedData.creator_info.name,
          };
          if (enrichedData.overview.derivative_uri) {
            const descriptionRes =
              await SubWorldTemplateService.fetchTemplateDescription(
                enrichedData.overview.derivative_uri
              );
            rootData.description =
              descriptionRes.descriptions &&
              descriptionRes.descriptions.join(", ");
          }
          setRootTemplate(rootData);
          setRootCreator(rootCreator);
        }
      })
      .finally(() => {
        setViewState(ViewState.SUCCESS);
      });
    SubWorldTemplateService.fetchDerivTemplates(rootId)
      .then((derivRes) => {
        if (derivRes.isSuccess()) {
          setDerivTemplates(
            derivRes.value.enriched_subworld_templates
              .map<DerivTemplateViewModel>((e) => ({
                id: e.overview.id.toString(),
                name: e.overview.display_name,
                description: e.overview.display_name,
                image: e.overview.thumbnail_centralized_uri,
                image360: e.overview.image_paronama_uri,
                rootId: rootId.toString(),
                fileAssetUriFromCentralized:
                  e.overview.thumbnail_centralized_uri,
                file2dUri: e.overview.thumbnail_centralized_uri,
                fileAssetUri: e.overview.level_ipfs_uri,
                file3dUri: e.overview.level_ipfs_uri,
                rating: e.overview.rating,
                onlineOpenable: true,
                offlineOpenable: true,
                // numViews: e.overview.num_views,
                // numClicks: e.overview.num_clicks,
                // numPlays: e.overview.num_plays,
                numViews: e.derived_world_stats.num_views_count,
                numPlays: e.derived_world_stats.num_plays_count,
                numClicks: e.derived_world_stats.num_clicks_count,
                creator: {
                  id: e.creator_info.id,
                  name:
                    e.creator_info.name === "" || e.creator_info.name === null
                      ? "Anonymous"
                      : e.creator_info.name,
                },
              }))
              .sort((a, b) => b.numPlays - a.numPlays)
          );
        }
      })
      .finally(() => {
        setViewState(ViewState.SUCCESS);
      });
  }, [rootId]);

  const onLoadMore = () => {};

  return (
    <>
      <section className="flex flex-col bg-darkest text-light">
        <BreadCrumb
          pages={[
            {
              name: "Worlds",
              href: "/marketplace? type=world",
            },
            {
              name: rootTemplate && rootTemplate.name,
              href: "#",
            },
          ]}
        />
        <div className="mx-auto px-6 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
          {rootTemplate && rootCreator && (
            <RootTemplate template={rootTemplate} creator={rootCreator} />
          )}
          {derivTemplates && (
            <>
              <h2 className="text-white my-4 text-xl font-bold tracking-tight sm:text-2xl">
                {derivTemplates.length} connected worlds
              </h2>
              <DerivWorldList data={derivTemplates} />
            </>
          )}
        </div>
      </section>
      {showPlayModal && (
        <PlayModal
          templateId={rootId.toString()}
          onClose={() => setShowPlayModal(false)}
        />
      )}
    </>
  );
}
