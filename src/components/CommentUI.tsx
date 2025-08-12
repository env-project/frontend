import type { Comment } from "@/types/api-res-comment";

interface CommentUIProps {
  comment: Comment;
}

export default function CommentUI({}: CommentUIProps) {
  return <div>Comment</div>;
}

interface ChildCommentUIProps {}

function ChildCommentUI({}: ChildCommentUIProps) {}
