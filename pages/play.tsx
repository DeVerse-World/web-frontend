import { PixelStreamingWrapper } from "../components/PixelStreamingWrapper";
export default function About() {
    return (
        <div className="h-96 w-96"
        >   
            <PixelStreamingWrapper
                initialSettings={{
                    AutoPlayVideo: true,
                    AutoConnect: true,
                    ss: 'ws://192.168.0.131:12',
                    StartVideoMuted: true,
                    HoveringMouse: true
                }}
            />
        </div>
    );
}

