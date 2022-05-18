import {useContext, useEffect, useState} from "react"
import {Label} from 'semantic-ui-react'

import AssetService from "../../data/services/asset_service";
import BaseService from "../../data/services/base_service";
import {AppContext, ViewState} from "../contexts/app_context";
import {NFTAsset} from "../../data/model/nft_asset";
import {AssetType} from "../../data/enum/asset_type";
import ApiStrategy = BaseService.ApiStrategy;

type MarketListProps = {
    isSelected?: boolean;
}

export default function MarketList(props: MarketListProps) {
    const { setViewState } = useContext(AppContext);
    const [nfts, setNfts] = useState([]);
    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        setViewState(ViewState.LOADING)
        const assets = await AssetService.getAll(ApiStrategy.REST)
        setNfts(assets);
        setViewState(ViewState.SUCCESS)
    }

    function get2dImage(nft: NFTAsset) {
        if (nft.assetType == AssetType.IMAGE_2D) {
            return nft.fileAssetUri
        }
        return nft.file2dUri
    }

    return !props.isSelected ? null : (
        <div className="px-4 min-h-[60vh]" >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                    nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <img src={get2dImage(nft)} />
                            <div className="p-4">
                                <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                                <div style={{ height: '70px', overflow: 'hidden' }}>
                                    <p className="text-gray-400">{nft.description}</p>
                                </div>
                                <Label as='a' color='black'>
                                    <Label.Detail> {nft.assetType} </Label.Detail>
                                </Label>
                                {
                                    nft.file3dUri // TODO: Link to showcase if file3dUri exists
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

{/* <div className="p-4 bg-black">
<p className="text-2xl mb-4 font-bold text-white">No Price</p>
<button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
</div> */}