import Button from "@/components/Button";
import RecruitmentFormInputs from "@/components/recruitment-form/RecruitmentFormInputs";
import Text from "@/components/text/Text";
import TogglePostStatusModal from "@/components/TogglePostStatusModal";
import useMutateImage from "@/hooks/api/useMutateImage";
import useRecruitmentDetail from "@/hooks/api/useRecruitmentDetail";
import api from "@/libs/axios";
import { changeRecruitmentFormToRequestData } from "@/libs/changeRecruitmentDataForm";
import { mapDefaultDataToFormValues } from "@/libs/utils";
import {
  recruitmentPostSchema,
  type TRecruitmentPostSchema,
} from "@/types/zod-schema/recruitment-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function RecruitmentFix() {
  const { postId } = useParams();

  const { data: defaultData } = useRecruitmentDetail(postId || "");

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const { mutate: mutateImage } = useMutateImage();

  const { mutate: mutateForm } = useMutation({
    mutationFn: (form: TRecruitmentPostSchema & { image_url?: string }) => {
      //TODO: 이미지 API 나오면 이미지도 연결
      const requestData = changeRecruitmentFormToRequestData(form);
      return api.patch(`/recruiting/${postId}`, { ...requestData, image_url: form.image_url });
    },
    onSuccess: () => {
      navigate(`/recruitment-post/${postId}`);
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          setApiError("로그인 후 이용해주세요.");
        } else if (e.status === 403) {
          setApiError("자신의 글만 수정할 수 있습니다.");
        } else if (e.status === 404) {
          setApiError("존재하지 않는 글입니다.");
        } else if (e.status === 422) {
          setApiError("잘못된 형식의 데이터입니다.");
        } else {
          setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      } else {
        setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });

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

  //값 기본값 넣기
  useEffect(() => {
    if (defaultData) {
      formData.reset(mapDefaultDataToFormValues(defaultData));
    }
  }, [defaultData, formData]);

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

  if (!postId) {
    return <div>해당 게시물은 존재하기 않습니다.</div>;
  }
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
          defaultImageUrl={defaultData?.image_url}
        />
        <Text variant="label" className="text-error">
          {apiError}
        </Text>

        <div className="flex justify-center items-center space-x-1">
          <Button type="submit">
            <Text className="text-text-on-dark">수정하기</Text>
          </Button>
          <TogglePostStatusModal postId={postId} isClosed={false} />
        </div>
      </form>
    </div>
  );
}
