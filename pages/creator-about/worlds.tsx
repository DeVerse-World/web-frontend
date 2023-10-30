import { useEffect, useState } from "react";
import DerivWorldList, {
  DerivTemplateViewModel,
} from "../../components/asset/DerivWorldList";
import RootWorldList, {
  RootTemplateViewModel,
} from "../../components/asset/RootWorldList";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";

const Worlds = () => {
  const [rootTemplates, setRootTemplates] = useState<NFTAsset[]>([]);
  const [derivTemplates, setDerivTemplates] = useState<NFTAsset[]>([]);

  useEffect(() => {
    AccountService.getUserInfo().then((res) => {
      if (res.isSuccess && res.value) {
        const roots =
          res.value.created_root_subworld_templates.map<RootTemplateViewModel>(
            (e) => ({
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
              offlineOpenable: true,
            })
          );
        setRootTemplates(roots);

        const derivs =
          res.value.created_deriv_subworld_templates.map<DerivTemplateViewModel>(
            (e) => ({
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
              offlineOpenable: true,
            })
          );
        setDerivTemplates(derivs);
      }
    });
  }, []);

  return (
    <section className="w-full px-4">
      <div>
        <h4>
          <b>Root</b>
        </h4>
        <RootWorldList data={rootTemplates} />
      </div>
      <div>
        <h4>
          <b>Deriv</b>
        </h4>
        <DerivWorldList data={derivTemplates} />
      </div>
    </section>
  );
};

export default Worlds;
