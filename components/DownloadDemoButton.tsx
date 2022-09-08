import { CSSProperties } from "react";
import { AiFillWindows } from "react-icons/ai";

type Props = {
    className: string
}

function DownloadDemoButton(props: Props) {
    return (
        <button id="btn-download-app"
            className={`flex flex-row text-lg items-center cursor-pointer text-white rounded-md px-8 m-1 bg-deverse-gradient ${props.className}`}
            onClick={() => {
                window.open("https://drive.google.com/file/d/1va5Nyvzbz0PfheMk2Ma10JVuN4rsGliH/view", "_blank")
            }} >
            <span className="me-2">Download</span>
            <AiFillWindows fontSize="2rem" />
        </button>
    )
}

export default DownloadDemoButton;