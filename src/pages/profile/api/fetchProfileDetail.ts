import { mockProfiles } from "@/Mocks/mockProfiles";
import type { PublicUserProfileDetail, PrivateUserProfileDetail } from "@/types/api-res-profile";

/** 실제 API가 준비되기 전까지 사용하는 더미 fetcher */
export async function fetchProfileDetail(
  userId: string
): Promise<PublicUserProfileDetail | PrivateUserProfileDetail> {
  // 실제 API에서는 `await axios.get(...)` 등으로 대체
  await new Promise((r) => setTimeout(r, 300)); // 모의 지연

  const base = mockProfiles.find((p) => p.user_id === userId);
  if (!base) {
    throw new Error("NOT_FOUND");
  }

  const is_public = true; // 필요시 조건으로 비공개 처리 가능

  if (!is_public) {
    const detail: PrivateUserProfileDetail = {
      ...base,
      is_public: false,
    };
    return detail;
  }

  // 더미 최근 게시글/댓글 생성
  const now = Date.now();
  const recent_posts = Array.from({ length: 3 }).map((_, i) => ({
    id: `post_${i + 1}`,
    title: `${base.nickname}의 게시글 ${i + 1}`,
    created_at: new Date(now - (i + 1) * 36e5).toISOString(),
  }));

  const recent_comments = Array.from({ length: 5 }).map((_, i) => ({
    id: `comment_${i + 1}`,
    content: `최근 댓글 내용 ${i + 1}`,
    created_at: new Date(now - (i + 1) * 18e5).toISOString(),
    post: { id: `post_${i + 1}`, title: `연결된 게시글 ${i + 1}` },
  }));

  const detail: PublicUserProfileDetail = {
    ...base,
    is_public: true,
    recent_posts,
    recent_comments,
  };

  return detail;
}
