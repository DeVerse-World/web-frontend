import customProtocolCheck from "custom-protocol-check";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import DownloadDemoButton from "../DownloadDemoButton";

type Props = {
    templateId?: string,
    onClose: () => void
}

export default function PlayModal(props: Props) {
    const [showDownload, setShowDownload] = useState(false);

    const openApp = (templateId, mode) => {
        if (templateId) {
            let appUrl = `deverseworld://?template_id=${props.templateId}&mode=${mode}`;
            customProtocolCheck(
                appUrl,
                () => {
                    setShowDownload(true)
                },
                () => {
                    console.log("Custom protocol found and opened the file successfully.");
                }, 1000
            );
        } else {
            window.alert("missing template id")
        }
    }

    const renderBody = () => {
        if (showDownload) {
            return (
                <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                    <h5 className="text-white text-center w-64">Download game client to start your journey</h5>
                    <DownloadDemoButton />
                </Modal.Body>
            )
        }
        return (
            <Modal.Body className="text-white text-lg break-words flex flex-row gap-4 items-center">
                <button id="btn-play-offline" className="deverse-play-btn w-32 rounded-3xl" onClick={(e) => {
                    e.stopPropagation();
                    openApp(props.templateId, "OFFLINE");
                }}>
                    Offline
                </button>
                {/* <button id="btn-play-online" className="deverse-play-btn w-32 rounded-3xl" onClick={(e) => {
                    e.stopPropagation();
                    openApp(props.templateId, "ONLINE");
                }}>
                    Online
                </button> */}
            </Modal.Body>
        )
    }

    return (
        <Modal centered show={true}
            onHide={props.onClose}
            contentClassName="bg-black" dialogClassName="deverse-dialog">
            {!showDownload && <Modal.Header className="flex flex-row">
                <h3 className="text-white text-center">Launch World</h3>
            </Modal.Header>}
            {renderBody()}
        </Modal>
    )
}