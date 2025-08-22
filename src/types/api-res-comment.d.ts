import { Post } from "@/types/api-res-recruitment";

/* --------------- 댓글 --------------- */
//GET /api/v1/comments
export interface CommentList {
  next_cursor: string | null;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  post: Pick<Post, "id" | "title">;
  children: Comment[];
  is_owner: boolean;
  author: {
    user_id: string;
    nickname: string;
    image_url?: string;
  };
}
