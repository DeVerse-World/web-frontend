import { ethers } from "ethers";
import deverseClient from "../api/deverse_client";
import { DataFilter } from "../enum/data_filter";
import { TimeFilter } from "../enum/time_filter";
import { StatisticLog } from "../model/profile_info";
import { WalletCreationResponse } from "../model/WalletCreationResponse";
import StorageService from "./StorageService";

class WalletService {
    async getOrCreateWallet(session_key: string, wallet_address: string) {
        return deverseClient.post<WalletCreationResponse>('/user/getOrCreate', {
            login_mode: "METAMASK",
            wallet_address: wallet_address,
            session_key: session_key
        }, {
            withCredentials: true
        })
    }

    async connectToMetamask(metamaskAccount: string) : Promise<any> {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        let res = await this.getOrCreateWallet(StorageService.getMetamaskSessionKey(), metamaskAccount);
        if (res.data.wallet_nonce) {
            let signature = await web3.getSigner().signMessage(`I am signing my one-time nonce: ${res.data.wallet_nonce}`)
            this.authLoginLink(StorageService.getMetamaskSessionKey(), metamaskAccount, signature)
            // await authMetamask(account, signature);
            // if (localStorage.getItem("session_key")) {
            
            // }
            StorageService.saveWalletAddress(metamaskAccount);
            return res.data;
        } else {
            return null
        }
    }

    async authMetamask(wallet_address: string, signature: string) {
        const response = await deverseClient({
            method: "post",
            url: `/user/auth`,
            data: {
                login_mode: "METAMASK",
                wallet_address: wallet_address,
                wallet_signature: signature,
            },
            withCredentials: true
        });
        return response.data;
    }

    async authLoginLink(session_key, wallet_address, signature) {
        const response = await deverseClient({
            method: "post",
            url: `/user/authLoginLink`,
            data: {
                login_mode: "METAMASK",
                session_key: session_key,
                wallet_address: wallet_address,
                wallet_signature: signature
            },
            withCredentials: true
        });
        return response.data;
    }

    async getStats(dataType: DataFilter, timeType: TimeFilter): Promise<StatisticLog[]> {
        let data: StatisticLog[] = [];

        switch (dataType) {
            case DataFilter.ACTIVITIES:
                data = [
                    { count: 36, timestamp: 1649065872015 },
                    { count: 120, timestamp: 1651657872015 },
                    { count: 16, timestamp: 1654336272015 },
                    { count: 65, timestamp: 1656928272015 },
                ]
                break;
            case DataFilter.STAKING_BALANCE:

                data = [
                    { count: 128, timestamp: 1649065872015 },
                    { count: 138, timestamp: 1651657872015 },
                    { count: 200, timestamp: 1654336272015 },
                    { count: 156, timestamp: 1656928272015 },
                ]
                break;
            case DataFilter.TIME_SPENT:
                data = [
                    { count: 48, timestamp: 1649065872015 },
                    { count: 120, timestamp: 1651657872015 },
                    { count: 16, timestamp: 1654336272015 },
                    { count: 95, timestamp: 1656928272015 },
                ]
                break;
            default:
                break;
        }

        return data;
    }
}

export default new WalletService();