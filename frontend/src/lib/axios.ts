import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://musicbackend-f7v7.onrender.com/api"
})