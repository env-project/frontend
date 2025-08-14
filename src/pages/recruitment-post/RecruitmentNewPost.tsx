import z from "zod";
import Input from "@/components/input/AuthInput";
import { type ReactNode } from "react";
import ImageInput from "@/components/input/ImageInput";
import {
  useFieldArray,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ExperienceLevel, MasterData, Position } from "@/types/api-res-common";
import Button from "@/components/Button";
import Text from "@/components/text/Text";
import BadgeCheckBox from "@/components/BadgeCheckbox";

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
  title: z.string().min(1, "1글자 이상으로 작성해주세요").max(20, "20글자 이하로 작성해주세요"),
  content: z.string().min(1, "1글자 이상으로 작성해주세요").max(500, "500글자 이하로 작성해주세요"),

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
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRecruitmentPostSchema>({
    resolver: zodResolver(recruitmentPostSchema),
    defaultValues: {
      positions: [],
      regionIds: [],
      genreIds: [],
      orientationId: "",
      recruitmentTypeId: "",
    },
  });

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
        className="flex flex-col items-center jsutify-start space-y-3 w-full p-2 max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWithLabelContainer>
          <label htmlFor="title">제목*</label>
          <Input
            id="title"
            className="w-full"
            {...register("title")}
            error={errors.title?.message}
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-name">밴드 이름</label>
          <Input id="band-name" className="w-full" {...register("bandName")} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="band-composition">밴드 구성</label>
          <Input
            id="band-composition"
            className="w-full placeholder:text-neutral-400"
            {...register("bandComposition")}
            placeholder="e.g. 남보컬 1명, 드럼 1명, 베이스 1명"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="activity-time">주 활동 시간</label>
          <Input
            id="activity-time"
            className="w-full placeholder:text-neutral-400"
            {...register("activityTime")}
            placeholder="e.g. 토요일 오후 4시, 수요일 오후 8시"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="practice-frequency-time">활동 간격</label>
          <Input
            id="practice-frequency-time placeholder:text-neutral-400"
            className="w-full placeholder:text-neutral-400"
            {...register("practiceFrequencyTime")}
            placeholder="e.g. 격주"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="contact-info">연락 방법</label>
          <Input
            id="contact-info"
            className="w-full placeholder:text-neutral-400"
            {...register("contactInfo")}
            placeholder="이메일, 오픈채팅링크 등"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="application-method">지원 방법</label>
          <Input
            id="application-method"
            className="w-full placeholder:text-neutral-400"
            {...register("applicationMethod")}
            placeholder="e.g. 연주 영상 이메일 첨부"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label htmlFor="other-conditions">기타 조건</label>
          <Input
            id="other-conditions"
            className="w-full placeholder:text-neutral-400"
            {...register("otherConditions")}
            placeholder="e.g. 공연경험 필수"
          />
        </InputWithLabelContainer>

        <PositionsInput
          register={register}
          errors={errors}
          control={control}
          positions={MASTER_DATA.positions}
          experienceLevels={MASTER_DATA.experience_levels}
        />

        <InputWithLabelContainer>
          <label>밴드 성격</label>
          <CheckboxInputs
            register={register}
            name="orientationId"
            data={MASTER_DATA.orientations}
            type="radio"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label>밴드 형태</label>
          <CheckboxInputs
            register={register}
            name="recruitmentTypeId"
            data={MASTER_DATA.recruitment_types}
            type="radio"
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label>선호 장르(복수 선택 가능)</label>
          <CheckboxInputs register={register} name="genreIds" data={MASTER_DATA.genres} />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label>활동 지역(복수 선택 가능)</label>
          <CheckboxInputs register={register} name="regionIds" data={MASTER_DATA.regions} />
        </InputWithLabelContainer>

        <div className="flex flex-col justify-center items-center space-y-0.5 w-full">
          <label htmlFor="image" className="w-full">
            대표 이미지
          </label>
          <ImageInput id="image" onChange={onImageChange} />
        </div>

        <InputWithLabelContainer>
          <label htmlFor="content">자세한 설명*</label>
          <textarea
            id="content"
            className="w-full h-32 p-2 rounded-xl border focus:outline-none"
            {...register("content")}
          />
          {errors.content ? (
            <Text className="text-error" variant="label">
              {errors.content.message}
            </Text>
          ) : null}
        </InputWithLabelContainer>

        <Button type="submit">
          <Text className="text-text-on-dark">제출</Text>
        </Button>
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
        // <div key={id}>
        //   <label htmlFor={id + label}>{label}</label>
        //   <input value={id} type={type} {...register(name)} />
        // </div>
        <BadgeCheckBox
          key={id}
          label={label}
          value={id}
          type={type}
          {...register(name)}
          className="text-text-on-dark"
        />
      ))}
    </div>
  );
}

interface PositionsInputProps {
  control: Control<TRecruitmentPostSchema>;
  register: UseFormRegister<TRecruitmentPostSchema>;
  errors?: FieldErrors<TRecruitmentPostSchema>;
  positions: Position[];
  experienceLevels: ExperienceLevel[];
}

function PositionsInput({
  control,
  register,
  errors,
  positions,
  experienceLevels,
}: PositionsInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions",
  });

  return (
    <div className="space-y-4 w-full flex flex-col justify-start items-center">
      <label className="w-full ">모집 포지션(복수 선택 가능)</label>

      {fields.map((field, index) => {
        const positionError = errors?.positions?.[index]?.position_id;
        const experiencedLevelError = errors?.positions?.[index]?.experienced_level_id;

        return (
          <div key={field.id} className="space-y-2 border p-3 rounded">
            {/* 포지션 선택 */}
            <div>
              <p className="font-medium">포지션 선택</p>
              <div className="flex flex-wrap gap-4 mt-1">
                {positions.map((position) => (
                  <label key={position.id} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={position.id}
                      {...register(`positions.${index}.position_id`)}
                    />
                    {position.name}
                  </label>
                ))}
              </div>
              {positionError && (
                <Text className="text-error" variant="label">
                  {positionError.message}
                </Text>
              )}
            </div>

            {/* 숙련도 선택 */}
            <div>
              <p className="font-medium">숙련도 선택</p>
              <div className="flex flex-wrap gap-4 mt-1">
                {experienceLevels.map((experienceLevel) => (
                  <label key={experienceLevel.id} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={experienceLevel.id}
                      {...register(`positions.${index}.experienced_level_id`)}
                    />
                    {experienceLevel.name}
                  </label>
                ))}
              </div>
              {experiencedLevelError && (
                <Text className="text-error" variant="label">
                  {experiencedLevelError.message}
                </Text>
              )}
            </div>

            {/* 삭제 버튼 */}
            <Button type="button" onClick={() => remove(index)} color="error">
              <Text className="text-text-on-dark">삭제</Text>
            </Button>
          </div>
        );
      })}

      {/* 추가 버튼 */}
      <Button
        type="button"
        onClick={() => append({ position_id: "", experienced_level_id: "" })}
        variant="default"
        color="primary"
      >
        <Text className="text-text-on-dark">+ 포지션 추가</Text>
      </Button>
    </div>
  );
}
