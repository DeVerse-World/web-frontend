import { GoogleUser, User, UserType } from "../model/user";
import jwt_decode from "jwt-decode";
import { ethers } from "ethers";
import StorageService from "./StorageService";
import AccountService from "./AccountService";
import deverseClient from "../api/deverse_client";
import { Response, GetAccountResponse, LoginResponse } from "../model/response";
import { BaseService } from "./BaseService";

class AuthService extends BaseService {
    async connectToGoogleMail(credential: string, user: User) {
        const googleUser = jwt_decode<GoogleUser>(credential);
        if (!user) {
            let res = await AccountService.getOrCreateByGoogleMail(StorageService.getSessionKey(), googleUser.email, credential)
            if (res.status != 200 || !res.data?.data?.require_auth) {
                return this.parseResponse(res)
            }
        } else {
            let res = await AccountService.addUserModelWithGoogleMail(user.id, googleUser.email)
            if (res.status != 200 || !res.data?.data?.require_auth) {
                return this.parseResponse(res)
            }
        }
        let resData = await this.authLoginLinkForGoogleMail(StorageService.getSessionKey(), googleUser.email, credential)
        return resData;
    }

    async authLoginLinkForGoogleMail(session_key: string, google_email: string, google_token: string) {
        const res = await deverseClient.post<Response<GetAccountResponse>>(`user/authLoginLink`, {
            login_mode: "GOOGLE",
            session_key: session_key,
            google_token: google_token,
            google_email: google_email,
        }, {
            withCredentials: true
        })
        return this.parseResponse(res)
    }

    async authorizeWithLoginLink() {
        const res = await deverseClient.post<LoginResponse>('user/createLoginLink');
        if (res.status != 200) {
            return null;
        }
        const loginUrl = new URL(res.data.login_url);
        const loginKey = loginUrl.searchParams.get('key')
        StorageService.setSessionKey(loginKey)
        return loginUrl;
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
            if (res.status != 200 || !parsedRes.value?.require_auth) {
                return parsedRes
            }
            user = parsedRes.value?.user;
        } else {
            let res = await AccountService.addUserModelWithWallet(user.id, metamaskAccount)
            if (res.status != 200) {
                return this.parseResponse(res);
            }
        }
        console.log(`I am signing my one-time nonce: ${user.wallet_nonce}`)
        let signature = await web3.getSigner().signMessage(`I am signing my one-time nonce: ${user.wallet_nonce}`)
        let resData = await this.authLoginLinkForMetamask(loginKey, metamaskAccount, signature)
        StorageService.saveWalletAddress(metamaskAccount);
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