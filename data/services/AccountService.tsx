import { ethers } from "ethers";
import deverseClient from "../api/deverse_client";
import { DataFilter } from "../enum/data_filter";
import { TimeFilter } from "../enum/time_filter";
import { StatisticLog } from "../model/profile_info";
import { AvatarResponse, GetAvatarResponse, GetAccountResponse, Response, GetUserProfileResponse } from "../model/response";
import { Failure, Result, Success } from "../model/Result";
import { BaseService } from "./BaseService";

class AccountService extends BaseService {
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
    async addUserModelWithGoogleMail(google_email: string) {
        const res = await deverseClient.put<Response<GetAccountResponse>>(`user/profile`, {
            google_email: google_email,
        }, {
            withCredentials: true
        });
        return this.parseResponse(res);
    }

    async getUserInfo(): Promise<Result<GetUserProfileResponse>> {
        let response = await deverseClient.get<Response<GetUserProfileResponse>>(`user/profile`, {
            withCredentials: true
        });
        return this.parseResponse<GetUserProfileResponse>(response);
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
            case DataFilter.ONLINE:
                data = [
                    { count: 36, timestamp: 1649065872015 },
                    { count: 120, timestamp: 1651657872015 },
                    { count: 16, timestamp: 1654336272015 },
                    { count: 65, timestamp: 1656928272015 },
                ]
                break;
            case DataFilter.OFFLINE:

                data = [
                    { count: 128, timestamp: 1649065872015 },
                    { count: 138, timestamp: 1651657872015 },
                    { count: 200, timestamp: 1654336272015 },
                    { count: 156, timestamp: 1656928272015 },
                ]
                break;
            case DataFilter.REVENUE:
                data = [
                    { count: 48, timestamp: 1651338000000 },
                    { count: 120, timestamp: 1651424400000 },
                    { count: 16, timestamp: 1651510800000 },
                    { count: 64, timestamp: 1651597200000 },
                    { count: 32, timestamp: 1651683600000 },
                    { count: 32, timestamp: 1651770000000 },
                    { count: 95, timestamp: 1651856400000 },
                    { count: 58, timestamp: 1651942800000 },
                    { count: 121, timestamp: 1652029200000 },
                    { count: 95, timestamp: 1652115600000 },
                    { count: 12, timestamp: 1652202000000 },
                    { count: 84, timestamp: 1652288400000 },
                    { count: 93, timestamp: 1652374800000 },
                    { count: 46, timestamp: 1652461200000 },
                    { count: 32, timestamp: 1652547600000 },
                    { count: 61, timestamp: 1652634000000 },
                    { count: 95, timestamp: 1652720400000 },
                    { count: 247, timestamp: 1652806800000 },
                    { count: 95, timestamp: 1652893200000 },
                    { count: 23, timestamp: 1652979600000 },
                    { count: 95, timestamp: 1653066000000 },
                    { count: 124, timestamp: 1653152400000 },
                    { count: 6, timestamp: 1653238800000 },
                    { count: 412, timestamp: 1653325200000 },
                    { count: 83, timestamp: 1653411600000 },
                    { count: 53, timestamp: 1653498000000 },
                    { count: 324, timestamp: 1653584400000 },
                    { count: 31, timestamp: 1653670800000 },
                    { count: 51, timestamp: 1653757200000 },
                    { count: 83, timestamp: 1653843600000 },
                    { count: 17, timestamp: 1653930000000 },
                ]
                break;
            default:
                break;
        }

        return data;
    }
}

export default new AccountService();