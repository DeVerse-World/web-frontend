import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import StorageService from "../../data/services/StorageService";
import { useMetaMask } from "metamask-react";
import AuthService from "../../data/services/AuthService";
import Footer from "../../components/common/Footer";
import Sidebar from "../../components/Sidebar";

export async function getServerSideProps(context) {
    const loginKey = context.query.key;
    // Fetch data from external API

    // Pass data to the page via props
    return {
        props: {
            loginKey: loginKey
        }
    }
}

export default function LoginLink({ loginKey }) {
    const { status, connect, account } = useMetaMask();
    const [connectionStatus, setConnectionStatus] = useState('Processing...');
    useEffect(() => {
        switch (status) {
            case 'notConnected':
                if (loginKey) {
                    StorageService.setSessionKey(loginKey)
                    connect().then(res => {
                        console.log(res)
                    });
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
    }, [status])

    return (
        <section id='section-content' className='flex flex-col text-white justify-between '>
            <div className="text-center m-auto">
                <h1>{connectionStatus}</h1>
            </div>
            <Footer />
        </section>
    )
}