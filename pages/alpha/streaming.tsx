import Iframe from 'react-iframe';
import { getAlphaLayout } from "../../components/AlphaLayout";

function Streaming() {
    return (
        <Iframe url="http://1.54.73.92:91"
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                position="relative"/>
    )
}

Streaming.getLayout = getAlphaLayout

export default Streaming;