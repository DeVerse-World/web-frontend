import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from 'react-icons/md';
import EmailSignin from "./EmailLogin";
import EmailSignup from "./EmailSignup";
import GoogleLogin, { GoogleLoginResponse, GoogleLogout } from 'react-google-login';
import { AppContext } from "../contexts/app_context";
import { User, UserType } from "../../data/model/user";
import WalletService from "../../data/services/WalletService";

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
                let user : User = {
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

    const onGoogleLogin = (event: GoogleLoginResponse) => {
        let profile = event.getBasicProfile();
        let user : User = {
            id: profile.getId(),
            name: profile.getName(),
            avatar: profile.getImageUrl(),
            email: profile.getEmail(),
            userType: UserType.GOOGLE
        };
        setUser(user);
        props.onHide();
    }

    const onGoogleFailure = (error) => {
        console.log(error)
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
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
                            render={(loginProps) => {
                                return (<button onClick={loginProps.onClick}
                                    className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2">
                                    <img title="metamask" src="/images/google.webp" />
                                    Google
                                </button>)
                            }}
                            buttonText="abc"
                            onSuccess={onGoogleLogin}
                            onFailure={onGoogleFailure}
                        // isSignedIn={true}
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