import { FormControl, InputGroup, Modal } from "react-bootstrap";

const AvatarForm = ({ header, onChangeAvatarName, onSaveAvatar }) => {
    return (
        <Modal centered show={true}
            contentClassName="bg-black" dialogClassName="deverse-dialog">
            <Modal.Header className="flex flex-row">
                <h3 className="text-white text-center">{header}</h3>
            </Modal.Header>
            <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                <InputGroup>
                    <FormControl id="input-user-name"
                        required
                        placeholder="A sexy duck"
                        aria-label="Name"
                        onChange={(e) => {
                            onChangeAvatarName(e.target.value)
                        }}
                    />
                </InputGroup>
                <button className="bg-deverse-gradient px-4 py-1 rounded-xl" onClick={onSaveAvatar}>Save</button>
            </Modal.Body>
        </Modal>
    );
};

export default AvatarForm;