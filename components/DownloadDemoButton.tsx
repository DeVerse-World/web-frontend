import { CSSProperties } from "react";
import { AiFillWindows } from "react-icons/ai";

function DownloadDemoButton(props: CSSProperties) {
    return (
        <button id="btn-download-app" {...props}
            className="flex flex-row text-lg items-center cursor-pointer text-white rounded-md h-[50px] py-2 px-10 m-1 bg-deverse-gradient"
            onClick={() => {
                window.open("https://drive.google.com/file/d/1va5Nyvzbz0PfheMk2Ma10JVuN4rsGliH/view", "_blank")
            }} >
            <span className="me-2">Download</span>
            <AiFillWindows fontSize="2rem" />
        </button>
    )
}

export default DownloadDemoButton;