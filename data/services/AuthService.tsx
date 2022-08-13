import { GoogleUser, User, UserType } from "../model/user";
import jwt_decode from "jwt-decode";
import {ethers} from "ethers";
import StorageService from "./StorageService";
import AccountService from "./AccountService";
import deverseClient from "../api/deverse_client";
import {Response, GetAccountResponse} from "../model/response";

class AuthService {
    async connectToGoogleMail(credential: string, user): Promise<any> {
        let googleUser = jwt_decode<GoogleUser>(credential);
        if (!user) {
            let res = await AccountService.getOrCreateByGoogleMail(StorageService.getSessionKey(), googleUser.email, credential)
            if (res.status != 200) {
                return null
            }
            if (!res.data.data.require_auth) {
                return res.data;
            }
        } else {
            let res = await AccountService.addUserModelWithGoogleMail(user.id, googleUser.email)
            if (res.status != 200) {
                return res.data
            }
        }
        let resData = await this.authLoginLinkForGoogleMail(StorageService.getSessionKey(), googleUser.email, credential)
        return resData;
    }

    async authLoginLinkForGoogleMail(session_key: string, google_email: string, google_token: string) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`/user/authLoginLink`, {
                login_mode: "GOOGLE",
                session_key: session_key,
                google_token: google_token,
                google_email: google_email,
            }, {
                withCredentials: true
            }
        )
        if (res.status != 200) {
            return null
        }
        return res.data
    }

    async connectToMetamask(metamaskAccount: string, user): Promise<any> {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        if (!user) {
            let res = await AccountService.getOrCreateByWallet(StorageService.getSessionKey(), metamaskAccount);
            if (res.status != 200) {
                return null
            }
            if (!res.data.data.require_auth) {
                return res.data;
            }
            user = res.data.data.user;
        } else {
            let res = await AccountService.addUserModelWithWallet(user.id, metamaskAccount)
            if (res.status != 200) {
                return res.data
            }
        }
        let signature = await web3.getSigner().signMessage(`I am signing my one-time nonce: ${user.wallet_nonce}`)
        let resData = await this.authLoginLinkForMetamask(StorageService.getSessionKey(), metamaskAccount, signature)
        StorageService.saveWalletAddress(metamaskAccount);
        return resData;
    }

    async authLoginLinkForMetamask(session_key, wallet_address, signature) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`/user/authLoginLink`, {
                login_mode: "METAMASK",
                session_key: session_key,
                wallet_address: wallet_address,
                wallet_signature: signature,
            }, {
                withCredentials: true
            }
        )
        if (res.status != 200) {
            return null
        }
        return res.data
    }

    async logout() {
        const res = await deverseClient.post(`/user/logout`, {}, {
                withCredentials: true
            }
        )
        if (res.status != 200) {
            return false
        }
        return true
    }

    parseUserFromToken() {

    }

    async refreshToken() {

    }
}

export default new AuthService();