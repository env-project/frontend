import { Link } from "react-router-dom";
import clsx from "clsx";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import type { CommentList } from "@/types/api-res-comment";

interface CommentCardProps {
  comment: CommentList["comments"][number];
}

// "오전/오후 00:00" 형태의 시간 포맷 변환
function formatTime(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${period} ${hour12}:${formattedMinutes}`;
}

// "YYYY년 MM월 DD일" 형태의 날짜 포맷 변환
function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const {
    content,
    created_at: createdAt,
    post: { id: postId, title: postTitle },
  } = comment;

  const time = formatTime(createdAt);
  const date = formatDate(createdAt);

  return (
    <Link
      to={`/recruiting-posts/${postId}`}
      className={clsx(
        "relative block rounded-xl p-4",
        "border-2 bg-bg-primary border-primary-soft",
        "hover:bg-bg-secondary",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      {/* 작성 시간 */}
      <Text variant="tooltip" className="text-text-primary mb-1">
        {time}
      </Text>

      {/* 댓글 본문 */}
      <H3 className="text-sm mb-2 line-clamp-2 text-text-primary">{content}</H3>

      {/* 연결된 게시글 제목 */}
      <Text variant="subText" className="text-text-primary">
        게시글: {postTitle}
      </Text>

      {/* 작성일 우측 하단 표시 */}
      <Text
        variant="tooltip"
        className="absolute bottom-2 right-4 text-xs text-text-primary opacity-50"
      >
        {date}
      </Text>
    </Link>
  );
}
