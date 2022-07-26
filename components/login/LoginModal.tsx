import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from 'react-icons/Md';
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';

enum AuthAction {
    Home, Email_Signup, Email_Signin
}

function LoginModal(props: ModalProps) {
    const [currentAction, setCurrentAction] = useState<AuthAction>(AuthAction.Home);
    const { status, connect, account } = useMetaMask();

    const onMetamaskConnect = () => {
        connect();
        props.onHide();
    }

    const onGoogleLogin = (event: GoogleLoginResponse) => {
        console.log(event)
        props.onHide();
    }

    const onGoogleFailure = (error) => {
        console.log(error)
        props.onHide();
    }

    const renderContent = () => {
        let element = null;
        switch (currentAction) {
            case AuthAction.Email_Signup:
                element = (
                    <div className="flex flex-col items-center h-full justify-center ">
                        <EmailSignup />
                    </div>
                )
                break;
            case AuthAction.Email_Signin:
                element = (
                    <div className="flex flex-col items-center h-full justify-center ">
                        <EmailSignin />
                    </div>
                );
                break;
            default:
                element = (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1>Log in or Create an account</h1>
                        <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={onMetamaskConnect}>
                            <img title="metamask" src="/images/metamask.webp" />
                            Metamask
                        </button>
                        {/* <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2"
                            onClick={() => console.log(process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID)}>
                            <img title="metamask" src="/images/google.webp" />
                            Google
                        </button> */}
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
                            render={(props) => {
                                return (<button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2"
                                    onClick={() => console.log(process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID)}>
                                    <img title="metamask" src="/images/google.webp" />
                                    Google
                                </button>)
                            }}
                            onSuccess={onGoogleLogin}
                            onFailure={onGoogleFailure}
                        />
                        {/* <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={() => setCurrentAction(AuthAction.Email_Signin)}>
                            <MdEmail size={30} />
                            Email
                        </button> */}
                        Or
                        <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={() => setCurrentAction(AuthAction.Email_Signup)}>
                            <MdEmail size={30} />
                            Signup with email
                        </button>
                    </div>
                )
                break;
        }
        return element
    }

    return (
        <Modal {...props} >
            <Modal.Body className='bg-black text-white '>
                <AiOutlineClose className="absolute top-5 right-5 cursor-pointer" size={40} onClick={() => props.onHide()} />
                {/* <button className="absolute top-5 right-5" onClick={() => props.onHide()}></button> */}
                {renderContent()}
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal;