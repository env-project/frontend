import Input from "@/components/input/Input";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import Button from "@/components/Button";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";
import { useParams } from "react-router";

const SubCommentSchema = z.object({
  subComment: z.string().min(1, { message: "최소 1글자 이상 입력해주세요." }),
});

type TSubCommentSchema = z.infer<typeof SubCommentSchema>;

interface SubCommentModalProps {
  parentCommentId: string;
  postId: string;
}

export default function SubCommentModal({ parentCommentId }: SubCommentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSubCommentSchema>({
    resolver: zodResolver(SubCommentSchema),
  });

  const { postId } = useParams();

  const { mutate } = useMutation({
    mutationFn: (form: TSubCommentSchema) => {
      return api.post(`/recruiting/${postId}/comments`, {
        content: form.subComment,
        parent_comment_id: parentCommentId,
      });
    },
    onSuccess: () => {
      window.location.reload();
    },

    onError: () => {
      setError("subComment", { message: "댓글 작성 중 에러가 발생했습니다." });
    },
  });

  //TODO: 실제 api 연결
  const onSubmit = (form: TSubCommentSchema) => {
    mutate(form);
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
          <form
            className="flex flex-col w-full space-x-2 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input {...register("subComment")} error={errors.subComment?.message} />
            <div className="flex  w-full justify-end space-x-2 ">
              <ModalClose>
                <Button variant="outline" color="secondary-thick" type="button">
                  <Text variant="subText" className="text-text-primary">
                    취소
                  </Text>
                </Button>
              </ModalClose>

              <Button variant="default" color="secondary-thick" type="submit">
                <Text variant="subText" className="text-text-on-dark">
                  완료
                </Text>
              </Button>
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
}
