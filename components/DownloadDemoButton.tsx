import { AiFillWindows } from "react-icons/ai";
import { isDesktop } from 'react-device-detect';
import FirebaseService from "../data/services/FirebaseService";

type Props = {
    className?: string
}

function DownloadDemoButton(props: Props) {

    const onDownload = () => {
        if (isDesktop) {
            FirebaseService.getAlphaDriveLink().then(url => {
                window.open(url, "_blank")
            }).catch(e => {
                window.alert(e)
            })
        }
        else {
            window.alert("Please open this in Window to download.")
        }
    }

    return (
        <button id="btn-download-app"
            className={`flex flex-row text-lg items-center cursor-pointer text-white rounded-md px-8 m-1 bg-deverse-gradient ${props.className}`}
            onClick={onDownload} >
            <span id="btn-download-app" className="me-2">Download</span>
            <AiFillWindows id="btn-download-app" fontSize="2rem" />
        </button>
    )
}

export default DownloadDemoButton;