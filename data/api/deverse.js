import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/api`
});

export default instance;
