import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import EventList, { EventCard, EventViewModel } from "../../components/asset/EventList";
import ModelViewer from "../../components/ModelViewer";
import EventsService from "../../data/services/EventsService";
import { getTimeString } from "../../utils/time_util";
import { getAlphaLayout } from "../../components/AlphaLayout";


function Info() {
    const [modelPath, setModelPath] = useState<string>(null);
    const [ongoingEvent, setOngoingEvents] = useState<EventViewModel>();

    useEffect(() => {
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
    }, [])

    return (
        <div className="flex items-center flex-row justify-evenly text-white p-4" >
            <div className="flex flex-col items-center">
                <button className="deverse-play-btn p-2 rounded-2xl">Change</button>
                <div className='md:w-[300px] md:h-[600px] w-[350px] '>
                    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1], fov: 50 }}>
                        <ambientLight intensity={2} />
                        <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
                        <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={4} castShadow shadow-mapSize={[1024, 1024]} />
                        <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={4} castShadow={true} shadow-mapSize={[256, 256]} color="#ffffc0" />
                        <ModelViewer position={[0, -0.8, -1.5]} filePath={"https://d1a370nemizbjq.cloudfront.net/38661c86-1829-4fc5-b327-56e13f8727f7.glb"} />
                        {/* <OrbitControls makeDefault zoomSpeed={2} /> */}
                    </Canvas>
                </div>
            </div>
            {ongoingEvent && <EventCard key={0} data={ongoingEvent} />}  
        </div>
    )
}

Info.getLayout = getAlphaLayout

export default Info;