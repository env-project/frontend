/* --------------- 구인/구직 --------------- */
// GET /api/v1/recruiting-posts
interface PostList {
  next_cursor: string;
  posts: Post[];
}

//GET /api/v1/recruiting-posts/{post_id}
interface PostDetail extends Post {
  content: string;

  band_name?: string;
  image_url?: string;
  band_composition?: string;
  activity_time?: string;

  contact_info?: string;
  application_method?: string;
  practice_frequency_time?: string;
  other_conditions?: string;

  recruitment_type: RecruitmentType;
}

interface Post {
  id: string;
  title: string;
  author: Author;

  is_closed: boolean;
  is_owner: boolean;
  is_bookmarked: boolean;

  created_at: string;

  views_count: number;
  comments_count: number;
  bookmarks_count: number;

  regions: Region[];
  genres: Genre[];
  orientation: Orientation;
  positions: {
    position_id: Position["id"];
    position_name: Position["name"];
    experience_level_id: ExperienceLevel["id"];
    experience_level_name: ExperienceLevel["name"];
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
