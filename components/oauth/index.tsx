import { useContext } from "react";
import {CredentialResponse, GoogleLogin, useGoogleLogin} from "@react-oauth/google";
import AuthService from "../../data/services/AuthService";
import { AppContext } from "../contexts/app_context";

const GoogleOAuth = () => {
    const { user, setUser } = useContext(AppContext);

    const onGoogleLogin = (event: CredentialResponse) => {
        AuthService.connectToGoogleMail(event.credential, user).then(res => {
            // let googleUser = jwt_decode<GoogleUser>(event.credential);
            if (res.isFailure()) {
                window.alert(res.error);
                return;
            }
            setUser(res.value.user);
        });
    }

    return (
        <GoogleLogin width={300} onSuccess={onGoogleLogin} />
    );
}

export default GoogleOAuth;