import { ethers } from "ethers";
import deverseClient from "../api/deverse_client";
import { DataFilter } from "../enum/data_filter";
import { TimeFilter } from "../enum/time_filter";
import { StatisticLog } from "../model/profile_info";
import { AvatarResponse, GetAvatarResponse, GetAccountResponse, Response, GetUserProfileResponse } from "../model/response";
import { Failure, Result, Success } from "../model/Result";
import StorageService from "./StorageService";

class AccountService {
    async getOrCreateByWallet(session_key: string, wallet_address: string) {
        return deverseClient.post<Response<GetAccountResponse>>('user/getOrCreate', {
            login_mode: "METAMASK",
            wallet_address: wallet_address,
            session_key: session_key
        }, {
            withCredentials: true
        })
    }

    async getOrCreateByGoogleMail(session_key: string, google_email: string, google_token: string) {
        return deverseClient.post<Response<GetAccountResponse>>('user/getOrCreate', {
            login_mode: "GOOGLE",
            google_email: google_email,
            google_token: google_token,
            session_key: session_key
        }, {
            withCredentials: true
        })
    }

    // Will reject if there was another wallet tied to this user before
    async addUserModelWithWallet(user_id: number, wallet_address: string) {
        return deverseClient.put<Response<GetAccountResponse>>(`user/${user_id}`, {
            wallet_address: wallet_address,
        }, {
            withCredentials: true
        })
    }

    // Will reject if there was another google mail tied to this user before
    async addUserModelWithGoogleMail(user_id: number, google_email: string) {
        return deverseClient.put<Response<GetAccountResponse>>(`user/${user_id}`, {
            google_email: google_email,
        }, {
            withCredentials: true
        })
    }

    async getUserInfo(): Promise<Result<GetUserProfileResponse>> {
        let response = await deverseClient.get<Response<GetUserProfileResponse>>(`user/profile`, {
            withCredentials: true
        });
        if (response.status != 200) {
            return new Failure(new Error(response.statusText));
        }
        return new Success(response.data.data);
    }

    // TODO: add more fields
    async updateUser(name: string) {
        return deverseClient.post<Response<GetAccountResponse>>(`user/profile`, {
            name
        }, {
            withCredentials: true
        });
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

export default new AccountService();