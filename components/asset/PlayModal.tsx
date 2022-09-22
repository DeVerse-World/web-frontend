import { Modal } from "react-bootstrap";

type Props = {
    templateId?: string,
    onClose: () => void
}

export default function PlayModal(props: Props) {
    return (
        <Modal centered show={true}
            onHide={props.onClose}
            contentClassName="bg-black" dialogClassName="deverse-dialog">
            <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={() => {
                    if (props.templateId)
                        window.open(`deverseworld://?template_id=${props.templateId}&mode=OFFLINE`)
                }}>
                    Offline
                </button>
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={() => {
                    if (props.templateId)
                        window.open(`deverseworld://?template_id=${props.templateId}&mode=ONLINE`)
                }}>
                    Online
                </button>
            </Modal.Body>
        </Modal>
    )
}