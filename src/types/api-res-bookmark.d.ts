/* --------------- 북마크 --------------- */
// GET /api/v1/users/me/bookmarks/profiles
interface BookmarkUserList {
  next_cursor: string;
  profiles: (Omit<UserProfile, "is_bookmarked"> & { bookmark_id: string })[];
}
// GET /api/v1/users/me/bookmarks/recruiting-posts
interface BookmarkPostList {
  next_cursor: string;
  posts: (Omit<Post, "is_bookmarked"> & { bookmark_id: string })[];
}
