import Button from "@/components/Button";
import RecruitmentFormInputs from "@/components/recruitment-form/RecruitmentFormInputs";
import Text from "@/components/text/Text";
import TogglePostStatusModal from "@/components/TogglePostStatusModal";
import useRecruitmentDetail from "@/hooks/api/useRecruitmentDetail";
import { mapDefaultDataToFormValues } from "@/libs/utils";
import {
  recruitmentPostSchema,
  type TRecruitmentPostSchema,
} from "@/types/zod-schema/recruitment-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

export default function RecruitmentFix() {
  const { postId } = useParams();

  const { data: defaultData } = useRecruitmentDetail(postId || "");

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
    //TODO: 실제 API 연결하기
    //optional은 빈값을 보내는게 아니라 아예 key 값을 보내면 안 됨
    console.log(form);
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
        />

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
