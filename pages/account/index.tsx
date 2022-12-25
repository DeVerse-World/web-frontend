import React, { useContext, useEffect, useState } from "react";
import AccountService from "../../data/services/AccountService";
import { AppContext } from "../../components/contexts/app_context";
import AvatarContainer from "../../components/AvatarContainer";
import Link from "next/link";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { formatWalletAddress } from "../../utils/wallet_util";
import AvatarList, { AvatarViewModel } from "../../components/asset/AvatarList";
import EventList, { EventViewModel } from "../../components/asset/EventList";
import RootWorldList, { TemplateViewModel } from "../../components/asset/RootWorldList";
import { getTimeString } from "../../utils/time_util";
import StorageService from "../../data/services/StorageService";
import UnauthorizedView from "../../components/UnauthorizedView";

function Account() {
    const { user, setUser } = useContext(AppContext);

    const [avatars, setAvatars] = useState<AvatarViewModel[]>([]);
    const [events, setEvents] = useState<EventViewModel[]>([]);
    const [templates, setTemplates] = useState<TemplateViewModel[]>([]);

    useEffect(() => {
        if (StorageService.getUser() == null) {
            return;
        }
        AccountService.getUserInfo().then(e => {
            if (e.isSuccess && e.value) {
                setAvatars(e.value.avatars.map<AvatarViewModel>(item=> ({
                    id: item.id?.toString(),
                    supply: 9999,
                    maxSupply: 9999,
                    name: "Avatar #",
                    modelUri: item.preprocess_url,
                    image: item.postprocess_url,
                }))) 
                setEvents(e.value.created_events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                })));
                const roots = e.value.created_root_subworld_templates.map<TemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                const derivs = e.value.created_deriv_subworld_templates.map<TemplateViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.display_name,
                    description: e.display_name,
                    image: e.thumbnail_centralized_uri,
                    fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
                    file2dUri: e.thumbnail_centralized_uri,
                    fileAssetUri: e.level_ipfs_uri,
                    file3dUri: e.level_ipfs_uri,
                    onlineOpenable: true,
                    offlineOpenable: true
                }))
                setTemplates(roots.concat(derivs));
            }
        })
    }, []);

    useEffect(() => {
        if (avatars.length ==0)
        return;
        setUser({...user, avatar: avatars[0].image});
    },[avatars])

    if (!user) {
        return <UnauthorizedView/>
    }
    return (
        <div className="flex flex-col items-center text-white">
            <section id='cover-picture' className="h-[350px]  overflow-hidden flex items-center">
                <img title="cover-image" src="images/01.webp" className="w-screen" />
            </section>
            <section id="avatar-section" className="flex flex-row w-[80%]">
                <div className="flex flex-row gap-4">
                    <AvatarContainer style={{
                        position: 'relative',
                        bottom: '50%'
                    }} />
                    <div className="py-2">
                        {user?.name && <h1>{user?.name}</h1>} 
                        {user?.wallet_address &&
                        <div className="flex flex-row gap-2">
                            <h5 className="text-deverse">{formatWalletAddress(user.wallet_address)}</h5>
                        </div>
                        }
                        {user?.social_email &&
                            <div className="flex flex-row gap-2">
                                <h5 className="text-deverse">{user?.social_email}</h5>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <section id="wallet-section" className="w-full px-4">
                <div className="p-4">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-blue-300 text-3xl font-bold pl-4">Avatars ({avatars.length})</h3>
                        <Link href="/account/avatar">
                            <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                        </Link>
                    </div>
                    <AvatarList data={avatars}/>
                </div>

                <div className="p-4">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-blue-300 text-3xl font-bold pl-4">Events ({events.length})</h3>
                        <Link href="/account/events">
                            <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                        </Link>
                    </div>
                    <EventList data={events}/>
                </div>

                <div className="p-4">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-blue-300 text-3xl font-bold pl-4">Templates ({templates.length})</h3>
                        <Link href="/account/templates">
                            <span className="text-blue-400 text-2xl cursor-pointer" >Show all</span>
                        </Link>
                    </div>
                    <RootWorldList data={templates}/>
                </div>
            </section>  
        </div>
    );
}

Account.getLayout = getAccountWrapperLayout;

export default Account;