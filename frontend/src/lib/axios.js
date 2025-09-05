import axios from "axios";
import {useErrorStore} from "../store/useErrorStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 429) {
            useErrorStore.getState().setMessage("Too many requests, try again later.");
        }
        return Promise.reject(error);
    }
);

export default api;
