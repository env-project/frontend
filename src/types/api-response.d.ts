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
