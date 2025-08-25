import { Genre, Region, Position, ExperienceLevel } from "@/types/api-res-common";

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

/* --------------- 프로필 --------------- */
// GET /api/v1/users/me
export interface MyUserInfo {
  id: string;
  email: string;
  nickname: string;
  profile: MyProfile;
}

// GET /api/v1/profiles
export interface UserList {
  next_cursor: string;
  profiles: UserProfile[];
}

// GET /api/v1/profiles/{user_id}
export interface UserProfileDetail {
  user_id: string;
  nickname: string;
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
  email: string;
  is_bookmarked: boolean;
}

export interface MyProfile {
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}

export interface UserProfile {
  user_id: string;
  nickname: string;
  image_url: string;
  is_bookmarked: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
  email: string;
}

export interface PositionAndLevel {
  position: Position;
  experience_level: ExperienceLevel;
}
