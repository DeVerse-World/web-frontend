import { AiFillWindows } from "react-icons/ai";
import { isDesktop } from 'react-device-detect';
import FirebaseService from "../data/services/FirebaseService";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context";
import Button from './Button';

type Props = {
    className?: string
}

function DownloadDemoButton(props: Props) {
    const { remoteConfig } = useContext(AppContext)
    const onDownload = () => {
        if (isDesktop) {
            FirebaseService.getAlphaDriveLink(remoteConfig).then(url => {
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
      <Button
        className="flex items-center gap-x-1"
        onClick={onDownload}
        primary
      >
        <AiFillWindows className="-ml-1.5 h-5 w-5" />
        Download
      </Button>
    )
}

export default DownloadDemoButton;
