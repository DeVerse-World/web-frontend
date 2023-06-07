import { useContext, useEffect, useState } from "react";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import AccountService from "../../data/services/AccountService";
import { getTimeString } from "../../utils/time_util";
import { TabHeaderBar } from "../../components/common/TabHeader";

export default function Events() {
    const { setViewState } = useContext(AppContext);
    const [nfts, setNfts] = useState<EventViewModel[]>([]);
    useEffect(() => {
        setViewState(ViewState.LOADING);
        AccountService.getUserInfo().then(res => {
            if (res.isSuccess()) {
                const data = res.value.created_events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                }))
                setNfts(data);
            }
        }).finally(() => {
            setViewState(ViewState.SUCCESS);
        })
    }, [])

    // const deleteItem = (asset: NFTAsset) => {
    //     let deletedIndex = nfts.indexOf(asset);
    //     if (deletedIndex > -1) {
    //         let clonedData = [...nfts];
    //         clonedData.splice(deletedIndex, 1);
    //         setNfts(clonedData);
    //     }
    // }

    return (
        <>
            <TabHeaderBar data={[
                { href: '/account', label: 'Info' },
                // { href: '/account/wallet', label: 'Wallet' },
                { href: '/account/avatar', label: 'Avatars' },
                // { href: '/account/events', label: 'Events' },
                { href: '/account/templates', label: 'Worlds' },
                // { href: '/account/items', label: 'Items' },
                { href: '/account/settings', label: 'Settings' }
            ]} />
            <EventList data={nfts} />
        </>
    )
}