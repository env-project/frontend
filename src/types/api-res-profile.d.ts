/* --------------- 프로필 --------------- */
// GET /api/v1/users/me
interface MyUserInfo {
  id: string;
  email: string;
  nickname: string;
  profile: MyProfile;
}

// GET /api/v1/profiles
interface UserList {
  next_cursor: string;
  profiles: UserProfile[];
}

// GET /api/v1/profiles/{user_id}
type UserProfileDetail = PublicUserProfileDetail | PrivateUserProfileDetail;
interface BaseUserProfileDetail {
  nickname: string;
  image_url: string;
  is_bookmarked: boolean;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}
interface PublicUserProfileDetail extends BaseUserProfileDetail {
  is_public: true;
  recent_posts: Pick<Post, "id" | "title" | "created_at">[];
  recent_comments: (Pick<Comment, "id" | "content" | "created_at"> & {
    post: Pick<Post, "id" | "title">;
  })[];
}
interface PrivateUserProfileDetail extends BaseUserProfileDetail {
  is_public: false;
  // `recent_posts`와 `recent_comments` 없음
}

interface MyProfile {
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}

interface UserProfile {
  user_id: string;
  nickname: string;
  image_url: string;
  is_bookmarked: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
  email: string;
}

export interface Comment {
  id: string;
  author: {
    user_id: string;
    nickname: string;
  };
  content: string;
  is_owner: boolean;
  children: Comment[];
}

interface PositionAndLevel {
  position: Position;
  experience_level: ExperienceLevel;
}

interface Region {
  id: string;
  name: string;
}

interface Genre {
  id: string;
  name: string;
}

interface ExperienceLevel {
  id: string;
  name: string;
}
