import axios from "axios";

const graphClient = axios.create({
    baseURL: `${process.env.GRAPH_URL}`
});

export default graphClient;