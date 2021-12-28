import axios from "../axios";

export const getOrCreateWallet = async (wallet_address) => {
    const response = await axios({
        method: "post",
        url: `/wallet/getOrCreate`,
        data: {
            address: wallet_address, 
        },
        withCredentials: true
    });
    return response.data;
}

export const authMetamask = async (wallet_address, signature) => {
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
