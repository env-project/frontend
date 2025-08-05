import { useState } from "react";
import clsx from "clsx";

interface BookmarkButtonProps {
  userId: string;
  isBookmarked: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BookmarkButton({
  userId,
  isBookmarked,
  size = "md",
  className = "",
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  // 북마크 토글 함수 (비동기 요청 가정)
  const toggleBookmark = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // 실제 API 연결 시 이 부분만 교체
      if (bookmarked) {
        console.log(`DELETE 북마크: ${userId}`);
        // await api.delete(...)
      } else {
        console.log(`POST 북마크: ${userId}`);
        // await api.post(...)
      }
      setBookmarked((prev) => !prev);
    } catch (e) {
      console.error("북마크 처리 중 에러", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 크기에 따라 클래스 지정
  const sizeClass = {
    sm: "text-sm p-1",
    md: "text-base p-2",
    lg: "text-lg p-3",
  }[size];

  return (
    <button
      type="button"
      disabled={isLoading} // 로딩 중 클릭 방지
      onClick={toggleBookmark}
      className={clsx(
        "flex items-center gap-1 rounded-full transition-colors text-[var(--color-primary)] hover:text-[var(--color-primary-thick)] hover:opacity-80 disabled:opacity-50",
        sizeClass,
        className
      )}
      aria-label="북마크 추가"
    >
      {/* 아이콘 직접 렌더링 */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={bookmarked ? "var(--color-primary)" : "none"}
        stroke={bookmarked ? "none" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 3C5.44772 3 5 3.44772 5 4V21.382C5 21.9362 5.7096 22.1879 6.08729 21.7656L12 15.25L17.9127 21.7656C18.2904 22.1879 19 21.9362 19 21.382V4C19 3.44772 18.5523 3 18 3H6Z" />
      </svg>
    </button>
  );
}
