import { useEffect, useState } from "react"

export default function MarketList() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
    //     const assets = await AssetService.getAll(ApiStrategy.REST)
    //     setNfts(assets);
    //     setLoadingState('loaded');
    }
    return (
        <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                    nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <img src={nft.fileUri} />
                            <div className="p-4">
                                <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                                <div style={{ height: '70px', overflow: 'hidden' }}>
                                    <p className="text-gray-400">{nft.description}</p>
                                </div>
                                {/* <Label as='a' color='blue'>
                                        <Label.Detail> {nft.assetType} </Label.Detail>
                                    </Label> */}
                            </div>
                            <div className="p-4 bg-black">
                                <p className="text-2xl mb-4 font-bold text-white">No Price</p>
                                {/*<button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>*/}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}