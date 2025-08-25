import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "@/libs/axios";

export function useMyProfile(userId?: string, enabled = true) {
  return useQuery<any, AxiosError>({
    queryKey: ["my-profile", userId],
    enabled: enabled && !!userId,
    retry: false,
    queryFn: async () => (await api.get(`/profiles/${userId}`)).data,
  });
}
