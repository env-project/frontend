import type { ExperienceLevel, Position } from "@/types/api-res-common";
import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import Text from "@/components/text/Text";
import Button from "@/components/Button";

interface PositionsInputProps {
  control: Control<TRecruitmentPostSchema>;
  register: UseFormRegister<TRecruitmentPostSchema>;
  errors?: FieldErrors<TRecruitmentPostSchema>;
  positions: Position[];
  experienceLevels: ExperienceLevel[];
}

export default function PositionsInput({
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
