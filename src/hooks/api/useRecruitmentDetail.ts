import api from "@/libs/axios";
import type { PostDetail } from "@/types/api-res-recruitment";
import { useQuery } from "@tanstack/react-query";

export default function useRecruitmentDetail(postId: string) {
  return useQuery<PostDetail>({
    queryKey: ["recruitment", "detail", postId],
    queryFn: async () => {
      const res = await api.get(`/recruiting/${postId}`);

      return res.data;
    },
  });
}
