import axiosInstance from "./axiosConfig";
export const fetcher = (url) => axiosInstance.get(url).then(res => res.data);
