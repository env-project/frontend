import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import Button from "@/components/Button";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";

interface CommentDeleteModalProps {
  commentId: string;
}

export default function CommentDeleteModal({ commentId }: CommentDeleteModalProps) {
  //TODO: 실제 api 연결

  const { mutate } = useMutation({
    mutationFn: () => {
      return api.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleDeleteClick = () => {
    mutate();
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
