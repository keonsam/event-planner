import axios from "axios";
import config from ".";
import { getToken } from "../utils/jwt";

const axiosClient = axios.create({
  baseURL: config.apiUrl,
});

axiosClient.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config
});

export default axiosClient;
