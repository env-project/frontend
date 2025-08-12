/* --------------- 공통 --------------- */
//GET /api/v1/common/master-data
export interface MasterData {
  regions: Region[];
  positions: Position[];
  genres: Genre[];
  experience_levels: ExperienceLevel[];
  orientations: Orientation[];
  recruiting_post_types: PostType[];
  recruitment_types: RecruitmentType[];
}

export interface Orientation {
  id: string;
  name: string;
}

export interface RecruitmentType {
  id: string;
  name: string;
}

export interface PostType {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}

interface ExperienceLevel {
  id: string;
  name: string;
}

interface Region {
  id: string;
  name: string;
}
