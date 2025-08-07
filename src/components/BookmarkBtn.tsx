import { useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";

interface BookmarkButtonProps extends ComponentPropsWithoutRef<"button"> {
  userId: string;
  isBookmarked: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BookmarkButton({
  isBookmarked,
  size = "md",
  className = "",
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // 크기에 따라 클래스 지정
  const sizeClass = {
    sm: "text-sm p-1",
    md: "text-base p-2",
    lg: "text-lg p-3",
  }[size];

  return (
    <button
      type="button"
      onClick={() => setBookmarked((prev) => !prev)}
      className={cn(
        "flex items-center gap-1 rounded-full transition-colors text-primary hover:text-primary-thick hover:opacity-80 disabled:opacity-50",
        sizeClass,
        className
      )}
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
