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

interface Position {
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
