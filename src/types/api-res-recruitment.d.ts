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

  contact_info: string;
  application_method: string;
  practice_frequency_time: string;
  recruitment_type: RecruitmentType;
  other_conditions: string;
  is_owner: boolean;
  comments: Comment[];
}

interface Post {
  id: string;
  title: string;
  author: Author;
  is_bookmarked: boolean;
  regions: Region[];
  created_at: Date;
  views_count: number;
  comments_count: number;
  bookmarks_count: number;
  is_closed: boolean;
  positions: {
    position: Position;
    desired_experience_level: ExperienceLevel;
  }[];
  orientation: Orientation;
  genres: Genre[];
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
