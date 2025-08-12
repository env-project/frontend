import { UserProfile } from "@/types/api-res-profile";
import { Post } from "@/types/api-res-recruitment";

/* --------------- 북마크 --------------- */
// GET /api/v1/users/me/bookmarks/profiles
export interface BookmarkUserList {
  next_cursor: string;
  profiles: (Omit<UserProfile, "is_bookmarked"> & { bookmark_id: string })[];
}
// GET /api/v1/users/me/bookmarks/recruiting-posts
export interface BookmarkPostList {
  next_cursor: string;
  posts: (Omit<Post, "is_bookmarked"> & { bookmark_id: string })[];
}
