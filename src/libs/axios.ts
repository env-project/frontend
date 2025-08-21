import { API_BASE_URL, TOKEN_INFO_KEY } from "@/constants/api-constants";
import type { TokenInfo } from "@/types/api-res-auth";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const tokenStr = localStorage.getItem(TOKEN_INFO_KEY);

  if (tokenStr) {
    const tokenInfo: TokenInfo = JSON.parse(tokenStr);
    config.headers.Authorization = `Bearer ${tokenInfo.access_token}`;
  }

  return config;
});

export default api;
