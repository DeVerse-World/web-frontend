import axios from "./axios";

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
}

export default new WalletService();