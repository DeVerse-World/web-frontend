import { useContext, useEffect, useState } from "react";
import AuthService from "../../data/services/AuthService";
import { AppContext } from "../../components/contexts/app_context";
import Image from "next/image";
import { useMetaMask } from "metamask-react";
// import {CredentialResponse, GoogleLogin, useGoogleLogin} from "@react-oauth/google";
import { useRouter } from "next/router";
import StorageService from "../../data/services/StorageService";
import GoogleOAuth from "../../components/oauth";

export async function getServerSideProps(context) {
    return {
        props: {
            loginKey: context.query.key || '',
            previousPath: context.req.headers.referer || ''
        }
    }
}

export default function Login({ loginKey, previousPath }) {
    const router = useRouter();
    const { user, setUser } = useContext(AppContext);
    const { status, connect, account } = useMetaMask();
    const redirectPath = previousPath || '/';

    // Auto-redirect if user already logged in
    useEffect(() => {
        if (loginKey) {
            StorageService.setSessionKey(loginKey)
        }

        // Navigate back to home if user login
        if (user) {
            if (loginKey) {
                AuthService.authorizeLoginLinkWithUserToken(loginKey).then(res => {
                    if (res.isFailure()) {
                        console.error(res.error);
                        return;
                    }
                    // window.alert('Authorized!')
                    router.replace(redirectPath)
                }).catch(err => {
                    window.alert(err)
                })
            } else {
                router.replace(redirectPath)
            }
        }
    }, [user])

    // Auto-redirect if user is already logged in via Metamask
    useEffect(() => {
        if (account && user) {
            router.replace(redirectPath)
        }
    }, [account])

    const onMetamaskConnect = () => {
        if (status == "unavailable") {
            window.alert('Metamask is unavailable. Please install/enable metamask extension in your browser and try again.')
            return;
        }
        connect().then(res => {
            if (res && res.length > 0) {
                AuthService.connectToMetamask(res[0], user, loginKey).then(res => {
                    if (res.isFailure()) {
                        window.alert('Unabled to link with Metamask account');
                        return;
                    }
                    setUser(res.getValue().user)
                });
            } else {
                alert('Something wrong happened')
            }

        }).catch(err => {
            alert(err)
        });
    }

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

    const onSteamConnect = () => {
        AuthService.connectToSteam();
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h1>Signin/Signup</h1>
            <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2"
                onClick={onMetamaskConnect}>
                <Image width={32} height={32} alt="metamask-icon" src="/images/metamask.webp" />
                Metamask
            </button>
            {/*<button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2"*/}
            {/*    onClick={() => onGoogleLogin}>*/}
            {/*    <Image width={32} height={32} alt="google-icon" src="/images/google.webp" />*/}
            {/*    Google*/}
            {/*</button>*/}
            <GoogleOAuth />
            {/*<button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient rounded-sm p-2 my-2"*/}
            {/*    onClick={onSteamConnect}>*/}
            {/*    <Image width={32} height={32} alt="steam-icon" src="/images/steam_logo.png" />*/}
            {/*    Steam*/}
            {/*</button>*/}
        </div>
    )
}