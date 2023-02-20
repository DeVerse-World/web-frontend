import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { AppContext } from "../../components/contexts/app_context";
import AuthService from "../../data/services/AuthService";
import { usePrevious } from "../../utils/use_previous";
import LayoutWrapper from "../../components/LayoutWrapper";
import { TabHeaderBar } from "../../components/common/TabHeader";

export default function Settings() {
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

    const onGoogleConnect = useGoogleLogin({
        onSuccess: (codeResponse) => {
            AuthService.connectToGoogleMail(codeResponse.access_token, user).then(res => {
                if (res.isFailure()) {
                    window.alert(res.error);
                    return;
                }
                setUser(res.value.user);
            })
        },
        onError: (error) => window.alert(error)
    });


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
            if (walletAddress) {
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
    {/* <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithGoogle} >(Link with Google)</span> */ }

    return (
        <LayoutWrapper>
            <TabHeaderBar data={[
                { href: '/account', label: 'Info' },
                { href: '/account/wallet', label: 'Wallet' },
                { href: '/account/avatar', label: 'Avatars' },
                { href: '/account/events', label: 'Events' },
                { href: '/account/templates', label: 'Worlds' },
                { href: '/account/items', label: 'Items' },
                { href: '/account/settings', label: 'Settings' }
            ]} />
            <section id="section-content" className="flex flex-row gap-4">
                <h3 className="section-header-lg pl-4">Settings</h3>
                <div className="flex flex-col gap-2 py-4 w-[400px]">
                    <h5>Name</h5>
                    <InputGroup>
                        <FormControl id="name" required
                            placeholder="Name"
                            aria-label="User Name"
                            value={user?.name}
                            readOnly
                        />
                    </InputGroup>
                    <div className="flex flex-row gap-4">
                        <h5>Wallet Address</h5>
                        {!user?.social_email && user?.wallet_address &&
                            // <span className="text-blue-400 cursor-pointer" onClick={() => login()} >(Link with Google)</span>
                            <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                                onClick={() => onGoogleConnect()}>
                                Link with google
                            </button>
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
                        {!user?.wallet_address && user?.social_email &&
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
        </LayoutWrapper>
    )
}