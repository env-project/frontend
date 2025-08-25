import { API_BASE_URL, TOKEN_INFO_KEY } from "@/constants/api-constants";
import type { TokenInfo } from "@/types/api-res-auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp?: number };

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ===== 토큰 유틸 =====
function getAccessToken(): string | null {
  const accessToken = localStorage.getItem(TOKEN_INFO_KEY);
  return accessToken;
}
function setAccessToken(accessToken: string) {
  localStorage.setItem(TOKEN_INFO_KEY, accessToken);
}

function willExpireSoon(accessToken: string, skewSecond = 60): boolean {
  try {
    const { exp: expireSecond } = jwtDecode<JwtPayload>(accessToken);

    if (!expireSecond) return true; // exp가 없다면 안전하게 "곧 만료" 취급 -> 사전 refresh
    const currentSecond = Math.floor(Date.now() / 1000);
    return expireSecond - currentSecond <= skewSecond; // 60초 이내면 갱신
  } catch {
    return true; // 디코드 실패 시도 "만료" 취급
  }
}

// ===== refresh 중복 방지 =====
let refreshPromise: Promise<string> | null = null;

async function ensureFreshAccessToken(): Promise<string | null> {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  // 만료 임박하지 않다면 그대로 사용
  if (!willExpireSoon(accessToken)) return accessToken;

  // 이미 다른 요청이 refresh 중이면 그걸 기다림
  if (refreshPromise) return refreshPromise;

  // 새로 refresh 시작
  refreshPromise = (async () => {
    try {
      // 주의: 여기서는 전역 axios(기본 인스턴스) 사용하여 인터셉터 루프 방지
      const { data } = await axios.post<TokenInfo>(
        `${API_BASE_URL}/auth/token/refresh`,
        {},
        { withCredentials: true }
      );

      setAccessToken(data.access_token);
      return data.access_token;
    } catch (e) {
      // refresh 실패 시 로그인 상태 정리
      localStorage.removeItem(TOKEN_INFO_KEY);
      // 필요하면 라우팅
      // window.location.href = "/login";
      throw e;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ===== 요청 인터셉터 =====
api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (!accessToken) return config;

  const refreshedAccessToken = await ensureFreshAccessToken().catch(() => null);
  const finalToken = refreshedAccessToken ?? accessToken;

  if (finalToken) {
    config.headers.Authorization = `Bearer ${finalToken}`;
  }

  return config;
});

export default api;
