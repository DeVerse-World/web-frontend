import axios from "../api/axios";
import { DataFilter } from "../enum/data_filter";
import { TimeFilter } from "../enum/time_filter";
import { StatisticLog } from "../model/profile_info";

class WalletService {
    async getOrCreateWallet(session_key: string, wallet_address: string) {
        const response = await axios({
            method: "post",
            url: `/wallet/getOrCreate`,
            data: {
                address: wallet_address,
                session_key: session_key
            },
            withCredentials: true
        });
        return response.data;
    }

    async authMetamask(wallet_address: string, signature: string) {
        const response = await axios({
            method: "post",
            url: `/wallet/auth`,
            data: {
                address: wallet_address,
                signature: signature,
            },
            withCredentials: true
        });
        return response.data;
    }

    async authLoginLink(session_key, wallet_address, signature) {
        const response = await axios({
            method: "post",
            url: `/wallet/authLoginLink`,
            data: {
                session_key: session_key,
                address: wallet_address,
                signature: signature
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