import type { Comment } from "@/types/api-res-comment";

interface CommentProps {
  comment: Comment;
}

export default function Comment({}: CommentProps) {
  return <div>Comment</div>;
}

interface ChildCommentProps {}

function ChildComment({}: ChildCommentProps) {}
