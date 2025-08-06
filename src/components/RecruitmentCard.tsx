import type { Post } from "@/types/api-response";

interface RecruitmentCardProps {
  postData: Post;
}

export default function RecruitmentCard({ postData }: RecruitmentCardProps) {
  const {
    id,
    title,
    author,
    is_bookmarked: isBookmarked,
    post_type: postType,
    regions,
    created_at: createdAt,
    views_count: viewsCount,
    comments_count: commentsCount,
    is_closed: isClosed,
  } = postData;
  return <div>RecruitmentCard</div>;
}
