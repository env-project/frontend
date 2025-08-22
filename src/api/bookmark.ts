import api from "@/libs/axios";
import type { BookmarkPostList, BookmarkUserList } from "@/types/api-res-bookmark";

/** 내가 북마크한 게시글 */
export async function fetchMyBookmarkPosts(limit = 4): Promise<BookmarkPostList> {
  try {
    const { data: body } = await api.get("/users/me/bookmarks/recruiting-posts", {
      params: { limit },
    });
    return {
      next_cursor: body?.next_cursor ?? "",
      posts: Array.isArray(body?.posts) ? body.posts : [],
    };
  } catch (err: any) {
    return { next_cursor: "", posts: [] };
  }
}

/** 내가 북마크한 사용자 */
export async function fetchMyBookmarkProfiles(limit = 4): Promise<BookmarkUserList> {
  try {
    const { data: body } = await api.get("/users/me/bookmarks/profiles", { params: { limit } });
    return {
      next_cursor: body?.next_cursor ?? "",
      profiles: Array.isArray(body?.profiles) ? body.profiles : [],
    };
  } catch (err: any) {
    return { next_cursor: "", profiles: [] };
  }
}
