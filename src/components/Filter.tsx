import { BsFillFunnelFill } from "react-icons/bs";

//마스터 데이터 실제론 api로 받기
const MASTER_DATA: MasterData = {
  regions: [
    { id: "1", name: "서울 서부" },
    { id: "2", name: "서울 동부" },
    { id: "3", name: "서울 남부" },
    { id: "4", name: "서울 북부" },
    { id: "5", name: "인천" },
    { id: "6", name: "부산" },
    { id: "7", name: "대구" },
    { id: "8", name: "광주" },
    { id: "9", name: "대전" },
    { id: "10", name: "울산" },
    { id: "11", name: "제주" },
    { id: "12", name: "경기" },
    { id: "13", name: "강원" },
    { id: "14", name: "충북" },
    { id: "15", name: "충남" },
    { id: "16", name: "경북" },
    { id: "17", name: "경남" },
    { id: "18", name: "전북" },
    { id: "19", name: "전남" },
  ],
  positions: [
    { id: "p1", name: "보컬" },
    { id: "p2", name: "일렉 기타" },
    { id: "p3", name: "어쿠스틱 기타" },
    { id: "p4", name: "베이스" },
    { id: "p5", name: "드럼" },
    { id: "p6", name: "키보드" },
    { id: "p7", name: "그 외" },
  ],
  genres: [
    { id: "g1", name: "인디락" },
    { id: "g2", name: "K-pop" },
    { id: "g3", name: "J-pop" },
    { id: "g4", name: "메탈" },
    { id: "g5", name: "하드락" },
    { id: "g6", name: "재즈" },
    { id: "g7", name: "그 외" },
  ],
  experience_levels: [
    { id: "e1", name: "취미 1년 이하" },
    { id: "e2", name: "취미 3년 이하" },
    { id: "e3", name: "취미 5년 이하" },
    { id: "e4", name: "취미 5년 이상" },
    { id: "e5", name: "전공" },
    { id: "e6", name: "프로" },
  ],
  orientations: [
    { id: "o1", name: "취미" },
    { id: "o2", name: "프로" },
    { id: "o3", name: "프로 지향" },
  ],
  recruitment_types: [
    { id: "r1", name: "고정 밴드" },
    { id: "r2", name: "프로젝트 밴드" },
  ],
  recruiting_post_types: [],
};

interface FilterProps {}

export default function Filter({}: FilterProps) {
  //마스터 데이터 실제론 api로 받기
  const {
    regions,
    positions,
    genres,
    experience_levels: experienceLevel,
    orientations,
    recruitment_types: recruitmentTypes,
  } = MASTER_DATA;

  return (
    <div className="flex flex-col border-2 border-neutral-600 rounded-xl max-w-sm p-2">
      <div className="flex items-center justify-between space-x-1.5 px-1">
        <BsFillFunnelFill size={24} />
        <input className="rounded-full bg-bg-on-dark text-text-on-dark px-3 py-0.5 focus:outline-none flex-1" />
      </div>
    </div>
  );
}
