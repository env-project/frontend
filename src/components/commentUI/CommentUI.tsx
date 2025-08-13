import type { Comment } from "@/types/api-res-comment";
import defaultUserImage from "@/assets/images/user-default-image.png";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import { BsArrowReturnRight } from "react-icons/bs";
import CommentDeleteModal from "@/components/commentUI/CommentDeleteModal";
import CommentFixModal from "@/components/commentUI/CommentFixModal";
import SubCommentModal from "@/components/commentUI/SubCommentModal";

interface CommentUIProps {
  comment: Comment;
  isChild?: boolean;
}

export default function CommentUI({ comment, isChild = false }: CommentUIProps) {
  const {
    author: { image_url: imageUrl, nickname },
    is_owner: isOwner,
    content,
    children,
    id,
  } = comment;

  return (
    <>
      <div className="flex justify-start items-center space-x-2 bg-neutral-200 rounded-xl p-2 min-w-sm">
        {isChild ? <BsArrowReturnRight /> : null}
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
              <SubCommentModal parentCommentId={id} />
              {isOwner ? (
                <>
                  <CommentFixModal commentId={id} />
                  <CommentDeleteModal commentId={id} />
                </>
              ) : null}
            </div>
          </div>
          <Text variant="mainText" className="text-text-primary">
            {content}
          </Text>
        </div>
      </div>
      {children.map((child) => (
        <CommentUI isChild={true} comment={child} key={child.id} />
      ))}
    </>
  );
}
