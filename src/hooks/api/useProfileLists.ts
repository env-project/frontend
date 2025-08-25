import { useQuery } from "@tanstack/react-query";
import { fetchUserPostsByAuthor } from "@/api/fetchUserPostsByAuthor";
import { fetchUserCommentsByAuthor } from "@/api/fetchUserCommentsByAuthor";
import type { PostList } from "@/types/api-res-recruitment";
import type { CommentList } from "@/types/api-res-comment";

export function useProfileLists(resolvedUserId: string | null, canShowLists: boolean) {
  const postsQuery = useQuery<PostList>({
    queryKey: ["profile-posts", resolvedUserId],
    enabled: !!resolvedUserId && canShowLists,
    queryFn: () => fetchUserPostsByAuthor(resolvedUserId!, 10),
  });

  const commentsQuery = useQuery<CommentList>({
    queryKey: ["profile-comments", resolvedUserId],
    enabled: !!resolvedUserId && canShowLists,
    queryFn: () => fetchUserCommentsByAuthor(resolvedUserId!, 10),
  });

  return { postsQuery, commentsQuery };
}
