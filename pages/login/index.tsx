import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import StorageService from "../../data/services/storage_service";
import HomeNavbar from "../../components/home/HomeNavbar";
import { useMetaMask } from "metamask-react";

export default function LoginLink(props) {
    const router = useRouter();
    const { status, connect, account } = useMetaMask();

    useEffect(() => {
        switch (status) {
            case 'notConnected':
                connect();
                break;
            case 'connected':
                //TODO: redirect or something?
                break;
            default:
                break;
        }
    }, [status])

    useEffect(() => {
        if ('key' in router.query) {
            StorageService.setMetamaskSessionKey(router.query.key.toString())
        }
    }, [router])
    return (
        <>
            <HomeNavbar />
            <div className='deverse-background h-[90vh] text-white text-center'>
                Click on Connect Wallet above

            </div>
        </>

    )
}