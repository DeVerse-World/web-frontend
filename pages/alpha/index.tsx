import { Canvas } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { EventCard, EventViewModel } from "../../components/asset/EventList";
import ModelViewer from "../../components/ModelViewer";
import EventsService from "../../data/services/EventsService";
import { getTimeString } from "../../utils/time_util";
import Link from "next/link";
import { AppContext } from "../../components/contexts/app_context";
import AvatarService from "../../data/services/AvatarService";
import DownloadDemoButton from "../../components/DownloadDemoButton";
import { TabHeaderBar } from "../../components/common/TabHeader";


function Info() {
    const { setViewState, user } = useContext(AppContext);
    const [modelPath, setModelPath] = useState<string>(null);
    const [ongoingEvent, setOngoingEvents] = useState<EventViewModel>(null);

    useEffect(() => {
        if (user == null)
            return;
        AvatarService.getAvatars(user.id).then(res => {
            if (res.isSuccess && res.value) {
                if (res.isSuccess() && res.value.avatars.length > 0) {
                    setModelPath(res.value.avatars[0].preprocess_url)
                }
            }
        })
        EventsService.fetchEvents().then(res => {
            if (res.isSuccess()) {
                const data = res.value.events.map<EventViewModel>(e => ({
                    id: e.id.toString(),
                    name: e.name,
                    description: "Description of event",
                    eventConfigUri: e.event_config_uri,
                    lastUpdate: getTimeString(new Date(e.updated_at)),
                    stage: e.stage,
                    participants: e.max_num_participants
                }))
                if (data.length > 0)
                    setOngoingEvents(data[0]);
            }
        })
    }, [user])

    const renderAvatar = () => {
        if (!modelPath) {
            return <h5>No Avatar Yet, please clogin or create one first</h5>
        }
        return (
            <div className='md:w-[300px] md:h-[600px] w-[250px]'>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 3.5], fov: 50 }}>
                    <ambientLight intensity={2} />
                    <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
                    <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={4} castShadow shadow-mapSize={[1024, 1024]} />
                    <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={4} castShadow={true} shadow-mapSize={[256, 256]} color="#ffffc0" />
                    <ModelViewer position={[0, -0.8, -1.5]} filePath={modelPath} />
                    {/* <OrbitControls makeDefault zoomSpeed={2} /> */}
                </Canvas>
            </div>
        )
    }

    return (
        <>
            {/* <TabHeaderBar data={[
                { href: "/alpha", label: "Play" },
                { href: "/alpha/rewards", label: "Rewards" },
                { href: "/alpha/leaderboard", label: "Leaderboard" },
            ]} /> */}
            <div className="flex flex-col items-center p-4 h-full">
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-3xl font-bold uppercase">Join the verse</h2>
                    <DownloadDemoButton className="h-12" />
                </div>

                <div className="grid grid-cols-3 text-white gap-4 p-4" >
                    <div className="flex flex-col items-center">
                        <Link href="/create" prefetch={false}>
                            <button className="deverse-play-btn p-2 rounded-2xl">Change</button>
                        </Link>
                        {renderAvatar()}
                    </div>
                    <div>
                        {ongoingEvent && <EventCard key={0} data={ongoingEvent} />}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Info;