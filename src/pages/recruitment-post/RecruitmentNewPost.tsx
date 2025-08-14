import z from "zod";
import Input from "@/components/input/AuthInput";
import type { ReactNode } from "react";
import ImageInput from "@/components/input/ImageInput";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MasterData } from "@/types/api-res-common";

//마스터 데이터 실제론 api로 받기
const MASTER_DATA: MasterData = {
  regions: [
    { id: "1", name: "서울 서부" },
    { id: "2", name: "서울 동부" },
    { id: "3", name: "서울 남부" },
    { id: "4", name: "서울 북부" },
    { id: "5", name: "인천" },
    { id: "6", name: "부산" },
    { id: "7", name: "대구" },
    { id: "8", name: "광주" },
    { id: "9", name: "대전" },
    { id: "10", name: "울산" },
    { id: "11", name: "제주" },
    { id: "12", name: "경기" },
    { id: "13", name: "강원" },
    { id: "14", name: "충북" },
    { id: "15", name: "충남" },
    { id: "16", name: "경북" },
    { id: "17", name: "경남" },
    { id: "18", name: "전북" },
    { id: "19", name: "전남" },
  ],
  positions: [
    { id: "p1", name: "보컬" },
    { id: "p2", name: "일렉 기타" },
    { id: "p3", name: "어쿠스틱 기타" },
    { id: "p4", name: "베이스" },
    { id: "p5", name: "드럼" },
    { id: "p6", name: "키보드" },
    { id: "p7", name: "그 외" },
  ],
  genres: [
    { id: "g1", name: "인디락" },
    { id: "g2", name: "K-pop" },
    { id: "g3", name: "J-pop" },
    { id: "g4", name: "메탈" },
    { id: "g5", name: "하드락" },
    { id: "g6", name: "재즈" },
    { id: "g7", name: "그 외" },
  ],
  experience_levels: [
    { id: "e1", name: "취미 1년 이하" },
    { id: "e2", name: "취미 3년 이하" },
    { id: "e3", name: "취미 5년 이하" },
    { id: "e4", name: "취미 5년 이상" },
    { id: "e5", name: "전공" },
    { id: "e6", name: "프로" },
  ],
  orientations: [
    { id: "o1", name: "취미" },
    { id: "o2", name: "프로" },
    { id: "o3", name: "프로 지향" },
  ],
  recruitment_types: [
    { id: "r1", name: "고정 밴드" },
    { id: "r2", name: "프로젝트 밴드" },
  ],
  recruiting_post_types: [],
};

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
  const { register, setValue, handleSubmit } = useForm<TRecruitmentPostSchema>({
    resolver: zodResolver(recruitmentPostSchema),
  });

  const onImageChange = (imageFile: File | null) => {
    if (!imageFile) return;
    setValue("image", imageFile);
  };

  const onSubmit = (form: TRecruitmentPostSchema) => {
    console.log(form);
  };

  return (
    <div>
      RecruitmentNewPost
      <form
        className="flex flex-col items-center jsutify-start space-y-1 w-full p-2 max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <CheckboxInputs
          register={register}
          name="orientationId"
          data={MASTER_DATA.orientations}
          type="radio"
        />

        <CheckboxInputs
          register={register}
          name="recruitmentTypeId"
          data={MASTER_DATA.recruitment_types}
          type="radio"
        />

        <CheckboxInputs register={register} name="genreIds" data={MASTER_DATA.genres} />

        <CheckboxInputs register={register} name="regionIds" data={MASTER_DATA.regions} />

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

        <button type="submit">제출</button>
      </form>
    </div>
  );
}

function InputWithLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-start space-y-0.5 w-full">{children}</div>
  );
}

interface CheckboxInputsProps {
  data: {
    id: string;
    name: string;
  }[];
  register: UseFormRegister<TRecruitmentPostSchema>;
  name: keyof TRecruitmentPostSchema;
  type?: "checkbox" | "radio";
}

function CheckboxInputs({ data, register, name, type = "checkbox" }: CheckboxInputsProps) {
  return (
    <div className="flex justify-start items-center flex-wrap gap-0.5">
      {data.map(({ name: label, id }) => (
        <div>
          <label htmlFor={id + label}>{label}</label>
          <input value={id} type={type} {...register(name)} />
        </div>
      ))}
    </div>
  );
}
