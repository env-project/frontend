import z from "zod";
import Input from "@/components/input/AuthInput";
import type { ReactNode } from "react";
import ImageInput from "@/components/input/ImageInput";

const positionItemSchema = z.object({
  position_id: z.string(),
  experienced_level_id: z.string(),
});

const recruitmentPostSchema = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(1),

  imageUrl: z.string().optional(),
  bandName: z.string().optional(),
  bandComposition: z.string().optional(),
  activityTime: z.string().optional(),
  applicationMethod: z.string().optional(),
  practiceFrequencyTime: z.string().optional(),
  otherConditions: z.string().optional(),

  orientationId: z.string().optional(),
  recruitmentTypeId: z.string().optional(),

  regionIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema).optional(),
});

export default function RecruitmentNewPost() {
  return (
    <div>
      RecruitmentNewPost
      <form className="flex flex-col items-center jsutify-start space-y-1 w-full p-2 max-w-lg">
        <InputWithLabelContainer>
          <label htmlFor="title">제목*</label>
          <Input id="title" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-name">밴드 이름</label>
          <Input id="band-name" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-composition">밴드 구성</label>
          <Input id="band-composition" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="activity-time">주 활동 시간</label>
          <Input id="activity-time" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="practice-frequency-time">활동 간격</label>
          <Input id="practice-frequency-time" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="application-method">지원 방법</label>
          <Input id="application-method" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="other-conditions">기타 조건</label>
          <Input id="other-conditions" className="w-full" />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="title">대표 이미지</label>
          <ImageInput />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="title">자세한 설명*</label>
          <textarea id="title" className="w-full h-32 p-2 rounded-xl border" />
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
