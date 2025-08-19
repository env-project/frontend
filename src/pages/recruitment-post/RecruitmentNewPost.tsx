import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Text from "@/components/text/Text";
import {
  recruitmentPostSchema,
  type TRecruitmentPostSchema,
} from "@/types/zod-schema/recruitment-post-schema";
import RecruitmentFormInputs from "@/components/recruitment-form/RecruitmentFormInputs";

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

        <Button type="submit">
          <Text className="text-text-on-dark">제출</Text>
        </Button>
      </form>
    </div>
  );
}
