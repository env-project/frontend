import { useQuery } from "@tanstack/react-query";
import api from "@/libs/axios";
import type { MyUserInfo } from "@/types/api-res-profile";

async function fetchUserInfo(): Promise<MyUserInfo> {
  const res = await api.get<MyUserInfo>("/users/me");
  return res.data;
}

export function useUserInfo() {
  return useQuery<MyUserInfo>({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
  });
}
