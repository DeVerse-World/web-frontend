import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import { AppContext } from "../contexts/app_context";
import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import AuthService from "../../data/services/AuthService";

type Props = {
    isAddGoogleOnly: boolean;
    isAddMetamaskOnly: boolean;
} & ModalProps;

function LoginModal(props: Props) {
    const { user, setUser } = useContext(AppContext);
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

    const onSteamConnect = () => {
        AuthService.connectToSteam();
    }

    const onGoogleConnect = useGoogleLogin({
        onSuccess: (codeResponse) => {
            AuthService.connectToGoogleMail(codeResponse.access_token, user).then(res => {
                if (res.isFailure()) {
                    window.alert(res.error);
                    return;
                }
                setUser(res.value.user);
                modalProps.onHide();
            })
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const renderContent = () => {
        let element = (
            <div className="flex flex-col items-center justify-center h-full">
                <h1>Log in/Register</h1>
                {!isAddGoogleOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                    onClick={onMetamaskConnect}>
                    <img title="metamask" src="/images/metamask.webp" />
                    Metamask
                </button>}
                {!isAddMetamaskOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                    onClick={() => onGoogleConnect()}>
                    <img title="steam" src="/images/google.webp" />
                    Google
                </button>}
                {!isAddSteamOnly && <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                    onClick={onSteamConnect}>
                    <img title="steam" src="/images/steam_logo.png" />
                    Steam
                </button>}
            </div>
        )

        return element;
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