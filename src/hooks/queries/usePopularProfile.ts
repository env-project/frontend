import api from "@/libs/axios";
import type { UserList } from "@/types/api-res-profile";
import { useQuery } from "@tanstack/react-query";

interface useProfilesOptions {
  sortBy?: string;
  limit?: number;
}

export function UsePopularProfiles({ sortBy = "views", limit = 20 }: useProfilesOptions = {}) {
  return useQuery<UserList>({
    queryKey: ["popular-Profile-list", { sortBy, limit }],
    queryFn: async () => {
      const res = await api.get("/profiles", {
        params: {
          sort_by: sortBy,
          limit,
        },
      });
      return res.data;
    },
  });
}
