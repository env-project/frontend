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

/* --------------- 구인/구직 --------------- */
// GET /api/v1/recruiting-posts
interface PostList {
  next_cursor: string;
  posts: Post[];
}

//GET /api/v1/recruiting-posts/{post_id}
interface PostDetail extends Post {
  content: string;
  band_name: string;
  band_composition: string;
  activity_time: string;
  orientation: Orientation;
  contact_info: string;
  application_method: string;
  practice_frequency_time: string;
  recruitment_type: RecruitmentType;
  other_conditions: string;
  genres: Genre[];
  is_owner: boolean;
  comments: Comment[];
}

/* --------------- 댓글 --------------- */
//GET /api/v1/comments
interface CommentList {
  next_cursor: string;
  comments: (Pick<Comment, "id" | "content" | "created_at"> & {
    post: Pick<Post, "id" | "title">;
  })[];
}

/* --------------- 북마크 --------------- */
// GET /api/v1/users/me/bookmarks/profiles
interface BookmarkUserList {
  next_cursor: string;
  profiles: (Omit<UserProfile, "is_bookmarked"> & { bookmark_id: string })[];
}
// GET /api/v1/users/me/bookmarks/recruiting-posts
interface BookmarkPostList {
  next_cursor: string;
  posts: (Omit<Post, "is_bookmarked"> & { bookmark_id: string })[];
}

/* --------------- 공통 --------------- */
//GET /api/v1/common/master-data
interface MasterData {
  regions: Region[];
  positions: Position[];
  genres: Genre[];
  experience_levels: ExperienceLevel[];
  orientations: Orientation[];
  recruiting_post_types: PostType[];
  recruitment_types: RecruitmentType[];
}

/* --------------- 파일업로드 --------------- */
// POST /api/v1/uploads/images
interface UploadedImage {
  image_url: string;
}

/* --------------- 에러 --------------- */
//에러가 나타났을 때 오는 코드
interface ErrorResponse {
  code: string;
  message: string;
}

/* ----- 리스폰스로 오는 타입을 아니지만 내부적으로 사용되는 타입 ----- */
interface MyProfile {
  image_url: string;
  is_public: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
  genres: Genre[];
}
interface Post {
  id: string;
  title: string;
  author: Author;
  is_bookmarked: boolean;
  post_type: PostType;
  regions: Region[];
  created_at: Date;
  views_count: number;
  comments_count: number;
  is_closed: boolean;
  positions: {
    position: Position;
    desired_experience_level: ExperienceLevel;
  }[];
}
interface Author {
  user_id: string;
  nickname: string;
  image_url?: string;
}
interface Orientation {
  id: string;
  name: string;
}

interface RecruitmentType {
  id: string;
  name: string;
}
interface PostType {
  id: string;
  name: string;
}

interface UserProfile {
  user_id: string;
  nickname: string;
  image_url: string;
  is_bookmarked: boolean;
  regions: Region[];
  positions: PositionAndLevel[];
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
