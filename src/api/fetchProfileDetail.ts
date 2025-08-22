import type { Region, Genre, Position, ExperienceLevel } from "@/types/api-res-common";
import api from "@/libs/axios";
import type { AxiosError } from "axios";

export type RawProfileDetail = {
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

export async function fetchProfileDetail(userId: string): Promise<RawProfileDetail> {
  try {
    const { data } = await api.get<RawProfileDetail>(`/profiles/${userId}`);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.status === 404) throw new Error("프로필을 찾을 수 없습니다.");
    throw new Error(`프로필을 불러오는데 실패했습니다._${err.response?.status ?? "ERR"}`);
  }
}
