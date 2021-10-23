import axios from "./axios";

export const getOrCreateWallet = async (session_key, wallet_address) => {
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

export const authLoginLink = async (session_key, wallet_address, signature) => {
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
