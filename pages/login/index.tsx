import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import StorageService from "../../data/services/StorageService";
import { useMetaMask } from "metamask-react";
import AuthService from "../../data/services/AuthService";
import Footer from "../../components/common/Footer";
import Sidebar from "../../components/Sidebar";
import { AppContext } from "../../components/contexts/app_context";

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
    const { setUser } = useContext(AppContext);
    const { status, connect, account } = useMetaMask();
    const [connectionStatus, setConnectionStatus] = useState('Processing...');
    useEffect(() => {
        switch (status) {
            case 'notConnected':
                if (loginKey) {
                    connect();
                    setConnectionStatus('Processing...');
                } else {
                    setConnectionStatus('Please provide a login key');
                }
                break;
            case 'connected':
                setConnectionStatus("Authenticated");
                AuthService.connectToMetamask(account, null, loginKey).then(res => {
                    if (res.isSuccess()) {
                        setUser(res.value.user)
                    }
                });
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