import { Button, Modal } from "react-bootstrap";

type Props = {
    onClose: () => void
}

export default function PlayModal(props: Props) {
    return (
        <Modal centered show={true}
            onHide={props.onClose}
            contentClassName="bg-black" dialogClassName="deverse-dialog">
            <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={() => {
                    // TODO
                }}>
                    Offline
                </button>
                <button className="deverse-play-btn w-32 rounded-3xl" onClick={() => {
                    // TODO
                }}>
                    Online
                </button>
            </Modal.Body>
        </Modal>
    )
}