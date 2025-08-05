/* --------------- 프로필 --------------- */
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
  recent_posts: Pick<Post, "id" | "title" | "created_at">[];
  recent_comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  post: Pick<Post, "id" | "title">;
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

/* --------------- 구인/구직 --------------- */
// GET /api/v1/recruiting-posts
export interface PostList {
  next_cursor: string;
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  author: Author;
  is_bookmarked: boolean;
  post_type: PostType;
  regions: PostType[];
  created_at: Date;
  views_count: number;
  comments_count: number;
  is_closed: boolean;
}

export interface Author {
  user_id: string;
  nickname: string;
}

export interface PostType {
  name: string;
}
