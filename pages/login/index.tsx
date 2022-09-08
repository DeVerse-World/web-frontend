import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import StorageService from "../../data/services/StorageService";
import { useMetaMask } from "metamask-react";
import AuthService from "../../data/services/AuthService";
import Footer from "../../components/common/Footer";
import Sidebar from "../../components/Sidebar";

export default function LoginLink(props) {
    const router = useRouter();
    const { status, connect, account } = useMetaMask();
    const [connectionStatus, setConnectionStatus] = useState('Processing...');
    useEffect(() => {
        if (!router.isReady)
            return;
        switch (status) {
            case 'notConnected':
                if ('key' in router.query) {
                    connect();
                    setConnectionStatus('Processing...');
                } else {
                    setConnectionStatus('Please provide a login key');
                }
                break;
            case 'connected':
                setConnectionStatus("Authenticated");
                AuthService.connectToMetamask(account, null);
                break;
            default:
                break;
        }
    }, [status, router.isReady])

    useEffect(() => {
        if ('key' in router.query) {
            StorageService.setSessionKey(router.query.key.toString())
        }
    }, [router.query])
    return (
        <div className='flex flex-row bg-deverse '>
            <section id='section-content' className='flex flex-col text-white justify-between '>
                <div className="text-center m-auto">
                    <h1>{connectionStatus}</h1>
                </div>
                <Footer />
            </section>
        </div>
    )
}