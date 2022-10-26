import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useRef, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";
import { AppContext } from "../../components/contexts/app_context";
import AccountService from "../../data/services/AccountService";
import AuthService from "../../data/services/AuthService";
import { usePrevious } from "../../utils/use_previous";

function Settings() {
    const { user, setUser } = useContext(AppContext);
    const [currentWallet, setCurrentWallet] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const { status, connect, account: walletAddress } = useMetaMask();
    const previousMetamaskState = usePrevious(status);
    useEffect(() => {
        console.log(user)
        setCurrentWallet(user?.wallet_address || '')
        setCurrentEmail(user?.social_email || '')
    }, [user])

    // const googleLogin = useGoogleLogin({
    //     flow: 'auth-code',
    //     onSuccess: tokenResponse => {
    //         console.log(tokenResponse)
    //     },
    //     onError: errorResponse => {
    //         console.log(errorResponse.error_description)
    //     }
    // });

    // const onLinkAccountWithGoogle = () => {
    //     googleLogin();
    //     // AccountService.addUserModelWithGoogleMail(user.id, "abc")
    // }

    const onGoogleLogin = (event: CredentialResponse) => {
        AuthService.connectToGoogleMail(event.credential, user).then(res => {
            // let googleUser = jwt_decode<GoogleUser>(event.credential);
            if (res.isFailure()) {
                window.alert(res.error);
                return;
            }
            setUser(res.value.user);
        });
    }


    useEffect(() => {
        if (previousMetamaskState == "connecting" && status == "connected") {
            AuthService.connectToMetamask(walletAddress, user).then(res => {
                if (res.isFailure()) {
                    window.alert(res.error)
                    return;
                }
                setUser(res.value.user);
            });
        }
    }, [status])


    const onLinkAccountWithMetamask = () => {
        if (currentWallet.length == 0) {
            if (walletAddress.length > 0) {
                AuthService.connectToMetamask(walletAddress, user).then(res => {
                    if (res.isFailure()) {
                        window.alert(res.error)
                        return;
                    }
                    setUser(res.value.user);
                });
            } else {
                connect();
            }
        }
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            //TODO: invoke this api, it will return google User
            //https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}

            // AuthService.connectToGoogleMail(event.credential, user).then(res => {
            //     // let googleUser = jwt_decode<GoogleUser>(event.credential);
            //     if (res.isFailure()) {
            //         window.alert(res.error);
            //         return;
            //     }
            //     setUser(res.value.user);
            // });
        },
    });

    if (!user) {
        return <div>Login First</div>
    }
    {/* <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithGoogle} >(Link with Google)</span> */ }

    return (
        <section className="flex flex-row gap-4 text-white">
            <h3 className="text-blue-300 text-3xl font-bold pl-4">Settings</h3>
            <div className="flex flex-col gap-2 py-4 w-[400px]">
                <h5>Name</h5>
                <InputGroup>
                    <FormControl id="name" required
                        placeholder="Name"
                        aria-label="User Name"
                        value={user.name}
                        readOnly
                    />
                </InputGroup>
                <div className="flex flex-row gap-4">
                    <h5>Wallet Address</h5>
                    {!user?.social_email && user.wallet_address &&
                        // <span className="text-blue-400 cursor-pointer" onClick={() => login()} >(Link with Google)</span>
                        <GoogleLogin width='300' onSuccess={onGoogleLogin} />
                    }
                </div>
                <InputGroup>
                    <FormControl id="wallet-address" required
                        placeholder="Wallet"
                        aria-label="Asset Name"
                        value={currentWallet}
                        readOnly
                    />
                </InputGroup>
                <div className="flex flex-row gap-4">
                    <h5>Email Address</h5>
                    {!user?.wallet_address && user.social_email &&
                        <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithMetamask} >(Link with Metamask)</span>
                    }
                </div>
                <InputGroup>
                    <FormControl id="email-address" required
                        placeholder="Email"
                        aria-label="Asset Name"
                        value={currentEmail}
                        readOnly
                    />
                </InputGroup>
            </div>
        </section>
    )
}

Settings.getLayout = getAccountWrapperLayout;

export default Settings;