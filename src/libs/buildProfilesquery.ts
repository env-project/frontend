export type ProfilesQuery = {
  limit?: string; // 한 번에 가져올 데이터 개수
  cursor?: string; // 페이지네이션 커서
  nickname?: string; // 필터: 닉네임 검색
  region_ids?: string; // 필터: 지역 ID 목록 (쉼표 구분)
  position_ids?: string; // 필터: 포지션 ID 목록 (쉼표 구분)
  genre_ids?: string; // 필터: 장르 ID 목록 (쉼표 구분)
  experience_level_ids?: string; // 필터: 경력 레벨 ID 목록 (쉼표 구분)
  sort_by?: "latest" | "bookmarks" | "views"; // 정렬 기준
  order_by?: "asc" | "desc"; // 정렬 순서
  bookmark?: "bookmark" | "all"; // 북마크 필터 (북마크만 / 전체)
};

// URLSearchParams 객체에서 쿼리스트링 값을 읽어와 ProfilesQuery 객체를 생성하는 함수
export function buildProfilesQueryFromSearchParams(sp: URLSearchParams): ProfilesQuery {
  const q: ProfilesQuery = {}; // 반환할 쿼리 객체

  // 닉네임 필터 적용
  const nickname = sp.get("nickname");
  if (nickname) q.nickname = nickname;

  // 지역 필터 적용
  const region = sp.get("region_ids");
  if (region) q.region_ids = region;

  // 포지션 필터 적용
  const position = sp.get("position_ids") ?? sp.get("positions_id");
  if (position) q.position_ids = position;

  // 장르 필터 적용
  const genre = sp.get("genre_ids");
  if (genre) q.genre_ids = genre;

  // 경력 레벨 필터 적용
  const exp = sp.get("experience_level_ids");
  if (exp) q.experience_level_ids = exp;

  // 정렬 기준 적용 (latest, bookmarks, views 중 하나만 허용)
  const sort = sp.get("sort_by");
  if (sort && ["latest", "bookmarks", "views"].includes(sort)) q.sort_by = sort as any;

  // 정렬 순서 적용 (asc 또는 desc만 허용)
  const order = sp.get("order_by");
  if (order && ["asc", "desc"].includes(order)) q.order_by = order as any;

  // 페이지네이션 커서 적용
  const cursor = sp.get("cursor");
  if (cursor) q.cursor = cursor;

  // 데이터 개수 제한 적용
  const limit = sp.get("limit");
  if (limit) q.limit = limit;

  // 북마크 필터 적용 (bookmark 또는 all만 허용)
  const bookmark = sp.get("bookmark");
  if (bookmark === "bookmark" || bookmark === "all") q.bookmark = bookmark;

  // 완성된 쿼리 객체 반환
  return q;
}
