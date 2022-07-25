import { useMetaMask } from "metamask-react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from 'react-icons/Md';

function LoginModal(props: ModalProps) {
    const { status, connect, account } = useMetaMask();

    const onMetamaskConnect = () => {
        connect();
        props.onHide();
    }

    return (
        <Modal {...props} >
            <Modal.Body className='bg-black text-white flex flex-col items-center justify-center'>
                <AiOutlineClose className="absolute top-5 right-5 cursor-pointer" size={40} onClick={() => props.onHide()} />
                {/* <button className="absolute top-5 right-5" onClick={() => props.onHide()}></button> */}
                <h1>Log in or Create an account</h1>
                <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                    onClick={onMetamaskConnect}>
                    <img title="metamask" src="/images/metamask.webp" />
                    Login with metamask
                </button>
                <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2">
                    <img title="metamask" src="/images/google.webp" />
                    Login with google
                </button>
                Or
                <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                >
                    <MdEmail size={30}/>
                    Signup with email
                </button>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal;