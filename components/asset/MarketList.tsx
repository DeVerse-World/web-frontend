import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { Label } from 'semantic-ui-react'
import AssetService from "../../data/services/asset_service";
import BaseService from "../../data/services/base_service";
import { AppContext, ViewState } from "../contexts/app_context";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import ApiStrategy = BaseService.ApiStrategy;
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";

type MarketListProps = {
    isSelected?: boolean;

}

function NftItem(nft: NFTAsset, index: number) {

    const get2dImage = (nft: NFTAsset) => {
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri
    }

    return (
        <div key={index} className="border shadow rounded-xl text-white overflow-hidden">
            <div className="w-[250px] h-[250px] flex justify-center">
                <Image className="m-auto" src={get2dImage(nft)} />
            </div>

            <div className="p-4">
                <p className="text-2xl font-semibold ">{nft.name}</p>
                <div>
                    <p className="text-gray-400">{nft.description}</p>
                </div>
                <Label color='black'>
                    <Label.Detail>{nft.assetType}</Label.Detail>
                    <Label.Detail><a href={nft.file3dUri} target="_blank">Download</a></Label.Detail>
                </Label>
            </div>
        </div>
    )
}

export const MarketList = forwardRef((props: MarketListProps, ref) => {
    const { setViewState } = useContext(AppContext);
    const [nfts, setNfts] = useState([]);

    useImperativeHandle(
        ref, () => ({
            loadData(query: string) {
                loadNFTs(query)
            }
        })
    )

    useEffect(() => {
        loadNFTs(null)
    }, [])

    async function loadNFTs(query: string) {
        setViewState(ViewState.LOADING)
        const assets = await AssetService.getAll(ApiStrategy.REST)
        setNfts(assets);
        setViewState(ViewState.SUCCESS)
    }

    return props.isSelected && (
        <div className="p-4 min-h-[60vh]" >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                    nfts.map((nft, i) => NftItem(nft, i))
                }
            </div>
        </div>
    )
})

// export default function MarketList(props: MarketListProps) {
//     const { setViewState } = useContext(AppContext);
//     const [nfts, setNfts] = useState([]);
//     const router = useRouter();
//     useEffect(() => {
//         loadNFTs()
//     }, [])

//     useEffect(() => {
//         if (!router.isReady) return;
//         console.log(router.query)
//     }, [router.isReady, router.query]);

//     async function loadNFTs() {
//         setViewState(ViewState.LOADING)
//         const assets = await AssetService.getAll(ApiStrategy.REST)
//         setNfts(assets);
//         setViewState(ViewState.SUCCESS)
//     }

//     return !props.isSelected ? null : (
//         <div className="p-4 min-h-[60vh]" >
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
//                 {
//                     nfts.map((nft, i) => NftItem(nft, i))
//                 }
//             </div>
//         </div>
//     )
// }

{/* <div className="p-4 bg-black">
<p className="text-2xl mb-4 font-bold text-white">No Price</p>
<button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
</div> */}