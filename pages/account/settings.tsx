import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useMetaMask } from "metamask-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/contexts/app_context";
import AuthService from "../../data/services/AuthService";
import { usePrevious } from "../../utils/use_previous";
import { TabHeaderBar } from "../../components/common/TabHeader";
import AccountService from "../../data/services/AccountService";
import Button from "../../components/Button";
import GoogleOAuth from "../../components/oauth";

export default function Settings() {
    const { user, setUser } = useContext(AppContext);
    const [currentName, setCurrentName] = useState('');
    const [currentWallet, setCurrentWallet] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const { status, connect, account: walletAddress } = useMetaMask();
    const previousMetamaskState = usePrevious(status);
    useEffect(() => {
        if (user) {
            setCurrentWallet(user.wallet_address || '')
            setCurrentEmail(user.social_email || '')
            setCurrentName(user.name || '')
        }
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

    // const onGoogleConnect = useGoogleLogin({
    //     onSuccess: (codeResponse) => {
    //         AuthService.connectToGoogleMail(codeResponse.access_token, user).then(res => {
    //             if (res.isFailure()) {
    //                 window.alert(res.error);
    //                 return;
    //             }
    //             setUser(res.value.user);
    //         })
    //     },
    //     onError: (error) => window.alert(error)
    // });

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

    const onSubmit = async () => {
        const res = await AccountService.updateUser(currentName);
        let name = user.name;
        if (res && res.data && res.data.data && res.data.data.user && res.data.data.user.name)
            name = res.data.data.user.name;

        const newUser = {
            ...user,
            name,
        };
        setUser(newUser);
    }
    {/* <span className="text-blue-400 cursor-pointer" onClick={onLinkAccountWithGoogle} >(Link with Google)</span> */ }

    return (
        <>
            <TabHeaderBar data={[
                { href: '/account', label: 'Info' },
                // { href: '/account/wallet', label: 'Wallet' },
                { href: '/account/avatar', label: 'Avatars' },
                // { href: '/account/events', label: 'Events' },
                { href: '/account/templates', label: 'Worlds' },
                // { href: '/account/items', label: 'Items' },
                { href: '/account/settings', label: 'Settings' }
            ]} />
            <div className="max-w-7xl mx-auto h-full bg-darkest">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-lightest">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-lighter">
                            Use a name which we can call you.
                        </p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="usernameabc" className="block text-sm font-medium leading-6 text-lightest">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="username"
                                            id="usernameabc"
                                            autoComplete="username"
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            value={currentName}
                                            onChange={evt => setCurrentName(evt.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-lightest">
                                    Wallet
                                </label>
                                <div className="mt-2">
                                    {user && user.wallet_address ? (
                                        <div className="leading-6 text-sm text-lighter">{user && user.wallet_address}</div>
                                    ) : (
                                        <Button
                                            size="textOnly"
                                            tertiary
                                            onClick={onLinkAccountWithMetamask}
                                        >
                                            Link with Metamask
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-lightest">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    {false ? (
                                        <div className="leading-6 text-sm text-lighter">{user.social_email}</div>
                                    ) : (
                                        <GoogleOAuth />
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <Button onClick={onSubmit} primary>
                                Save
                            </Button>
                        </div>
                        
                    </form>
                </div>
            </div>  
        </>
    );
}