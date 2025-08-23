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
import { AxiosError } from "axios";

const commentFixSchema = z.object({
  newComment: z.string().min(1, { message: "최소 1글자 이상 입력해주세요." }),
});

type TCommentFixScheama = z.infer<typeof commentFixSchema>;

interface CommentFixModalProps {
  commentId: string;
}

export default function CommentFixModal({ commentId }: CommentFixModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof commentFixSchema>>({
    resolver: zodResolver(commentFixSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (form: TCommentFixScheama) => {
      return api.patch(`/comments/${commentId}`, { content: form.newComment });
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          setError("newComment", { message: "로그인 후 이용해주세요." });
        } else if (e.status === 403) {
          setError("newComment", { message: "작성자 본인만 수정 할 수 있습니다." });
        } else {
          setError("newComment", {
            message: "작성 중 에러가 발생 했습니다. 잠시후 다시 시도해주세요.",
          });
        }
      } else {
        setError("newComment", {
          message: "작성 중 에러가 발생 했습니다. 잠시후 다시 시도해주세요.",
        });
      }
    },
  });

  //TODO: 실제 api 연결
  const onSubmit = (form: TCommentFixScheama) => {
    mutate(form);
  };

  return (
    <Modal>
      <ModalTrigger className="flex justify-center items-center">
        <Text variant="label" className="text-text-primary cursor-pointer hover:underline">
          수정
        </Text>
      </ModalTrigger>
      <ModalContent>
        <div className="flex flex-col p-2 space-y-5">
          <H3 className="text-text-primary">수정할 내용을 작성해주세요</H3>
          <form
            className="flex flex-col w-full space-x-2 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input {...register("newComment")} error={errors.newComment?.message} />
            <div className="flex  w-full justify-end space-x-2">
              <ModalClose>
                <Button variant="outline" color="secondary-thick" type="button">
                  <Text variant="subText" className="text-text-primary">
                    취소
                  </Text>
                </Button>
              </ModalClose>

              <Button variant="default" color="secondary-thick" type="submit">
                <Text variant="subText" className="text-text-on-dark">
                  수정
                </Text>
              </Button>
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
}
