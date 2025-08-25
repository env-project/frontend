import { useMutation } from "@tanstack/react-query";
import Button from "./Button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "./Modal";
import H3 from "./text/H3";
import Text from "./text/Text";
import api from "@/libs/axios";
import { useNavigate } from "react-router";
import InlineSpinner from "./loading/InlineSpinner";
import { useState } from "react";

interface DeletePostModalProps {
  postId: string;
}

export default function DeletePostModal({ postId }: DeletePostModalProps) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (postId: string) => {
      return api.delete(`/recruiting/${postId}`);
    },
    onSuccess: () => {
      navigate("/recruitment-post");
    },
    onError: () => {
      setApiError("삭제 중 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
    },
  });

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(postId);
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button color="error" type="button">
          <Text className="text-text-on-dark">삭제하기</Text>
        </Button>
      </ModalTrigger>
      <ModalContent className="flex flex-col space-y-2">
        <H3>게시글을 삭제하시게습니까?</H3>
        <Text variant="label" className="text-error">
          {apiError}
        </Text>
        <div className="flex w-full justify-end items-center space-x-2">
          <ModalClose>
            <Button variant="outline" color="error" type="button">
              <Text>취소</Text>
            </Button>
          </ModalClose>
          <Button color="error" type="button" onClick={handleDeleteClick} disabled={isPending}>
            {isPending ? <InlineSpinner /> : <Text className="text-text-on-dark">삭제</Text>}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
