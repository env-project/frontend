import { Genre, Region, Position, ExperienceLevel } from "@/types/api-res-common";
import { Post } from "@/types/api-res-recruitment";

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
export type UserProfileDetail = PublicUserProfileDetail | PrivateUserProfileDetail;
export interface BaseUserProfileDetail {
  user_id?: string;
  nickname: string;
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}
export interface PublicUserProfileDetail extends BaseUserProfileDetail {
  is_public: true;
  recent_posts: Pick<Post, "id" | "title" | "created_at">[];
  recent_comments: (Pick<Comment, "id" | "content" | "created_at"> & {
    post: Pick<Post, "id" | "title">;
  })[];
}
export interface PrivateUserProfileDetail extends BaseUserProfileDetail {
  is_public: false;
  // `recent_posts`와 `recent_comments` 없음
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
