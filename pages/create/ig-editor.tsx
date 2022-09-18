import DownloadDemoButton from "../../components/DownloadDemoButton";
import { getCreateLayout } from "./CreateLayout";


function Editor() {
    return (
        <div className="flex flex-col gap-4 items-center text-white p-4" >
            <h1 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Building games</h1>
            <h3 className="text-center px-16 max-w-[800px]">Anyone can build 3D games for free. No coding required. Contribute to a vast metaverse, filled with amazing creations and experiences.</h3>
            <DownloadDemoButton />
            <div className="flex-col justify-center">
                <h1>System requirement</h1>
                <div className="flex flex-row items-center">
                    <div className="w-[50%]">
                        Minimum
                    </div>
                    <div className="w-[50%]">
                        Maximum
                    </div>
                </div>
            </div>
        </div>
    )
}

Editor.getLayout = getCreateLayout

export default Editor;