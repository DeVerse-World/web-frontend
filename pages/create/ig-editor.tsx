import DownloadDemoButton from "../../components/DownloadDemoButton";
import { getCreateLayout } from "./CreateLayout";


function Editor() {
    return (
        <div className="flex flex-col gap-4 items-center text-white p-4" >
            <h1 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Building games</h1>
            <h3 className="text-center px-16 max-w-[800px]">Anyone can build 3D games for free. No coding required. Contribute to a vast metaverse, filled with amazing creations and experiences.</h3>
            <DownloadDemoButton />
            <div className="flex flex-row gap-4 flex-wrap">
                <HighlightCard title="Create for free" description="Create awesome 3D games for free using thousands of voxel models (NFTs) made by the community with VoxEdit." />
                <HighlightCard title="Build and share" description="Create awesome 3D games for free using thousands of voxel models (NFTs) made by the community with VoxEdit." />
                <HighlightCard title="No Coding needed" description="Create awesome 3D games for free using thousands of voxel models (NFTs) made by the community with VoxEdit." />
            </div>
            <SystemRequirement />
        </div>
    )
}

type HighlightCardProps = {
    title: string,
    description: string,
    img: string
}

function HighlightCard(props: HighlightCardProps) {
    return (
        <div className="deverse-border flex flex-col gap-4 items-center md:max-w-[32%] max-w-[450px] h-[450px] bg-black/[.4] rounded-xl text-white p-2">
            <span className="text-3xl uppercase text-sky-400 font-bold text-center">{props.title}</span>
            <span className="text-center">{props.description}</span>
            <img height={200} width={200} src="/images/placeholder.png" />
        </div>
    )
}

function SystemRequirement() {
    return (
        <div className="flex-col flex justify-center deverse-border bg-black/[.4] rounded-xl p-4 gap-4">
            <h1 className="text-3xl uppercase text-sky-400 font-bold text-center">System requirement</h1>
            <div className="flex flex-row items-center flex-wrap gap-4 ">
                <div className="w-[45%] break-words">
                    <h3 className="text-orange-400">MINIMUM</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Windows 7 <br />
                    Processor: Dual Core 2GHz<br />
                    Memory: 4 GB RAM<br />
                    Graphics: 512 MB VRAM<br />
                    DirectX: Version 11<br />
                    Storage: 2 GB available space
                </div>
                <div className="w-[45%] break-words">
                    <h3 className="text-orange-400">RECOMMEND</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Windows 10<br />
                    Processor: Quad Core 3GHz<br />
                    Memory: 8 GB RAM<br />
                    Graphics: 2 GB VRAM<br />
                    DirectX: Version 11<br />
                    Storage: 2 GB available space<br />
                </div>
            </div>
        </div>
    )
}

Editor.getLayout = getCreateLayout

export default Editor;