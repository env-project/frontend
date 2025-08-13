import type { Comment } from "@/types/api-res-comment";
import defaultUserImage from "@/assets/images/user-default-image.png";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import { BsArrowReturnRight } from "react-icons/bs";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import Button from "@/components/Button";
import H3 from "@/components/text/H3";
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
              <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
                대댓글
              </Text>
              {isOwner ? (
                <>
                  <Text
                    variant="label"
                    className="text-text-primary cursor-pointer hover:underline"
                  >
                    수정
                  </Text>
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

interface CommentDeleteModalProps {
  commentId: string;
}

function CommentDeleteModal({ commentId }: CommentDeleteModalProps) {
  //TODO: 실제 api 연결
  const handleDeleteClick = () => {
    console.log(commentId);
  };

  return (
    <Modal>
      <ModalTrigger className="flex justify-center items-center">
        <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
          삭제
        </Text>
      </ModalTrigger>
      <ModalContent>
        <div className="flex flex-col p-2 space-y-5">
          <H3 className="text-text-primary">댓글을 삭제하시겠습니까?</H3>
          <div className="flex w-full justify-end space-x-2">
            <ModalClose>
              <Button variant="outline" color="error">
                <Text variant="subText" className="text-text-primary">
                  취소
                </Text>
              </Button>
            </ModalClose>

            <ModalClose>
              <Button variant="default" color="error" onClick={handleDeleteClick}>
                <Text variant="subText" className="text-text-on-dark">
                  삭제
                </Text>
              </Button>
            </ModalClose>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
