// src/mocks/mockProfiles.ts
import type { UserProfile } from "@/types/api-res-profile";

export const mockProfiles: UserProfile[] = [
  {
    user_id: "u1",
    nickname: "김하늘",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "1", name: "서울 서부" }],
    positions: [
      {
        position: { id: "p1", name: "보컬" },
        experience_level: { id: "e1", name: "취미 1년 이하" },
      },
    ],
    genres: [
      { id: "g1", name: "인디락" },
      { id: "g2", name: "K-pop" },
    ],
    email: "haneul@example.com",
  },
  {
    user_id: "u2",
    nickname: "이도현",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "2", name: "서울 동부" }],
    positions: [
      {
        position: { id: "p2", name: "일렉 기타" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [{ id: "g3", name: "J-pop" }],
    email: "dohyun@example.com",
  },
  {
    user_id: "u3",
    nickname: "박서연",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "3", name: "서울 남부" }],
    positions: [
      {
        position: { id: "p3", name: "어쿠스틱 기타" },
        experience_level: { id: "e3", name: "취미 5년 이하" },
      },
    ],
    genres: [{ id: "g4", name: "메탈" }],
    email: "seoyeon@example.com",
  },
  {
    user_id: "u4",
    nickname: "정민우",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "4", name: "서울 북부" }],
    positions: [
      {
        position: { id: "p4", name: "베이스" },
        experience_level: { id: "e4", name: "취미 5년 이상" },
      },
    ],
    genres: [{ id: "g5", name: "하드락" }],
    email: "minwoo@example.com",
  },
  {
    user_id: "u5",
    nickname: "최가영",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "5", name: "부산" }],
    positions: [
      {
        position: { id: "p5", name: "드럼" },
        experience_level: { id: "e5", name: "전공" },
      },
    ],
    genres: [{ id: "g6", name: "재즈" }],
    email: "gayoung@example.com",
  },
  {
    user_id: "u6",
    nickname: "한지훈",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "6", name: "인천" }],
    positions: [
      {
        position: { id: "p6", name: "키보드" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [
      { id: "g2", name: "K-pop" },
      { id: "g7", name: "그 외" },
    ],
    email: "jihoon@example.com",
  },
  {
    user_id: "u7",
    nickname: "서지우",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "7", name: "대구" }],
    positions: [
      {
        position: { id: "p2", name: "일렉 기타" },
        experience_level: { id: "e1", name: "취미 1년 이하" },
      },
    ],
    genres: [{ id: "g1", name: "인디락" }],
    email: "jiwoo@example.com",
  },
  {
    user_id: "u8",
    nickname: "오유진",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "8", name: "광주" }],
    positions: [
      {
        position: { id: "p3", name: "드럼" },
        experience_level: { id: "e3", name: "취미 5년 이하" },
      },
    ],
    genres: [{ id: "g3", name: "J-pop" }],
    email: "yujin@example.com",
  },
  {
    user_id: "u9",
    nickname: "윤태호",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "9", name: "대전" }],
    positions: [
      {
        position: { id: "p4", name: "베이스" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [{ id: "g5", name: "하드락" }],
    email: "taeho@example.com",
  },
  {
    user_id: "u10",
    nickname: "장하린",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "10", name: "울산" }],
    positions: [
      {
        position: { id: "p6", name: "키보드" },
        experience_level: { id: "e4", name: "취미 5년 이상" },
      },
    ],
    genres: [{ id: "g6", name: "재즈" }],
    email: "harin@example.com",
  },
  {
    user_id: "u11",
    nickname: "강현우",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "11", name: "제주" }],
    positions: [
      {
        position: { id: "p1", name: "보컬" },
        experience_level: { id: "e5", name: "전공" },
      },
    ],
    genres: [{ id: "g2", name: "K-pop" }],
    email: "hyunwoo@example.com",
  },
  {
    user_id: "u12",
    nickname: "백소연",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "1", name: "서울 서부" }],
    positions: [
      {
        position: { id: "p2", name: "일렉 기타" },
        experience_level: { id: "e1", name: "취미 1년 이하" },
      },
    ],
    genres: [{ id: "g4", name: "메탈" }],
    email: "soyeon@example.com",
  },
  {
    user_id: "u13",
    nickname: "임재혁",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "3", name: "서울 남부" }],
    positions: [
      {
        position: { id: "p3", name: "어쿠스틱 기타" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [{ id: "g5", name: "하드락" }],
    email: "jaehyuk@example.com",
  },
  {
    user_id: "u14",
    nickname: "홍지민",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "5", name: "부산" }],
    positions: [
      {
        position: { id: "p7", name: "그 외" },
        experience_level: { id: "e3", name: "취미 5년 이하" },
      },
    ],
    genres: [{ id: "g1", name: "인디락" }],
    email: "jimin@example.com",
  },
  {
    user_id: "u15",
    nickname: "노유나",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "7", name: "대구" }],
    positions: [
      {
        position: { id: "p5", name: "드럼" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [{ id: "g3", name: "J-pop" }],
    email: "yuna@example.com",
  },
  {
    user_id: "u16",
    nickname: "하도윤",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "8", name: "광주" }],
    positions: [
      {
        position: { id: "p1", name: "보컬" },
        experience_level: { id: "e6", name: "프로" },
      },
    ],
    genres: [{ id: "g6", name: "재즈" }],
    email: "doyoon@example.com",
  },
  {
    user_id: "u17",
    nickname: "문예린",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "2", name: "서울 동부" }],
    positions: [
      {
        position: { id: "p7", name: "그 외" },
        experience_level: { id: "e5", name: "전공" },
      },
    ],
    genres: [{ id: "g2", name: "K-pop" }],
    email: "yerin@example.com",
  },
  {
    user_id: "u18",
    nickname: "배시후",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "6", name: "인천" }],
    positions: [
      {
        position: { id: "p3", name: "어쿠스틱 기타" },
        experience_level: { id: "e1", name: "취미 1년 이하" },
      },
    ],
    genres: [{ id: "g4", name: "메탈" }],
    email: "sihoo@example.com",
  },
  {
    user_id: "u19",
    nickname: "조아인",
    image_url: "",
    is_bookmarked: false,
    regions: [{ id: "9", name: "대전" }],
    positions: [
      {
        position: { id: "p4", name: "베이스" },
        experience_level: { id: "e2", name: "취미 3년 이하" },
      },
    ],
    genres: [{ id: "g5", name: "하드락" }],
    email: "ain@example.com",
  },
  {
    user_id: "u20",
    nickname: "양채원",
    image_url: "",
    is_bookmarked: true,
    regions: [{ id: "10", name: "울산" }],
    positions: [
      {
        position: { id: "p5", name: "드럼" },
        experience_level: { id: "e3", name: "취미 5년 이하" },
      },
    ],
    genres: [{ id: "g6", name: "재즈" }],
    email: "chaewon@example.com",
  },
];
