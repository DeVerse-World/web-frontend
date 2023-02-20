import DownloadDemoButton from "../../components/DownloadDemoButton";
import { useState } from "react";
import customProtocolCheck from "custom-protocol-check";
import { Modal } from "react-bootstrap";
import LayoutWrapper from "../../components/LayoutWrapper";
import { TabHeaderBar } from "../../components/common/TabHeader";
import { BsPlayFill } from "react-icons/bs";

function Editor() {
    const [showPlayModal, setShowPlayModal] = useState(false);

    const openApp = () => {
        customProtocolCheck(
            `deverseworld://?is_editor=True`,
            () => {
                setShowPlayModal(true)
            },
            () => {
                console.log("Custom protocol found and opened the file successfully.");
            }, 1000
        );
    }

    return (
        <LayoutWrapper>
            <TabHeaderBar data={[
                { href: '/create', label: 'Avatar' },
                { href: '/create/mint', label: 'Mint' },
                { href: '/create/ig-editor', label: 'Ingame Editor' },
                { href: '/create/ue-sdk', label: 'Unreal Engine SDK' }
            ]} />
            <div id="section-content" className="flex flex-col gap-4 items-center text-white p-4" >
                <h1 className="text-6xl font-bold uppercase bg-deverse-gradient txt-deverse-gradient deverse-title">Build your dream world</h1>
                <h3 className="text-center px-16 max-w-[800px]">Anyone can be a creator, own part of the metaverse now. No coding required, all you need is imagination.</h3>
                <button className="w-[120px] h-[50px] text-white text-lg rounded-3xl flex flex-row gap-2 justify-center items-center deverse-play-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        openApp();
                    }}>
                    <BsPlayFill />
                    Play
                </button>
                <div className="flex flex-row gap-4 justify-center flex-wrap">
                    <HighlightCard img="/images/ig-free-for-all.webp"
                        title="Free for all"
                        description="Create awesome worlds, games, races using thousands of free assets made by the community" />
                    <HighlightCard img="/images/ig-share-creation.webp"
                        title="Share your creation"
                        description="What can be better than having your friends or others players experience your world. Share to everyone with just a button click." />
                    <HighlightCard img="/images/ig-no-coding.webp"
                        title="No Coding needed"
                        description="Easy to use, no coding required. It is simple and intuitive to modify the rules or attributes of your world." />
                </div>
                <SystemRequirement />
            </div>
            <Modal centered show={showPlayModal}
                onHide={() => setShowPlayModal(false)}
                contentClassName="bg-black" dialogClassName="deverse-dialog">
                <Modal.Header className="flex flex-row">
                    <h3 className="text-white text-center">Launch Game Instance</h3>
                </Modal.Header>
                <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                    <h5 className="text-white text-center w-64">Download game client to start your journey</h5>
                    <DownloadDemoButton className="h-12" />
                </Modal.Body>
            </Modal>
        </LayoutWrapper>
    )
}

type HighlightCardProps = {
    title: string,
    description: string,
    img: string
}

function HighlightCard(props: HighlightCardProps) {
    return (
        <div className="flex flex-col gap-4 items-center md:max-w-[32%] max-w-[450px] h-[450px] bg-black/[.4] rounded-xl text-white overflow-hidden">
            <div className="flex flex-col justify-between pt-4 gap-2 flex-grow">
                <span className="text-3xl uppercase text-sky-400 font-bold text-center">{props.title}</span>
                <span className="text-center flex-grow px-4">{props.description}</span>
            </div>
            <img height={400} src={props.img || "/images/placeholder.webp"} className="rounded-bl-xl rounded-br-xl w-full" />
        </div>
    )
}

function SystemRequirement() {
    return (
        <div className="flex-col flex justify-center bg-black/[.4] rounded-xl p-4 gap-4">
            <h1 className="text-3xl uppercase text-sky-400 font-bold text-center">System requirement</h1>
            <div className="flex flex-row items-center flex-wrap gap-4 ">
                <div className="w-[45%] break-words">
                    <h3 className="text-green-600">Minimum</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Window 10 or above<br />
                    Processor: Quad core 3.2Ghz<br />
                    Memory: 8GB<br />
                    Graphics: GTX 1060 or equivalent<br />
                    DirectX: Version 11<br />
                    Storage: 6GB available space
                </div>
                <div className="w-[45%] break-words">
                    <h3 className="text-green-600">Recommended</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Window 10 or above<br />
                    Processor: 8-core 3.8Ghz<br />
                    Memory: 16GB<br />
                    Graphics: GTX 2060 or above<br />
                    DirectX: Version 11<br />
                    Storage: 10GB available space
                </div>
            </div>
        </div>
    )
}

export default Editor;