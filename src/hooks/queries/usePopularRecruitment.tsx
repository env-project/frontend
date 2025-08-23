import api from "@/libs/axios";
import type { PostList } from "@/types/api-res-recruitment";
import { useQuery } from "@tanstack/react-query";

interface useRecruitmentOptions {
  sortBy?: string;
  limit?: number;
}

export function usePopularRecruitment({
  sortBy = "views",
  limit = 20,
}: useRecruitmentOptions = {}) {
  return useQuery<PostList>({
    queryKey: ["recruitment-list", { sortBy, limit }],
    queryFn: async () => {
      const res = await api.get("/recruiting", {
        params: {
          sort_by: sortBy,
          limit,
        },
      });
      return res.data;
    },
  });
}
