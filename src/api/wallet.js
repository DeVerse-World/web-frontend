import axios from "../axios";

export const getOrCreateUser = async (wallet_address) => {
    // const response = await axios({
    //     method: "post",
    //     url: `/users/getOrCreate`,
    //     data: {
    //     wallet_address: wallet_address, 
    //     },
    //     withCredentials: true
    // });
    // return response.data;
}
  
export const authMetamask = async (wallet_address, signature) => {
    // const response = await axios({
    //     method: "post",
    //     url: `/users/auth`,
    //     data: {
    //     wallet_address: wallet_address,
    //     signature: signature,
    //     },
    //     withCredentials: true
    // });  
    // return response.data;
}
