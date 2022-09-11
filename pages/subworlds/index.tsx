import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import { NFTAsset } from "../../data/model/nft_asset";

function Subworlds() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);

    useEffect(() => {
        // AccountService.getUserInfo().then(e => {
        //     if (e.isSuccess && e.value) {
        //         setData(e.value.avatars);
        //         setNfts(e.value.avatars.map(item => {
        //             let asset: NFTAsset = {
        //                 id: item.id.toString(),
        //                 file3dUri: item.preprocess_url,
        //                 deletable: true,
        //                 assetType: AssetType.AVATAR
        //             }
        //             return asset;
        //         }))
        //     }
        // })
    }, [])

    return (
        <div className="flex flex-col relativejustify-center items-center text-white p-4" >
            <div className="flex flex-row gap-2">
                <NFTList data={nfts} />
            </div>
        </div>
    )
}

export default Subworlds;