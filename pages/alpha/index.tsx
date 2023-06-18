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
import EventList from "../../components/asset/EventList";
import Button from "../../components/Button";

function Info() {
    const { setViewState, user } = useContext(AppContext);
    const [modelPath, setModelPath] = useState<string>(null);
    const [ongoingEvents, setOngoingEvents] = useState<EventViewModel[]>([]);

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
                
                    setOngoingEvents(data);
            }
        })
    }, [user])

    const renderAvatar = () => {
        return (
            <div className='mt-6 sm:w-[300px] sm:h-[600px] w-[250px] h-[250px]'>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 4.5], fov: 50 }}>
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
            <div className="mt-6 flex flex-col sm:flex-row p-4 h-full mx-auto max-w-none sm:max-w-4xl">
                <div className="grow">
                    <div className="flex flex-col items-start">
                        <h2 className="text-white text-3xl font-bold mb-10">Join the verse</h2>
                        <p className="mb-6">
                            Get ready to immerse yourself in the magical adventure of Deverse World, where you can participate in a digital revolution and explore the limitless possibilities of the virtual realm.                        
                        </p>

                        <DownloadDemoButton className="h-12" />
                    </div>
                </div>
                {modelPath ? (
                    <div>
                        <div className="flex flex-col items-center gap-4">
                            <Button secondary href="/create">
                                Change avatar
                            </Button>

                            {renderAvatar()}
                        </div>
                    </div>
                ) : (
                    <h5>No Avatar Yet, please clogin or create one first</h5>
                )}
            </div>
            
            {ongoingEvents.length > 0 && (
                <div className="my-12 mx-auto max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                    <h2 className="text-white text-xl font-bold tracking-tight sm:text-xl">
                        Events
                    </h2>
                    <EventList data={ongoingEvents} cardType="event"  />
                </div>
            )}
        </>

    )
}

export default Info;