import Iframe from 'react-iframe';

import LayoutWrapper from "../../components/LayoutWrapper";

function Streaming() {
    return (
        <LayoutWrapper>
            <Iframe url="http://113.22.91.61:91"
                    width="100%"
                    height="100%"
                    id=""
                    className=""
                    display="block"
                    allow="fullscreen"
                    position="relative"/>
        </LayoutWrapper>
    )
}

export default Streaming;
