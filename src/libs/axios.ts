import { API_BASE_URL, TOKEN_INFO_KEY } from "@/constants/api-constants";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(TOKEN_INFO_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
