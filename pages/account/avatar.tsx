import { useContext, useEffect, useState } from "react";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import { NFTAsset } from "../../data/model/nft_asset";
import AccountService from "../../data/services/AccountService";
import AvatarService from "../../data/services/AvatarService";

function Content() {
    const { setViewState } = useContext(AppContext);
    const [nfts, setNfts] = useState<AvatarViewModel[]>([]);
    useEffect(() => {
        setViewState(ViewState.LOADING);
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                let convertedData = e.value.avatars.map(item => {
                    let asset: AvatarViewModel = {
                        id: item.id.toString(),
                        supply: 5,
                        maxSupply: 15,
                        name: `Avatar #${item.id}`, 
                        modelUri: item.preprocess_url,
                        image: item.postprocess_url,
                        deletable: true,
                    }
                    return asset;
                })
                setNfts(convertedData)
                setViewState(ViewState.SUCCESS)
                // const fetchJobs: Promise<any>[] = [];
                // convertedData.forEach(e => {
                //     if (e.modelUri.includes('.glb')) {
                //         fetchJobs.push(AvatarService.get2DAvatarRPM(e.modelUri))
                //     }
                // })
                // Promise.allSettled(fetchJobs).then(images => {
                //     convertedData.forEach((e, i) => {
                //         e.image = images[i].value
                //     })
                //     setNfts(convertedData)
                // }).finally(() => {
                //     setViewState(ViewState.SUCCESS)
                // })
            }
        }).catch((e) => {
            console.log(e)
            setViewState(ViewState.ERROR)
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
        <div className="flex flex-col relativejustify-center items-center text-white p-4" >
            <div className="flex flex-row gap-2">
                <AvatarList data={nfts} onDeleted={deleteItem} />
            </div>
        </div>
    )
}

Content.getLayout = getAccountWrapperLayout;

export default Content;