import Iframe from 'react-iframe';

import LayoutWrapper from "../../components/LayoutWrapper";

function Streaming() {
    return (
        <LayoutWrapper>
            <Iframe url="http://42.117.89.133:91/?hoveringMouse=true"
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
