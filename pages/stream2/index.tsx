import {PixelStreamingWrapper} from "../../components/PixelStreamingWrapper";

import LayoutWrapper from "../../components/LayoutWrapper";

export default function Stream2() {
    return (
        <LayoutWrapper>
            <div
                style={{
                    height: '100%',
                    width: '100%'
                }}
            >
                <PixelStreamingWrapper
                    initialSettings={{
                        AutoPlayVideo: false,
                        AutoConnect: true,
                        ss: 'ws://113.22.88.255:91',
                        StartVideoMuted: false,
                        HoveringMouse: false,
                        ForceTURN: true,
                        OfferToReceive: true
                    }}
                />
            </div>
        </LayoutWrapper>
    )
}