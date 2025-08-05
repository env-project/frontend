// GET /api/v1/users/me
interface MyUserInfo {
  id: string;
  email: string;
  nickname: string;
  profile: MyProfile;
}

interface MyProfile {
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}

// GET /api/v1/profiles
interface UserList {
  next_cursor: string;
  profiles: UserProfile[];
}

interface UserProfile {
  user_id: string;
  nickname: string;
  image_url: string;
  is_bookmarked: true;
  regions: Region[];
  positions: PositionAndLevel[];
}

// GET /api/v1/profiles/{user_id}
interface UserProfileDetail {
  nickname: string;
  image_url: string;
  is_bookmarked: true;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
  recent_posts: RecentPost[];
  recent_comments: RecentComment[];
}

export interface RecentComment {
  id: string;
  content: string;
  post: Post;
  created_at: Date;
}

export interface Post {
  id: string;
  title: string;
}

export interface RecentPost extends Post {
  created_at: Date;
}

interface PositionAndLevel {
  position: Position;
  experience_level: ExperienceLevel;
}

interface Position {
  id: string;
  name: string;
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
