import { useQuery } from "@tanstack/react-query";
import { fetchMyBookmarkPosts, fetchMyBookmarkProfiles } from "@/api/bookmark";
import type { BookmarkPostList, BookmarkUserList } from "@/types/api-res-bookmark";

export function useMyBookmarks(enabled: boolean) {
  const bookmarkPostsQuery = useQuery<BookmarkPostList>({
    queryKey: ["my-bookmark-posts", 4],
    enabled,
    queryFn: () => fetchMyBookmarkPosts(4),
  });

  const bookmarkUsersQuery = useQuery<BookmarkUserList>({
    queryKey: ["my-bookmark-users", 4],
    enabled,
    queryFn: () => fetchMyBookmarkProfiles(4),
  });

  return { bookmarkPostsQuery, bookmarkUsersQuery };
}
