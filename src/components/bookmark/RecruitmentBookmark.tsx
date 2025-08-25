import { useState } from "react";
import type { BookmarkButtonProps } from "@/components/bookmark/BookmarkBtn";
import BookmarkButton from "@/components/bookmark/BookmarkBtn";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";
import { cn } from "@/libs/utils";

interface RecruitmentBookmarkProps extends Omit<BookmarkButtonProps, "isBookmarked"> {
  postId: string;
  initialIsBookmark: boolean;
}

export default function RecruitmentBookmark({
  postId,
  size = "md",
  className = "",
  initialIsBookmark,
}: RecruitmentBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmark);

  const { mutate: postBookmark, isPending: isPostPending } = useMutation({
    mutationFn: () => {
      return api.post(`/recruiting/${postId}/bookmark`);
    },
  });

  const { mutate: deleteBookmark, isPending: isDeletePending } = useMutation({
    mutationFn: () => {
      return api.delete(`/recruiting/${postId}/bookmark`);
    },
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 전파 중단

    if (isBookmarked) {
      deleteBookmark();
    } else {
      postBookmark();
    }

    //optimistic UI
    setIsBookmarked(!isBookmarked);
  };

  return (
    <BookmarkButton
      isBookmarked={isBookmarked}
      className={cn("cursor-pointer", className)}
      size={size}
      onClick={handleClick}
      disabled={isPostPending || isDeletePending}
    />
  );
}
