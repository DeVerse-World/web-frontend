import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.GRAPH_URL}`
});

export default instance;