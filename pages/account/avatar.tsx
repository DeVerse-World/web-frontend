import { useContext, useEffect, useState } from "react";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import { NFTAsset } from "../../data/model/nft_asset";
import AvatarService from "../../data/services/AvatarService";
import LayoutWrapper from "../../components/LayoutWrapper";

export default function Content() {
    const { setViewState, user } = useContext(AppContext);
    const [nfts, setNfts] = useState<AvatarViewModel[]>([]);
    useEffect(() => {
        setViewState(ViewState.LOADING);
        AvatarService.getAvatars(user?.id).then(res => {
            if (res.isSuccess && res.value) {
                let convertedData = res.value.avatars.map(item => {
                    let asset: AvatarViewModel = {
                        id: item.id.toString(),
                        supply: 5,
                        maxSupply: 15,
                        name: item.name || `Avatar #${item.id}`,
                        modelUri: item.preprocess_url,
                        image: item.postprocess_url,
                        deletable: true,
                    }
                    return asset;
                })
                setNfts(convertedData)
            }
        }).catch((e) => {
            console.log(e)
            setViewState(ViewState.ERROR)
        }).finally(() => {
            setViewState(ViewState.SUCCESS)
        })
    }, [])

    const deleteItem = (asset: NFTAsset) => {
        let deletedIndex = nfts.indexOf(asset);
        if (deletedIndex > -1) {
            let clonedData = [...nfts];
            clonedData.splice(deletedIndex, 1);
            setNfts(clonedData);
        }
    }

    return (
        <LayoutWrapper>
            <div id="section-content">
                <AvatarList data={nfts} onDeleted={deleteItem} />
            </div>
        </LayoutWrapper>
    )
}