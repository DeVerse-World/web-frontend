import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import { AppContext } from "../contexts/app_context";
import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import AuthService from "../../data/services/AuthService";

enum AuthAction {
    Home, Email_Signup, Email_Signin
}

type Props = {
    isAddGoogleOnly: boolean;
    isAddMetamaskOnly: boolean;
} & ModalProps;

function LoginModal(props: Props) {
    const { user, setUser } = useContext(AppContext);
    const [currentAction, setCurrentAction] = useState<AuthAction>(AuthAction.Home);
    const { status, connect, account } = useMetaMask();
    const { isAddGoogleOnly, isAddMetamaskOnly, isAddSteamOnly, ...modalProps } = props;
    // TODO: metamask logic only executed when explicitly pressing metamask button
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
                    if (res.isFailure()) {
                        window.alert(res.error)
                        return;
                    }
                    setUser(res.value.user);
                    modalProps.onHide();
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
    }

    const onGoogleLogin = (event: CredentialResponse) => {
        AuthService.connectToGoogleMail(event.credential, user).then(res => {
            // let googleUser = jwt_decode<GoogleUser>(event.credential);
            if (res.isFailure()) {
                window.alert(res.error);
                return;
            }
            setUser(res.value.user);
            modalProps.onHide();
        });
    }

    const onGoogleFailure = () => {
        modalProps.onHide();
    }

    const onSteamConnect = () => {
        AuthService.connectToSteam();
    }

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
                        <h1>Log in/Register</h1>
                        {!isAddGoogleOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={onMetamaskConnect}>
                            <img title="metamask" src="/images/metamask.webp" />
                            Metamask
                        </button>}
                        {/* <button onClick={(e) => googleSecondaryLogin()}
                            className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2">
                            <img title="metamask" src="/images/google.webp" />
                            Google
                        </button> */}
                        {!isAddMetamaskOnly && <GoogleLogin width='300' onSuccess={onGoogleLogin} onError={onGoogleFailure} />}
                        {!isAddSteamOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                                                     onClick={onSteamConnect}>
                            <img title="steam" src="/images/steam_logo.png" />
                            Steam
                        </button>}
                        {/* <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                            onClick={() => setCurrentAction(AuthAction.Email_Signin)}>
                            <MdEmail size={30} />
                            Email
                        </button> */}
                        {/* Or */}
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
        <Modal {...modalProps} >
            <Modal.Body className='bg-black text-white '>
                <AiOutlineClose className="absolute top-5 right-5 cursor-pointer" size={40} onClick={() => modalProps.onHide()} />
                {renderContent()}
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal;