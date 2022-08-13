import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import StorageService from "../../data/services/StorageService";
import { useMetaMask } from "metamask-react";
import AuthService from "../../data/services/AuthService";

export default function LoginLink(props) {
    const router = useRouter();
    const { status, connect, account } = useMetaMask();

    useEffect(() => {
        switch (status) {
            case 'notConnected':
                connect();
                break;
            case 'connected':
                AuthService.connectToMetamask(account, null);
                break;
            default:
                break;
        }
    }, [status])

    const getMsg = () => {
        let text = "Authenticated";
        switch (status) {
            case 'notConnected':
                text = "Click on Connect Wallet above"
                break;
            case 'connected':
                text = "Authenticated"
                break;
            default:
                text = "Processing...";
                break;
        }
        return text;
    }

    useEffect(() => {
        if ('key' in router.query) {
            StorageService.setSessionKey(router.query.key.toString())
        }
    }, [router])
    return (
        <>
            <div className='bg-deverse h-[90vh] text-white text-center'>
                {getMsg()}

            </div>
        </>

    )
}