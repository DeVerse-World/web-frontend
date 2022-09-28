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
    const { user, setUser, setShowLogin } = useContext(AppContext);
    const [connectionStatus, setConnectionStatus] = useState('Please login');
    useEffect(() => {
        console.log("HERE");
        console.log(user);
        if (!user) {
            if (loginKey) {
                StorageService.setSessionKey(loginKey)
            }
            setShowLogin(true);
        } else {
            setConnectionStatus("Authenticated");
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