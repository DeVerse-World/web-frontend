import { useContext, useEffect, useState } from "react";
import AuthService from "../../data/services/AuthService";
import StorageService from "../../data/services/StorageService";
import { AppContext } from "../../components/contexts/app_context";
import LayoutWrapper from "../../components/LayoutWrapper";
import Image from "next/image";
import { useMetaMask } from "metamask-react";
import { useGoogleLogin } from "@react-oauth/google";

export async function getServerSideProps(context) {
    const loginKey = context.query.key;
    // Fetch data from external API

    // Pass data to the page via props
    return {
        props: {
            loginKey: loginKey || ''
        }
    }
}

export default function Login({ loginKey }) {
    const { user, setUser } = useContext(AppContext);
    const { status, connect, account } = useMetaMask();
    const onMetamaskConnect = () => {
        if (status == "unavailable") {
            window.alert('Metamask is unavailable. Please install/enable metamask extension in your browser and try again.')
            return;
        }
        connect();
    }

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

    const onSteamConnect = () => {
        AuthService.connectToSteam();
    }

    return (
        <div className="bg-black w-screen h-screen flex flex-col items-center justify-center text-white">
            <h1>Signin/Signup</h1>
            <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                onClick={onMetamaskConnect}>
                <Image title="metamask" width={32} height={32}
                    alt="metamask-icon" src="/images/metamask.webp" />
                Metamask
            </button>
            <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                onClick={() => onGoogleConnect()}>
                <Image title="steam" width={32} height={32}
                    alt="google-icon" src="/images/google.webp" />
                Google
            </button>
            <button className="flex flex-row gap-2 items-center justify-start w-[300px] bg-deverse-gradient  rounded-sm p-2 my-2"
                onClick={onSteamConnect}>
                <Image title="steam" width={32} height={32}
                    alt="steam-icon" src="/images/steam_logo.png" />
                Steam
            </button>
        </div>
    )
}