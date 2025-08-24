import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "@/libs/axios";

export function useMe(enabled = true) {
  return useQuery<{ user_id: string }, AxiosError>({
    queryKey: ["me"],
    enabled,
    retry: false,
    queryFn: async () => (await api.get("/users/me")).data,
  });
}
