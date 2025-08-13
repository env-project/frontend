import z from "zod";
import Input from "@/components/input/AuthInput";
import type { ReactNode } from "react";
import ImageInput from "@/components/input/ImageInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const positionItemSchema = z.object({
  position_id: z.string(),
  experienced_level_id: z.string(),
});

const recruitmentPostSchema = z.object({
  title: z.string().min(1, "1글자 이상").max(30, "30이하"),
  content: z.string().min(1),

  image: z.file().optional(),
  bandName: z.string().optional(),
  bandComposition: z.string().optional(),
  activityTime: z.string().optional(),
  contactInfo: z.string().optional(),
  applicationMethod: z.string().optional(),
  practiceFrequencyTime: z.string().optional(),
  otherConditions: z.string().optional(),

  orientationId: z.string().optional(),
  recruitmentTypeId: z.string().optional(),

  regionIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema).optional(),
});

type TRecruitmentPostSchema = z.infer<typeof recruitmentPostSchema>;

export default function RecruitmentNewPost() {
  const { register, setValue } = useForm<TRecruitmentPostSchema>({
    resolver: zodResolver(recruitmentPostSchema),
  });

  const onImageChange = (imageFile: File | null) => {
    if (!imageFile) return;
    setValue("image", imageFile);
  };

  return (
    <div>
      RecruitmentNewPost
      <form className="flex flex-col items-center jsutify-start space-y-1 w-full p-2 max-w-lg">
        <InputWithLabelContainer>
          <label htmlFor="title">제목*</label>
          <Input id="title" className="w-full" {...register("title")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-name">밴드 이름</label>
          <Input id="band-name" className="w-full" {...register("bandName")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-composition">밴드 구성</label>
          <Input id="band-composition" className="w-full" {...register("bandComposition")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="activity-time">주 활동 시간</label>
          <Input id="activity-time" className="w-full" {...register("activityTime")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="practice-frequency-time">활동 간격</label>
          <Input
            id="practice-frequency-time"
            className="w-full"
            {...register("practiceFrequencyTime")}
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="contact-info">연락 방법</label>
          <Input id="contact-info" className="w-full" {...register("contactInfo")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="application-method">지원 방법</label>
          <Input id="application-method" className="w-full" {...register("applicationMethod")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="other-conditions">기타 조건</label>
          <Input id="other-conditions" className="w-full" {...register("otherConditions")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="image">대표 이미지</label>
          <ImageInput id="image" onChange={onImageChange} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="content">자세한 설명*</label>
          <textarea
            id="content"
            className="w-full h-32 p-2 rounded-xl border"
            {...register("content")}
          />
        </InputWithLabelContainer>
      </form>
    </div>
  );
}

function InputWithLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-start space-y-0.5 w-full">{children}</div>
  );
}
