import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import Footer from "../../components/common/Footer";
import { NFTAsset } from "../../data/model/nft_asset";
import EventsService from "../../data/services/EventsService";

function EventsPage() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);

    useEffect(() => {
        EventsService.fetchEvents().then(res => {
            console.log(res.data.events)
        })
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
        <section id='section-content' className='flex flex-col justify-between '>
            <div className="flex flex-row gap-2">
                <NFTList data={nfts} />
            </div>
            <Footer />
        </section>
    )
}

export default EventsPage;