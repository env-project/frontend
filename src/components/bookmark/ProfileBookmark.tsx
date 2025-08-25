import { useState } from "react";
import type { BookmarkButtonProps } from "@/components/bookmark/BookmarkBtn";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";
import BookmarkButton from "@/components/bookmark/BookmarkBtn";
import { cn } from "@/libs/utils";

//TODO: 테스트 필요!!
interface ProfileBookmarkProps extends Omit<BookmarkButtonProps, "isBookmarked"> {
  userId: string;
  initialIsBookmark: boolean;
}

export default function ProfileBookmark({
  userId,
  size = "md",
  className = "",
  initialIsBookmark,
}: ProfileBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmark);

  const { mutate: postBookmark, isPending: isPostPending } = useMutation({
    mutationFn: () => {
      return api.post(`/users/${userId}/bookmark`);
    },
  });

  const { mutate: deleteBookmark, isPending: isDeletePending } = useMutation({
    mutationFn: () => {
      return api.delete(`/users/${userId}/bookmark`);
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
