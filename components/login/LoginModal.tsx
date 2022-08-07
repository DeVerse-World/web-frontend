import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from 'react-icons/md';
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import { AppContext } from "../contexts/app_context";
import { User, UserType } from "../../data/model/user";
import WalletService from "../../data/services/WalletService";
import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import AuthService from "../../data/services/AuthService";

enum AuthAction {
    Home, Email_Signup, Email_Signin
}

function LoginModal(props: ModalProps) {
    const { setUser } = useContext(AppContext);
    const [currentAction, setCurrentAction] = useState<AuthAction>(AuthAction.Home);
    const { status, connect, account } = useMetaMask();

    useEffect(() => {
        switch (status) {
            case "initializing":
                // setBoxContent("Syncing");
                break;
            case "unavailable":
                // setBoxContent("Metamask unavailable");
                break;
            case "notConnected":
                // setBoxContent("Connect to Metamask");
                break;
            case "connecting":
                // setBoxContent("Connecting");
                break;
            case "connected":
                // setBoxContent(account);
                WalletService.connectToMetamask(account).then(value => {
                    if (!value) {
                        return;
                    }
                    let user: User = {
                        id: account,
                        name: account,
                        avatar: '',
                        email: '',
                        userType: UserType.METAMASK
                    };
                    setUser(user);
                });
                break;
            default:
                break;
        }
    }, [status])

    const onMetamaskConnect = () => {
        if (status == "unavailable") {
            window.alert('Metamask is unavailable. Please install/enable metamask extension in your browser and try again.')
            return;
        }
        connect();
        props.onHide();
    }

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
        },
        onError: errorResponse => {
            console.log(errorResponse.error_description)
        }
    });

    const googleSecondaryLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: codeResponse => {
            console.log(codeResponse)
        },
        onError: errorResponse => {
            console.log(errorResponse)
        }
    })

    const onGoogleLogin = (event: CredentialResponse) => {
        let user = AuthService.onGoogleLogin(event.credential);
        setUser(user);
        props.onHide();
    }

    const onGoogleFailure = () => {
        props.onHide();
    }

    const onGoogleLogout = () => {
        console.log('logged out')
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
                        <button onClick={(e) => googleSecondaryLogin()}
                            className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2">
                            <img title="metamask" src="/images/google.webp" />
                            Google
                        </button>
                        <GoogleLogin width={300} onSuccess={onGoogleLogin} onError={onGoogleFailure} />
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