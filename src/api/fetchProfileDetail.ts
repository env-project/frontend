import type { UserProfileDetail, PositionAndLevel } from "@/types/api-res-profile";
import type { Region, Genre, Position, ExperienceLevel } from "@/types/api-res-common";

type RawProfileDetail = {
  nickname: string;
  image_url: string | null;
  is_public: boolean;
  is_bookmarked: boolean;
  regions: Region[] | null;
  position_links: Array<{
    position: Position;
    experience_level: ExperienceLevel;
  }> | null;
  genres: Genre[] | null;
  email?: string | null;
};

function toPositions(links: RawProfileDetail["position_links"]): PositionAndLevel[] {
  if (!Array.isArray(links)) return [];
  return links.map(({ position, experience_level }) => ({
    position,
    experience_level,
  }));
}

function arrOrEmpty<T>(v: T[] | null | undefined): T[] {
  return Array.isArray(v) ? v : [];
}

export async function fetchProfileDetail(userId: string): Promise<UserProfileDetail> {
  const res = await fetch(`/api/v1/profiles/${userId}`, { credentials: "include" });

  if (!res.ok) {
    // 필요시 상태별 에러 메시지 분기
    if (res.status === 404) throw new Error("프로필을 찾을 수 없습니다.");
    throw new Error(`프로필을 불러오는데 실패했습니다._${res.status}`);
  }

  const raw: RawProfileDetail = await res.json();

  const detail: UserProfileDetail = {
    user_id: userId,
    nickname: raw.nickname,
    image_url: raw.image_url ?? "",
    is_public: !!raw.is_public,
    is_bookmarked: !!raw.is_bookmarked,
    regions: arrOrEmpty(raw.regions),
    positions: toPositions(raw.position_links),
    genres: arrOrEmpty(raw.genres),
    email: raw.email ?? "",
  };

  return detail;
}
