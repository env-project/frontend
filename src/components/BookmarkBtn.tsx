import clsx from "clsx";
import { BookmarkIcon, BookmarkIconVoid } from "@/components/icons";
import { useBookmark } from "./hooks/useBookmark";

interface BookmarkButtonProps {
  userId: string;
  isBookmarked: boolean;
  size?: "sm" | "md" | "lg";
  layout?: "icon-only" | "with-text";
  className?: string;
}

export default function BookmarkButton({
  userId,
  isBookmarked,
  size = "md",
  layout = "icon-only",
  className = "",
}: BookmarkButtonProps) {
  const { toggleBookmark, bookmarked, isLoading } = useBookmark({
    userId,
    initialState: isBookmarked,
  });

  const sizeClass = {
    sm: "text-sm p-1",
    md: "text-base p-2",
    lg: "text-lg p-3",
  }[size];

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={toggleBookmark}
      className={clsx(
        "flex items-center gap-1 rounded-full transition-all text-[var(--color-primary)] hover:text-[var(--color-primary-thick)] hover:opacity-80 disabled:opacity-50",
        sizeClass,
        className
      )}
    >
      {bookmarked ? <BookmarkIconVoid /> : <BookmarkIcon />}
      {layout === "with-text" && <span className="hidden sm:inline">북마크</span>}
    </button>
  );
}
