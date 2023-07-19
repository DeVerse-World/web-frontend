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
import EpicDownloadButton from "../../components/EpicDownloadButton";
import FirebaseService from "../../data/services/FirebaseService";


function Info() {
    const { setViewState, user } = useContext(AppContext);
    const [modelPath, setModelPath] = useState<string>(null);
    const [ongoingEvents, setOngoingEvents] = useState<EventViewModel[]>([]);
    const [imageHeadPage, setImageHeadPage] = useState();

    useEffect(() => {
    //     if (user == null)
    //         return;
    //     AvatarService.getAvatars(user.id).then(res => {
    //         if (res.isSuccess && res.value) {
    //             if (res.isSuccess() && res.value.avatars.length > 0) {
    //                 setModelPath(res.value.avatars[0].preprocess_url)
    //             }
    //         }
    //     })
        FirebaseService.getImageHeadPage().then(setImageHeadPage);
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
    }, [])

    // const renderAvatar = () => {
    //     return (
    //         <div className='mt-6 sm:w-[300px] sm:h-[600px] w-[250px] h-[250px]'>
    //             <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 4.5], fov: 50 }}>
    //                 <ambientLight intensity={2} />
    //                 <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
    //                 <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={4} castShadow shadow-mapSize={[1024, 1024]} />
    //                 <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={4} castShadow={true} shadow-mapSize={[256, 256]} color="#ffffc0" />
    //                 <ModelViewer position={[0, -0.8, -1.5]} filePath={modelPath} />
    //                 {/* <OrbitControls makeDefault zoomSpeed={2} /> */}
    //             </Canvas>
    //         </div>
    //     )
    // }

   
    return (
        <>
            {/* <TabHeaderBar data={[
                { href: "/alpha", label: "Play" },
                { href: "/alpha/rewards", label: "Rewards" },
                { href: "/alpha/leaderboard", label: "Leaderboard" },
            ]} /> */}
            <div
                className="bg-cover h-[24rem]"
                style={{
                    backgroundImage: `
                        linear-gradient(to left, rgba(7, 24, 39, 0.3) 40%, rgba(17, 24, 39, 1) 70%),
                        linear-gradient(to bottom, rgba(7, 24, 39, 0.3) 75%, rgba(17, 24, 39, 1) 90%),
                        url('${imageHeadPage}')
                    `,
                }}
            >
                <div className="flex flex-col items-start max-w-sm pt-16 sm:pt-20 pl-12 sm:pl-16">
                    <h2 className="text-white text-3xl font-bold mb-8">Join the journey</h2>
                    <p className="mb-6">
                        Get ready to immerse yourself in the magical adventure of Deverse World, where you can participate in a digital revolution and explore the limitless possibilities of the virtual realm.                        
                    </p>

                    <div className="flex items-center gap-x-4">
                        <EpicDownloadButton />
                        <DownloadDemoButton />
                    </div>
                </div>
            </div>
            {modelPath && (
                <div className="mt-6 flex flex-col sm:flex-row h-full mx-auto max-w-none sm:max-w-4xl">
                    <div>
                        <div className="flex flex-col items-center gap-4">
                            <Button secondary href="/create">
                                Change avatar
                            </Button>

                            {renderAvatar()}
                        </div>
                    </div>
                </div>
            )}
            
            
            {ongoingEvents.length > 0 && (
                <div className="my-20 mx-auto max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
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
