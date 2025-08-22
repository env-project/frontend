import api from "@/libs/axios";
import type { Post } from "@/types/api-res-recruitment";

export type RecruitingCursorResponse = {
  next_cursor: string | null;
  posts: Post[];
};

export async function fetchUserPostsByAuthor(
  userId: string,
  limit = 10
): Promise<RecruitingCursorResponse> {
  const { data: body } = await api.get("/recruiting", { params: { author: userId, limit } });

  return {
    next_cursor: body?.next_cursor ?? null,
    posts: Array.isArray(body?.posts) ? (body.posts as Post[]) : [],
  };
}
