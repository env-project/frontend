import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseBookmarkProps {
  userId: string;
  initialState: boolean;
}

export function useBookmark({ initialState }: UseBookmarkProps) {
  // useBookmark 안에 userId 인자로 넣을 예정
  const [bookmarked, setBookmarked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  //   const queryClient = useQueryClient();

  const toggleBookmark = async () => {
    try {
      setIsLoading(true);

      // 실제 API 연결 시 아래 부분만 교체하면 됨
      if (bookmarked) {
        // await api.delete(`/api/v1/profiles/${userId}/bookmark`);
        console.log("DELETE 북마크");
      } else {
        // await api.post(`/api/v1/profiles/${userId}/bookmark`);
        console.log("POST 북마크");
      }

      setBookmarked((prev) => !prev);
      // queryClient.invalidateQueries(["bookmark", userId]); // 필요 시 갱신
    } catch (error) {
      console.error("북마크 처리 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return { bookmarked, toggleBookmark, isLoading };
}
