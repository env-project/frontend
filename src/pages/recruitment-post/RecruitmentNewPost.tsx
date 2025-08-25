import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Text from "@/components/text/Text";
import {
  recruitmentPostSchema,
  type TRecruitmentPostSchema,
} from "@/types/zod-schema/recruitment-post-schema";
import RecruitmentFormInputs from "@/components/recruitment-form/RecruitmentFormInputs";
import { useMutation } from "@tanstack/react-query";
import api from "@/libs/axios";
import { changeRecruitmentFormToRequestData } from "@/libs/changeRecruitmentDataForm";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import useMutateImage from "@/hooks/api/useMutateImage";

export default function RecruitmentNewPost() {
  const formData = useForm<TRecruitmentPostSchema>({
    resolver: zodResolver(recruitmentPostSchema),
    defaultValues: {
      positions: [],
      regionIds: [],
      genreIds: [],
      orientationId: "",
      recruitmentTypeId: "",
    },
  });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const { mutate: mutateImage } = useMutateImage();

  const { mutate: mutateForm } = useMutation({
    mutationFn: (form: TRecruitmentPostSchema & { image_url?: string }) => {
      //TODO: 이미지 API 나오면 이미지도 연결
      const requestData = changeRecruitmentFormToRequestData(form);

      return api.post("/recruiting", { ...requestData, image_url: form.image_url });
    },
    onSuccess: () => {
      navigate("/recruitment-post");
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          setApiError("로그인 후 이용해주세요.");
        } else if (e.status === 400) {
          setApiError("필수 입력 필드를 입력해주세요.");
        } else if (e.status === 422) {
          setApiError("잘못된 형식의 데이터입니다.");
        } else {
          setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      }
      setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const { setValue, handleSubmit } = formData;

  const onImageChange = (imageFile: File | null) => {
    if (!imageFile) return;
    setValue("image", imageFile);
  };

  const onSubmit = (form: TRecruitmentPostSchema) => {
    if (form.image) {
      mutateImage(form.image, {
        onSuccess: (data) => {
          mutateForm({ ...form, image_url: data.image_url });
        },
        onError: () => {
          setApiError("이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
        },
      });
    } else {
      mutateForm(form);
    }
  };

  return (
    <div className="w-full bg-bg-primary flex justify-center text-text-primary">
      <form
        className="flex flex-col items-center jsutify-start space-y-6 w-full p-2 max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RecruitmentFormInputs
          onImageChange={onImageChange}
          formData={formData}
          className="flex flex-col items-center jsutify-start space-y-6 w-full"
        />

        <Text variant="label" className="text-error">
          {apiError}
        </Text>

        <Button type="submit">
          <Text className="text-text-on-dark">제출</Text>
        </Button>
      </form>
    </div>
  );
}
