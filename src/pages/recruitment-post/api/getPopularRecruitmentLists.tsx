import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/libs/axios";
import type { Post } from "@/types/api-res-recruitment";

// Post 타입은 실제 API 응답에 맞춰 정의되어 있어야 합니다.
// 예시:
// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   views: number;
// }

export const usePopularRecruitmentLists = () => {
  // 컴포넌트 내부에서 API 에러 상태를 관리할 필요가 있을 때 사용합니다.
  const [apiError, setApiError] = useState<string | null>(null);

  // useQuery의 첫 번째 제네릭 타입을 Post[] (Post 객체 배열)로 변경했습니다.
  const queryResult = useQuery<Post, AxiosError>({
    queryKey: ["popularRecruitmentLists", { sort_by: "views", limit: 20 }],
    queryFn: async () => {
      try {
        const res = await api.get("/api/v1/recruiting-posts", {
          params: {
            sort_by: "views", // 인기순
            limit: 20, // 한 번에 가져올 게시글 수
          },
        });
        return res.data;
      } catch (error) {
        // 비동기 함수 내부에서 에러를 처리하고 다시 throw 하여 useQuery의 onError로 전달
        throw error;
      }
    },
    staleTime: 60 * 1000,
    onError: (err) => {
      // 서버 응답이 있는 경우, HTTP 상태 코드에 따라 에러 메시지 설정
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setApiError("요청 형식이 올바르지 않습니다.");
            break;
          case 401:
            setApiError("인증 토큰이 만료되었거나 유효하지 않습니다.");
            break;
          case 404:
            setApiError("요청하신 정보를 찾을 수 없습니다.");
            break;
          case 422:
            setApiError("입력 데이터의 유효성 검사에 실패했습니다.");
            break;
          case 500:
            setApiError("서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            break;
          default:
            setApiError(`알 수 없는 에러가 발생했습니다: ${err.response.status}`);
        }
      } else if (err.request) {
        // 서버 응답은 없지만 요청이 발생한 경우 (네트워크 오류 등)
        setApiError("네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.");
      } else {
        // 요청 자체를 설정하는 중에 발생한 오류
        setApiError("알 수 없는 클라이언트 에러가 발생했습니다.");
      }
    },
  });

  return { ...queryResult, apiError };
};
