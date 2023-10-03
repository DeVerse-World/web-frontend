import Modal from "react-bootstrap/Modal";
import EpicDownloadButton from "../EpicDownloadButton";

const GameLaunchModal = ({ show, setShow }) => {
    return (
        <Modal
            centered
            show={show}
            onHide={() => setShow(false)}
            contentClassName="bg-black" dialogClassName="deverse-dialog"
        >
            <Modal.Header className="flex flex-row">
                <h3 className="text-white text-center">Launch Game Instance</h3>
            </Modal.Header>
            <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                <h5 className="text-white text-center w-64">Download game client to start your journey</h5>
                <EpicDownloadButton className="h-12" />
            </Modal.Body>
        </Modal>
    );
};

export default GameLaunchModal;