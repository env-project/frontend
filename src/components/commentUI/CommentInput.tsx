import Text from "@/components/text/Text";
import { cn } from "@/libs/utils";
import type { ComponentPropsWithoutRef } from "react";
import Input from "@/components/input/Input";
import Button from "../Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  } = useForm<TCommentSchema>({ resolver: zodResolver(commentSchema) });

  const onSubmit = (form: TCommentSchema) => {
    console.log(form);
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
      <Button type="submit">
        <Text className="text-text-on-dark">댓글 작성</Text>
      </Button>
    </form>
  );
}
