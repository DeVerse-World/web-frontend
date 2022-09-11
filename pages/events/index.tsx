import { useEffect, useState } from "react";
import NFTList from "../../components/asset/NFTList";
import Footer from "../../components/common/Footer";
import { AssetType } from "../../data/enum/asset_type";
import { NFTAsset } from "../../data/model/nft_asset";
import EventsService from "../../data/services/EventsService";

function EventsPage() {
    const [nfts, setNfts] = useState<NFTAsset[]>([]);

    useEffect(() => {
        EventsService.fetchEvents().then(res => {
            if (res.isSuccess()) {
                const data = res.value.events.map<NFTAsset>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: e.stage,
                    assetType: AssetType.EVENTS
                }))
                setNfts(data);
            }
        })
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