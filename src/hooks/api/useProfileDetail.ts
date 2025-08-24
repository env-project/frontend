import { useQuery } from "@tanstack/react-query";
import { fetchProfileDetail, type RawProfileDetail } from "@/api/fetchProfileDetail";

export function useProfileDetail(userId?: string, enabled = true) {
  return useQuery<RawProfileDetail>({
    queryKey: ["profile-detail", userId],
    enabled: enabled && !!userId,
    queryFn: () => fetchProfileDetail(userId!),
  });
}
