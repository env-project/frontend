import type { Post } from "@/types/api-res-recruitment";

export type ApiComment = {
  id: string;
  content: string;
  created_at: string;
  post: Pick<Post, "id" | "title"> & { created_at?: string };
};

export type CommentsListResponse = {
  next_cursor: string | null;
  comments: ApiComment[];
};

// 응답 포맷이 문서/서버 버전에 따라 다를 수 있어 안전 파서로 처리
function normalizeComments(body: any): CommentsListResponse {
  // 1) { next_cursor, comments: [...] }
  if (body && Array.isArray(body.comments)) {
    return {
      next_cursor: body.next_cursor ?? null,
      comments: body.comments as ApiComment[],
    };
  }
  // 2) 배열만 오는 경우
  if (Array.isArray(body)) {
    return { next_cursor: null, comments: body as ApiComment[] };
  }
  // 3) 알 수 없는 경우
  return { next_cursor: null, comments: [] };
}

export async function fetchUserCommentsByAuthor(
  userId: string,
  limit = 10
): Promise<CommentsListResponse> {
  const url = new URL("/api/v1/comments", window.location.origin);
  url.searchParams.set("author", userId);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch user's comments");

  const body = await res.json();
  return normalizeComments(body);
}
