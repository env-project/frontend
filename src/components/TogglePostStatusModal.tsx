import Button from "@/components/Button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import api from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface TogglePostStatusModalProps {
  isClosed: boolean;
  postId: string;
}

export default function TogglePostStatusModal({ isClosed, postId }: TogglePostStatusModalProps) {
  const [apiError, setApiError] = useState("");

  const { mutate } = useMutation({
    mutationFn: ({ isClosed }: { isClosed: boolean }) => {
      return api.patch(`/recruiting/${postId}/status?is_closed=${isClosed}`);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      setApiError("전송 중 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
    },
  });

  const handleClick = () => {
    mutate({ isClosed: !isClosed });
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button color="error" variant="outline" type="button">
          <Text>{isClosed ? "다시 열기" : "마감하기"}</Text>
        </Button>
      </ModalTrigger>
      <ModalContent className="flex flex-col items-start justify-start p-2 space-y-5">
        <H3 className="text-text-primary">
          {isClosed ? "다시 열시겠습니까?" : "마감하시겠습니까?"}
        </H3>
        <Text variant="label" className="text-error">
          {apiError}
        </Text>
        <div className="flex justify-end items-center w-full space-x-2">
          <ModalClose>
            <Button variant="outline" color="error" type="button">
              <Text variant="subText" className="text-text-primary">
                취소
              </Text>
            </Button>
          </ModalClose>
          <Button color="error" onClick={handleClick} type="button">
            <Text className="text-text-on-dark" variant="subText">
              {isClosed ? "다시 열기" : "마감하기"}
            </Text>{" "}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
