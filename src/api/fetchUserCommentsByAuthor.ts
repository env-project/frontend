import api from "@/libs/axios";
import type { Comment, CommentList } from "@/types/api-res-comment";

// 응답 포맷이 문서/서버 버전에 따라 다를 수 있어 안전 파서로 처리
function normalizeComments(body: any): CommentList {
  // { next_cursor, comments: [...] }
  if (body && Array.isArray(body.comments)) {
    return {
      next_cursor: body.next_cursor ?? "",
      comments: body.comments as Comment[],
    };
  }
  // 배열만 오는 경우
  if (Array.isArray(body)) {
    return { next_cursor: "", comments: body as Comment[] };
  }
  // 알 수 없는 경우
  return { next_cursor: "", comments: [] };
}

export async function fetchUserCommentsByAuthor(userId: string, limit = 10): Promise<CommentList> {
  const { data: body } = await api.get("/comments", { params: { author: userId, limit } });

  return normalizeComments(body);
}
