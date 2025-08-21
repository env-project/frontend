import { useQuery } from "@tanstack/react-query";
import api from "@/libs/axios";
import type { MyUserInfo } from "@/types/api-res-profile";
import type { AxiosResponse } from "axios";

async function fetchUserInfo(): Promise<AxiosResponse<MyUserInfo>> {
  const res = await api.get<MyUserInfo>("/users/me");
  return res;
}

export function useUserInfo() {
  const { data: res, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
  });

  if (status === "success") {
    return res.data;
  } else {
    return false;
  }
}
