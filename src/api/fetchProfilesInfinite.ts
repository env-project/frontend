import type { ProfilesQuery } from "@/libs/buildProfilesquery";
import { mockProfiles } from "@/Mocks/mockProfiles";
import type { UserProfile } from "@/types/api-res-profile";

/** csv → Set */
const toIdSet = (csv?: string) =>
  new Set(
    (csv ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

/** 프로필 전용 필터 */
function matchesFiltersByQuery(p: UserProfile, q: ProfilesQuery) {
  // 이름
  const nickname = q.nickname?.trim().toLowerCase();
  if (nickname && !p.nickname.toLowerCase().includes(nickname)) return false;
  // 지역
  const regionIds = toIdSet(q.region_ids);
  if (regionIds.size && !p.regions?.some((r) => regionIds.has(r.id))) return false;
  // 포지션
  const positionIds = toIdSet(q.position_ids);
  if (positionIds.size && !p.positions?.some((pl) => positionIds.has(pl.position.id))) return false;
  // 선호 장르
  const genreIds = toIdSet(q.genre_ids);
  if (genreIds.size && !p.genres?.some((g) => genreIds.has(g.id))) return false;
  // 경력
  const expIds = toIdSet(q.experience_level_ids);
  if (expIds.size && !p.positions?.some((pl) => expIds.has(pl.experience_level.id))) return false;
  // 북마크
  if (q.bookmark === "bookmark" && !p.is_bookmarked) return false;

  return true;
}

/** (선택) 정렬 – 프로필 UI에서 정렬 숨겼다면 제거해도 됨 */
function sortProfilesByQuery(arr: UserProfile[], q: ProfilesQuery) {
  const sortBy = q.sort_by;
  const orderBy = q.order_by ?? "desc";
  const copy = [...arr];

  if (sortBy === "bookmarks")
    copy.sort((a, b) => Number(b.is_bookmarked) - Number(a.is_bookmarked));
  else if (sortBy === "latest") copy.sort((a, b) => a.nickname.localeCompare(b.nickname));
  // views는 목데이터에 없음

  if (orderBy === "asc") copy.reverse();
  return copy;
}

/** 📌 프로필 전용 페이지 로더
 * - 범용 훅이 요구하는 표준 페이지 { items, next_cursor }로 변환해서 반환
 */
export async function fetchProfilesInfinitePage({
  pageParam = "0",
  query,
}: {
  pageParam?: string;
  query: ProfilesQuery;
}): Promise<{ items: UserProfile[]; next_cursor?: string }> {
  // 원본 데이터 (배열/객체 모두 안전 처리)
  const source: UserProfile[] = Array.isArray(mockProfiles)
    ? mockProfiles
    : ((mockProfiles as any)?.profiles ?? []);

  // 필터 + (선택)정렬
  const filtered = source.filter((p) => matchesFiltersByQuery(p, query));
  const sorted = sortProfilesByQuery(filtered, query);

  // 페이지네이션
  const limit = Number(query.limit ?? 10);
  const start = Number(pageParam);
  const pageItems = sorted.slice(start, start + limit);
  const next = start + limit < sorted.length ? String(start + limit) : "";

  // 로딩 시뮬레이션
  await new Promise((res) => setTimeout(res, 300));

  // ✅ 범용 훅 표준 형태로 반환
  return { items: pageItems, next_cursor: next };
}

/** 실제 API 버전
export async function fetchProfilesInfinitePageApi({
  pageParam = "0",
  query,
}: {
  pageParam?: string;
  query: ProfilesQuery;
}) {
  const params = new URLSearchParams({ ...query, cursor: String(pageParam) });
  const res = await fetch(`/api/v1/profiles?${params.toString()}`, { credentials: "include" });
  if (!res.ok) throw new Error("프로필 불러오기 실패");
  // 서버 응답이 UserList라면 적절히 매핑
  const data = (await res.json()) as UserList; // { profiles, next_cursor }
  return { items: data.profiles, next_cursor: data.next_cursor };
}
*/
