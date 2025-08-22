import api from "@/libs/axios";
import type { Post, PostList } from "@/types/api-res-recruitment";

export async function fetchUserPostsByAuthor(userId: string, limit = 10): Promise<PostList> {
  const { data: body } = await api.get("/recruiting", { params: { author: userId, limit } });

  return {
    next_cursor: body?.next_cursor ?? "",
    posts: Array.isArray(body?.posts) ? (body.posts as Post[]) : [],
  };
}
