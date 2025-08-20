import Button from "@/components/Button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";

interface TogglePostStatusModalProps {
  isClosed: boolean;
  postId: string;
}

export default function TogglePostStatusModal({ isClosed, postId }: TogglePostStatusModalProps) {
  const handleClick = () => {
    //실제 api 연결
    console.log(`${postId} 마감 상태 변경`);
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button color="error" variant="outline">
          <Text>{isClosed ? "다시 열기" : "마감하기"}</Text>
        </Button>
      </ModalTrigger>
      <ModalContent className="flex flex-col items-start justify-start p-2 space-y-5">
        <H3 className="text-text-primary">
          {isClosed ? "다시 열시겠습니까?" : "마감하시겠습니까?"}
        </H3>
        <div className="flex justify-end items-center w-full space-x-2">
          <ModalClose>
            <Button variant="outline" color="error">
              <Text variant="subText" className="text-text-primary">
                취소
              </Text>
            </Button>
          </ModalClose>
          <Button color="error" onClick={handleClick}>
            <Text className="text-text-on-dark" variant="subText">
              {isClosed ? "다시 열기" : "마감하기"}
            </Text>{" "}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
