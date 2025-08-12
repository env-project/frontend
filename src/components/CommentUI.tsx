import type { Comment } from "@/types/api-res-comment";
import defaultUserImage from "@/assets/images/user-default-image.png";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
interface CommentUIProps {
  comment: Comment;
}

export default function CommentUI({ comment }: CommentUIProps) {
  const {
    author: { image_url: imageUrl, nickname },
    is_owner: isOwner,
    content,
  } = comment;

  return (
    <div className="flex justify-start items-center space-x-2 bg-neutral-200 rounded-xl p-2 min-w-sm">
      <img
        alt="profile-image"
        src={imageUrl || defaultUserImage}
        width={40}
        height={40}
        className="rounded-full border border-primary size-13 content-center"
      />
      <div className="flex flex-col items-start justify-center flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start space-x-0.5">
            <Text variant="subText">{nickname}</Text>
            {isOwner ? (
              <Badge size="sm" color="primarySoft">
                <Text variant="label" className="text-text-primary">
                  작성자
                </Text>
              </Badge>
            ) : null}
          </div>
          <div className="flex justify-center items-center space-x-0.5">
            <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
              대댓글
            </Text>
            {isOwner ? (
              <>
                <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
                  수정
                </Text>
                <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
                  삭제
                </Text>
              </>
            ) : null}
          </div>
        </div>
        <Text variant="mainText" className="text-text-primary">
          {content}
        </Text>
      </div>
    </div>
  );
}

interface ChildCommentUIProps {}

function ChildCommentUI({}: ChildCommentUIProps) {}
