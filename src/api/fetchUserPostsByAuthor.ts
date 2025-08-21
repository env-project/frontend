import type { Post } from "@/types/api-res-recruitment";

export type RecruitingCursorResponse = {
  next_cursor: string | null;
  posts: Post[];
};

export async function fetchUserPostsByAuthor(
  userId: string,
  limit = 10
): Promise<RecruitingCursorResponse> {
  const url = new URL("/api/v1/recruiting", window.location.origin);
  url.searchParams.set("author", userId);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) throw new Error("게시글을 불러오는데 실패했습니다.");

  const body = await res.json();
  return {
    next_cursor: body?.next_cursor ?? null,
    posts: Array.isArray(body?.posts) ? (body.posts as Post[]) : [],
  };
}
