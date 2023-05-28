import { useContext, useEffect, useState } from "react";
import AuthService from "../../data/services/AuthService";
import StorageService from "../../data/services/StorageService";
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

export default function Authorize({ loginKey }) {
    const [connectionStatus, setConnectionStatus] = useState('Please login');
    const { setShowLogin, user, setUser } = useContext(AppContext);
    useEffect(() => {
        if (user) {
            console.log("USER EXISTED\n");
            AuthService.authorizeLoginLinkWithUserToken(loginKey).then(res => {
                if (res.isFailure()) {
                    window.alert(res.error);
                    return;
                }
                setConnectionStatus("Authenticated");
            })
        } else {
            console.log("USER NOT EXISTED\n");
            AuthService.authorizeLoginLinkWithUserToken(loginKey).then(res => {
                if (res.isFailure()) {
                    // window.alert(res.error);
                    console.log(res.error);
                    return;
                }
                setUser(res.value.user);
                setConnectionStatus("Authenticated");
            })
            setConnectionStatus("Please login...");
        }
    }, [user])

    useEffect(() => {
        const currentUser = StorageService.getUser()
        console.log("currentUser", currentUser);
        console.log(loginKey);
        if (loginKey) {
            StorageService.setSessionKey(loginKey)
        }
        if (!currentUser) {
            setShowLogin(true);
        }
    }, [])

    return (
        <div id="section-content" className="text-center m-auto text-white h-full">
            <h1>{connectionStatus}</h1>
        </div>
    )
}