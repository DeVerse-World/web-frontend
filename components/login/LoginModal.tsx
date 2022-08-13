import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from 'react-icons/md';
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import { AppContext } from "../contexts/app_context";
import {GoogleUser, User, UserType} from "../../data/model/user";
import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import AuthService from "../../data/services/AuthService";
import AccountService from "../../data/services/AccountService";
import jwt_decode from "jwt-decode";

enum AuthAction {
    Home, Email_Signup, Email_Signin
}

function LoginModal(props) {
    const { user, setUser } = useContext(AppContext);
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
                AuthService.connectToMetamask(account, user).then(res => {
                    if (!res) {
                        window.alert("some error while creating metamask info")
                        return;
                    }
                    if (res.error) {
                        window.alert(res.error);
                        return;
                    }
                    setUser(res.data.user);
                    props.onHide();
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
        // props.onHide();
    }

    const onGoogleLogin = (event: CredentialResponse) => {
        AuthService.connectToGoogleMail(event.credential, user).then(res => {
            console.log(res);
            let googleUser = jwt_decode<GoogleUser>(event.credential);
            if (!res) {
                window.alert("some error while creating google mail info")
                return;
            }
            if (res.error) {
                window.alert(res.error);
                return;
            }
            setUser(res.data.user);
            props.onHide();
        });
    }

    const onGoogleFailure = () => {
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
                        {!props.isAddGoogleOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={onMetamaskConnect}>
                            <img title="metamask" src="/images/metamask.webp" />
                            Metamask
                        </button>}
                        {/* <button onClick={(e) => googleSecondaryLogin()}
                            className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2">
                            <img title="metamask" src="/images/google.webp" />
                            Google
                        </button> */}
                        {!props.isAddMetamaskOnly && <GoogleLogin width={300} onSuccess={onGoogleLogin} onError={onGoogleFailure} />}
                        {/* <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={() => setCurrentAction(AuthAction.Email_Signin)}>
                            <MdEmail size={30} />
                            Email
                        </button> */}
                        Or
                        {/*<button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"*/}
                        {/*    onClick={() => setCurrentAction(AuthAction.Email_Signup)}>*/}
                        {/*    <MdEmail size={30} />*/}
                        {/*    Signup with email*/}
                        {/*</button>*/}
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