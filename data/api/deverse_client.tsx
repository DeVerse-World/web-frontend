import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig<any> = {
    baseURL: `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/api/`,
    // withCredentials: true
}

const deverseClient = axios.create(axiosConfig);

export default deverseClient;