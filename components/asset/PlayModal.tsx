import customProtocolCheck from "custom-protocol-check";
import { Modal } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";

type Props = {
    templateId?: string,
    onClose: () => void
}

export default function PlayModal(props: Props) {
    const openApp = (templateId, mode) => {
        if (templateId) {
            let appUrl = `deverseworld://?template_id=${props.templateId}&mode=${mode}`;
            customProtocolCheck(
                appUrl,
                () => {
                    window.alert("Please download game")
                },
                () => {
                    console.log("Custom protocol found and opened the file successfully.");
                }, 1000
            );
        } else {
            window.alert("missing template id")
        }
    }
    return (
        <Modal centered show={true}
            onHide={props.onClose}
            contentClassName="bg-black" dialogClassName="deverse-dialog">
            <Modal.Header >
                <h3 className="text-white text-center">Launch Game Instance</h3>
            </Modal.Header>
            <Modal.Body className="text-white text-lg break-words flex flex-row gap-4 items-center">
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={(e) => {
                    e.stopPropagation();
                    openApp(props.templateId, "OFFLINE");
                }}>
                    Offline
                </button>
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={(e) => {
                    e.stopPropagation();
                   openApp(props.templateId, "ONLINE");
                }}>
                    Online
                </button>
            </Modal.Body>
        </Modal>
    )
}