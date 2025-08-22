import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";
import { type UseFormReturn } from "react-hook-form";
import Input from "@/components/input/Input";
import ImageInput from "@/components/input/ImageInput";

import Text from "@/components/text/Text";
import InputWithLabelContainer from "@/components/recruitment-form/InputWithLabelContainer";
import PositionsInput from "@/components/recruitment-form/PositionsInput";
import CheckboxInputs from "@/components/recruitment-form/CheckboxInputs";

import LoadingOverlay from "../loading/LoadingOverlay";
import H1 from "../text/H1";
import useMasterData from "@/hooks/api/useMasterData";

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

  const { isPending, data: masterData } = useMasterData();

  return isPending ? (
    <LoadingOverlay />
  ) : masterData ? (
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

      <PositionsInput
        register={register}
        errors={errors}
        control={control}
        positions={masterData.positions}
        experienceLevels={masterData.experience_levels}
      />

      <InputWithLabelContainer>
        <label>밴드 성격</label>
        <CheckboxInputs
          register={register}
          name="orientationId"
          data={masterData.orientations}
          type="radio"
        />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>밴드 형태</label>
        <CheckboxInputs
          register={register}
          name="recruitmentTypeId"
          data={masterData.recruitment_types}
          type="radio"
        />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>선호 장르(복수 선택 가능)</label>
        <CheckboxInputs register={register} name="genreIds" data={masterData.genres} />
      </InputWithLabelContainer>

      <InputWithLabelContainer>
        <label>활동 지역(복수 선택 가능)</label>
        <CheckboxInputs register={register} name="regionIds" data={masterData.regions} />
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
          className="w-full h-32 p-2 rounded-xl border focus:outline-none"
          {...register("content")}
        />
        {errors.content ? (
          <Text className="text-error" variant="label">
            {errors.content.message}
          </Text>
        ) : null}
      </InputWithLabelContainer>
    </div>
  ) : (
    <H1 className="text-text-primary">데이터 로딩에 실패했습니다. 잠시후 다시 시도해주세요.</H1>
  );
}
