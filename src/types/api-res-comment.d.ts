/* --------------- 댓글 --------------- */
//GET /api/v1/comments
interface CommentList {
  next_cursor: string;
  comments: (Pick<Comment, "id" | "content" | "created_at"> & {
    post: Pick<Post, "id" | "title">;
  })[];
}

export interface Comment {
  id: string;
  author: {
    user_id: string;
    nickname: string;
  };
  content: string;
  is_owner: boolean;
  children: Comment[];
}
