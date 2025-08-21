import { useQuery } from "@tanstack/react-query";
import api from "@/libs/axios";
import type { MyUserInfo } from "@/types/api-res-profile";
import type { AxiosResponse } from "axios";
import { TOKEN_INFO_KEY } from "@/constants/api-constants";

async function fetchUserInfo(): Promise<AxiosResponse<MyUserInfo>> {
  const res = await api.get<MyUserInfo>("/users/me");
  return res;
}

export function useUserInfo() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    enabled: !!localStorage.getItem(TOKEN_INFO_KEY),
    staleTime: 1000 * 60 * 5,
  });
}
