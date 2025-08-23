import Text from "@/components/text/Text";
import { cn } from "@/libs/utils";
import type { ComponentPropsWithoutRef } from "react";
import Input from "@/components/input/Input";
import Button from "../Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";
import useComment from "@/hooks/api/useComment";
import { AxiosError } from "axios";
import { useUserInfo } from "@/hooks/api/useUserInfo";

const commentSchema = z.object({
  comment: z.string().min(1, "한 글자 이상 입력해주세요."),
});

type TCommentSchema = z.infer<typeof commentSchema>;

interface CommentInputProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  postId: string;
}

export default function CommentInput({ postId, className = "", ...rest }: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<TCommentSchema>({ resolver: zodResolver(commentSchema) });

  const { refetch: refetchComments } = useComment(postId);
  const { data: user } = useUserInfo();

  const { mutate } = useMutation({
    mutationFn: (form: TCommentSchema) => {
      return api.post(`/recruiting/${postId}/comments`, {
        content: form.comment,
      });
    },
    onSuccess: () => {
      setValue("comment", "");
      refetchComments();
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          setError("comment", { message: "로그인 후 이용해주세요." });
        } else {
          setError("comment", { message: "댓글 작성 중 에러가 발생했습니다." });
        }
      } else {
        setError("comment", { message: "댓글 작성 중 에러가 발생했습니다." });
      }
    },
  });

  const onSubmit = (form: TCommentSchema) => {
    mutate(form);
  };

  return (
    <form
      className={cn("text-text-primary flex flex-col justify-start  space-y-1", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor={`${postId}-comment-input`}>
        <Text variant="label">댓글</Text>
      </label>
      <Input
        id={`${postId}-comment-input`}
        type="text"
        {...rest}
        {...register("comment")}
        error={errors.comment?.message}
      />
      <Button
        type="submit"
        disabled={!user}
        className={cn("hover:scale-100", !user ? "saturate-50" : "")}
      >
        <Text className="text-text-on-dark">
          {user ? "댓글 작성" : "댓글은 로그인 후 이용해주세요."}
        </Text>
      </Button>
    </form>
  );
}
