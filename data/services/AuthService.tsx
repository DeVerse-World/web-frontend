import { GoogleUser, User, UserType } from "../model/user";
import jwt_decode from "jwt-decode";
import { ethers } from "ethers";
import StorageService from "./StorageService";
import AccountService from "./AccountService";
import deverseClient from "../api/deverse_client";
import { Response, GetAccountResponse, LoginResponse } from "../model/response";
import { BaseService } from "./BaseService";

class AuthService extends BaseService {
    async authorizeLoginLinkWithUserToken(session_key: string) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`user/authLoginLink`, {
            session_key: session_key,
        }, {
            withCredentials: true
        })
        return this.parseResponse(res)
    }

    async connectToGoogleMail(googleAccessToken: string, user: User) {
        const googleRes = await deverseClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`, {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
                Accept: 'application/json'
            }
        })
        const googleUser : GoogleUser = googleRes.data;
        if (!user) {
            let res = await AccountService.getOrCreateByGoogleMail(StorageService.getSessionKey(), googleUser.email, googleAccessToken)
            if (res.status != 200 || !res.data.data.require_auth) {
                return this.parseResponse(res)
            }
        }
        let resData = await this.authLoginLinkForGoogleMail(googleUser.email, googleAccessToken)
        if (user && user.social_email == "") {
            let res = await AccountService.addUserModelWithGoogleMail(googleUser.email)
            if (res.isFailure()) {
                return res;
            }
        }
        return resData;
    }

    async authLoginLinkForGoogleMail(google_email: string, google_token: string) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`user/authLoginLink`, {
            login_mode: "GOOGLE",
            session_key: StorageService.getSessionKey(),
            google_token: google_token,
            google_email: google_email,
        }, {
            withCredentials: true
        })
        return this.parseResponse(res)
    }

    async connectToMetamask(metamaskAccount: string, user: User, sessionKey?: string) {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        if (sessionKey) {
            StorageService.setSessionKey(sessionKey)
        }
        const loginKey = StorageService.getSessionKey()
        if (!user) {
            let res = await AccountService.getOrCreateByWallet(loginKey, metamaskAccount);
            let parsedRes = this.parseResponse(res);
            if (res.status != 200 || !parsedRes.value.require_auth) {
                return parsedRes
            }
            user = parsedRes.value.user;
        }
        let signature = await web3.getSigner().signMessage(`I am signing my one-time nonce: ${user.wallet_nonce}`)
        let resData = await this.authLoginLinkForMetamask(loginKey, metamaskAccount, signature)
        StorageService.saveWalletAddress(metamaskAccount);
        if (user.wallet_address == "") {
            let res = await AccountService.addUserModelWithWallet(user.id, metamaskAccount)
            if (res.status != 200) {
                return this.parseResponse(res);
            }
        }
        return resData;
    }

    async authLoginLinkForMetamask(session_key, wallet_address, signature) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`user/authLoginLink`, {
            login_mode: "METAMASK",
            session_key: session_key,
            wallet_address: wallet_address,
            wallet_signature: signature,
        }, {
            withCredentials: true
        })
        return this.parseResponse(res);
    }

    async connectToSteam() {
        console.log("Connect to Steam");
        console.log(`${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/pages/user/steam_login?session_key=${StorageService.getSessionKey()}`);
        window.open(window.location.origin + "/login", "_self")
        window.open(
            `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/pages/user/steam_login?session_key=${StorageService.getSessionKey()}`,
            "_blank",
            "width=800, height=600",
        );
        window.alert("Refresh this page after signing in Steam");
    }

    async logout() {
        const res = await deverseClient.post<Response<any>>(`user/logout`, null, {
            withCredentials: true
        })
        return this.parseResponse(res)
    }

    parseUserFromToken() {

    }

    async refreshToken() {

    }
}

export default new AuthService();