import { AiFillWindows } from "react-icons/ai";
import { isDesktop } from 'react-device-detect';

type Props = {
    className?: string
}

function DownloadDemoButton(props: Props) {
    return (
        <button id="btn-download-app"
            className={`flex flex-row text-lg items-center cursor-pointer text-white rounded-md px-8 m-1 bg-deverse-gradient ${props.className}`}
            onClick={() => {
                if (isDesktop) {
                    window.open("https://drive.google.com/uc?export=download&id=1-uMt_0e8WHyMYDmd2lV3x6kxBD7DNVLU", "_blank")
                }
                else {
                    window.alert("Please open this in Window to download.")
                }
            }} >
            <span id="btn-download-app" className="me-2">Download</span>
            <AiFillWindows id="btn-download-app" fontSize="2rem" />
        </button>
    )
}

export default DownloadDemoButton;