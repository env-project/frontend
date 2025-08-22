import api from "@/libs/axios";
import type { CommentList } from "@/types/api-res-comment";
import { useQuery } from "@tanstack/react-query";

export default function useComment(postId: string) {
  return useQuery<CommentList>({
    queryKey: ["comment", postId],
    queryFn: async () => {
      const res = await api.get("/comments", { params: { post_id: postId } });

      return res.data;
    },
  });
}
