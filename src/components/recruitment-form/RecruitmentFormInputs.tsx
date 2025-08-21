import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";
import { Controller, type UseFormReturn } from "react-hook-form";
import Input from "@/components/input/Input";
import ImageInput from "@/components/input/ImageInput";
import type { MasterData } from "@/types/api-res-common";

import Text from "@/components/text/Text";
import InputWithLabelContainer from "@/components/recruitment-form/InputWithLabelContainer";
import PositionsInput from "@/components/recruitment-form/PositionsInput";
import CheckboxInputs from "@/components/recruitment-form/CheckboxInputs";

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
    { id: "e2", name: "취미 1~3년" },
    { id: "e3", name: "취미 3~5년" },
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

interface RecruitmentFormInputsProps {
  formData: UseFormReturn<TRecruitmentPostSchema>;
  onImageChange: (imageFile: File | null) => void;
  className?: string;
  defaultImageUrl?: string;
}

export default function RecruitmentFormInputs({
  formData,
  onImageChange,
  className = "",
  defaultImageUrl,
}: RecruitmentFormInputsProps) {
  const {
    register,
    formState: { errors },
    control,
  } = formData;

  return (
    <div className={className}>
      <InputWithLabelContainer>
        <label htmlFor="title">제목*</label>
        <Input id="title" className="w-full" {...register("title")} error={errors.title?.message} />
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

      <Controller
        name="positions"
        control={control}
        render={({ field }) => (
          <PositionsInput
            value={field.value || []}
            onChange={field.onChange}
            errors={errors}
            positions={MASTER_DATA.positions}
            experienceLevels={MASTER_DATA.experience_levels}
          />
        )}
      />

      <InputWithLabelContainer>
        <label>밴드 성격</label>
        <Controller
          name="orientationId"
          control={control}
          render={({ field }) => (
            <CheckboxInputs
              name="orientationId"
              data={MASTER_DATA.orientations}
              value={field.value ? [field.value] : []}
              onChange={(values) => field.onChange(values[0])}
              type="radio"
            />
          )}
        />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>밴드 형태</label>
        <Controller
          name="recruitmentTypeId"
          control={control}
          render={({ field }) => (
            <CheckboxInputs
              name={field.name}
              data={MASTER_DATA.recruitment_types}
              value={field.value ? [field.value] : []}
              onChange={(values) => field.onChange(values[0])}
              type="radio"
            />
          )}
        />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>선호 장르(복수 선택 가능)</label>
        <Controller
          name="genreIds"
          control={control}
          render={({ field }) => (
            <CheckboxInputs
              name={field.name}
              data={MASTER_DATA.genres}
              value={field.value || []}
              onChange={field.onChange}
              type="checkbox"
            />
          )}
        />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>활동 지역(복수 선택 가능)</label>
        <Controller
          name="regionIds"
          control={control}
          render={({ field }) => (
            <CheckboxInputs
              name={field.name}
              data={MASTER_DATA.regions}
              value={field.value || []}
              onChange={field.onChange}
              type="checkbox"
            />
          )}
        />
      </InputWithLabelContainer>

      <div className="flex flex-col justify-center items-center space-y-0.5 w-full">
        <label htmlFor="image" className="w-full">
          대표 이미지
        </label>
        <ImageInput id="image" onChange={onImageChange} defaultImage={defaultImageUrl} />
      </div>

      <InputWithLabelContainer>
        <label htmlFor="content">자세한 설명*</label>
        <textarea
          id="content"
          className="w-full h-32 p-2 border rounded-xl focus:outline-none"
          {...register("content")}
        />
        {errors.content ? (
          <Text className="text-error" variant="label">
            {errors.content.message}
          </Text>
        ) : null}
      </InputWithLabelContainer>
    </div>
  );
}
