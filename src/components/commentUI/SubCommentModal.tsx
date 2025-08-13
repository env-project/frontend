import Input from "@/components/input/AuthInput";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import Button from "@/components/Button";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const subCommentSchema = z.object({
  subComment: z.string(),
});

interface SubCommentModalProps {
  parentCommentId: string;
}

export default function SubCommentModal({ parentCommentId }: SubCommentModalProps) {
  const { register, handleSubmit } = useForm<z.infer<typeof subCommentSchema>>({
    resolver: zodResolver(subCommentSchema),
  });

  //TODO: 실제 api 연결
  const onSubmit = ({ subComment }: z.infer<typeof subCommentSchema>) => {
    console.log(`${parentCommentId}에 ${subComment}로 대댓글`);
  };

  return (
    <Modal>
      <ModalTrigger className="flex justify-center items-center">
        <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
          대댓글
        </Text>
      </ModalTrigger>
      <ModalContent>
        <div className="flex flex-col p-2 space-y-5">
          <H3 className="text-text-primary">대댓글 내용을 작성해주세요</H3>
          <form className="flex flex-col w-full space-x-2" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("subComment")} />
            <div className="flex  w-full justify-end space-x-2">
              <ModalClose>
                <Button variant="outline" color="secondary-thick" type="button">
                  <Text variant="subText" className="text-text-primary">
                    취소
                  </Text>
                </Button>
              </ModalClose>

              <ModalClose>
                <Button variant="default" color="secondary-thick" type="submit">
                  <Text variant="subText" className="text-text-on-dark">
                    완료
                  </Text>
                </Button>
              </ModalClose>
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
}
