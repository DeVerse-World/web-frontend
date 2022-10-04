import { useContext, useEffect, useState } from "react";
import StorageService from "../../data/services/StorageService";
import Footer from "../../components/common/Footer";
import { AppContext } from "../../components/contexts/app_context";

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

export default function LoginLink({ loginKey }) {
    const [connectionStatus, setConnectionStatus] = useState('Please login');
    const { setShowLogin, user } = useContext(AppContext);
    useEffect(() => {
        if (user) {
            setConnectionStatus("Authenticated");
        } else {
            setConnectionStatus("Please login...");
        }
    }, [user])

    useEffect(() => {
        const currentUser = StorageService.getUser()
        if (!currentUser) {
            if (loginKey) {
                StorageService.setSessionKey(loginKey)
            }
            setShowLogin(true);
        }
    }, [])

    return (
        <section id='section-content' className='flex flex-col text-white justify-between '>
            <div className="text-center m-auto">
                <h1>{connectionStatus}</h1>
            </div>
            <Footer />
        </section>
    )
}