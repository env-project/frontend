import type { PostDetail } from "@/types/api-res-recruitment";
import { useParams } from "react-router";

//더미 포스트 데이터 실제론 api 준비
const dummyPostData: PostDetail = {
  id: "1",
  title: "유지민 밴드에서 키보드를 찾습니다!",
  author: {
    id: "1111",
    nickname: "이재현",
  },
  is_closed: false,
  is_owner: false,
  is_bookmarked: true,

  created_at: "2025-08-12T11:00:00Z",

  views_count: 100,
  comments_count: 10,
  bookmarks_count: 5,

  content:
    "서울 홍대에서 활동 하고 있는 유지빈 밴드입니다. 취미 지향 직장인 밴드입니다. 합주는 주로 주말에 격주로 진행합니다. 멤버는 현재 남보컬 겸 세컨 기타, 리드 기타, 드럼, 베이스로 이루어져 있습니다. 관심 있으시면 댓글이나 아래 이메일로 편하게 연락주세요! example@example.com",

  band_name: "유지민 밴드",
  band_composition: "남보컬 겸 세컨 기타, 리드 기타, 드럼, 베이스",
  activity_time: "월요일 오후 8시, 주말",
  practice_frequency_time: "격주로 주 1회",
  contact_info: "examle@example.com",
  application_method: "대면 오디션",
  other_conditions: "공연 경험 있으면 우대",

  recruitment_type: { id: "asdfadsfa", name: "고정 밴드" },

  genres: [
    {
      id: "143125235",
      name: "인디락",
    },
    {
      id: "14313asdfa25235",
      name: "하드락",
    },
  ],

  orientation: {
    id: "asdfagsdfjoppjo",
    name: "취미",
  },

  positions: [
    {
      position_id: "1222",
      position_name: "키보드",
      experience_level_id: "312345",
      experience_level_name: "취미 1년 이상 3년 이하",
    },
  ],

  regions: [
    {
      id: "12415r123t5234",
      name: "서울 서부",
    },
    {
      id: "12r123t5234",
      name: "서울 남부",
    },
  ],
};

export default function RecruitmentDetail() {
  const { postId } = useParams();

  return <div>RecruitmentDetail of {postId}</div>;
}
