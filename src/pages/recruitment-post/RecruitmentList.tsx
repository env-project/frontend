import Filter from "@/components/Filter";
import type { CommentList } from "@/types/api-res-comment";
import CommentUI from "@/components/commentUI/CommentUI";

//실제론 api로 호출
const DUMMY_COMMENT_LIST: CommentList = {
  next_cursor: "cursor_12345",
  comments: [
    {
      id: "comment_1",
      content: "첫 번째 댓글입니다.",
      created_at: "2025-08-12T10:30:00Z",
      post: {
        id: "post_1",
        title: "첫 번째 게시글 제목",
      },
      children: [
        {
          id: "comment_1_1",
          content: "첫 번째 댓글의 대댓글입니다.",
          created_at: "2025-08-12T11:00:00Z",
          post: {
            id: "post_1",
            title: "첫 번째 게시글 제목",
          },
          children: [],
          is_owner: false,
          author: {
            user_id: "user_002",
            nickname: "김한주",
            image_url: "https://example.com/avatar2.png",
          },
        },
      ],
      is_owner: true,
      author: {
        user_id: "user_001",
        nickname: "유다빈",
        image_url: "https://example.com/avatar1.png",
      },
    },
    {
      id: "comment_2",
      content: "두 번째 댓글입니다.",
      created_at: "2025-08-12T12:15:00Z",
      post: {
        id: "post_2",
        title: "두 번째 게시글 제목",
      },
      children: [],
      is_owner: false,
      author: {
        user_id: "user_003",
        nickname: "최웅희",
      },
    },
  ],
};

export default function RecruitmentList() {
  return (
    <div className="p-4 gap-2 flex flex-col">
      <Filter filterType="recruitmentPostFilter" />
      RecruitmentList
      <div className="flex flex-col items-start space-y-0.5">
        {DUMMY_COMMENT_LIST.comments.map((comment) => (
          <CommentUI comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
