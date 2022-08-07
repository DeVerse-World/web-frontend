import { GoogleUser, User, UserType } from "../model/user";
import jwt_decode from "jwt-decode";

class AuthService {
    login() {

    }
    onGoogleLogin(credential: string): User {
        let googleUser = jwt_decode<GoogleUser>(credential);
        let user: User = {
            id: googleUser.sub,
            name: googleUser.name,
            avatar: googleUser.picture,
            email: googleUser.email,
            userType: UserType.GOOGLE
        };
        return user
    }
}

export default new AuthService();