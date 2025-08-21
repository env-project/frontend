import type { ExperienceLevel, Position } from "@/types/api-res-common";
import { type FieldErrors } from "react-hook-form";
import Text from "@/components/text/Text";
import Button from "@/components/Button";

interface PositionItem {
  position_id: string;
  experienced_level_id: string;
}

interface PositionsInputProps {
  value: PositionItem[];
  onChange: (items: PositionItem[]) => void;
  errors?: FieldErrors<{ positions: PositionItem[] }>;
  positions: Position[];
  experienceLevels: ExperienceLevel[];
}

export default function PositionsInput({
  value,
  onChange,
  errors,
  positions,
  experienceLevels,
}: PositionsInputProps) {
  const handleRemove = (index: number) => {
    const newItems = [...value];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleAppend = () => {
    const newItems = [...value, { position_id: "", experienced_level_id: "" }];
    onChange(newItems);
  };

  const handlePositionChange = (index: number, positionId: string) => {
    const newItems = [...value];
    newItems[index].position_id = positionId;
    onChange(newItems);
  };

  const handleExperienceChange = (index: number, experienceId: string) => {
    const newItems = [...value];
    newItems[index].experienced_level_id = experienceId;
    onChange(newItems);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-4">
      <label className="w-full">모집 포지션(복수 선택 가능)</label>

      {value.map((item, index) => {
        const positionError = errors?.positions?.[index]?.position_id;
        const experiencedLevelError = errors?.positions?.[index]?.experienced_level_id;

        return (
          <div key={index} className="p-3 space-y-2 border rounded">
            {/* 포지션 선택 */}
            <div>
              <p className="font-medium">포지션 선택</p>
              <div className="flex flex-wrap gap-4 mt-1">
                {positions.map((position) => (
                  <label key={position.id} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={position.id}
                      checked={item.position_id === position.id}
                      onChange={() => handlePositionChange(index, position.id)}
                    />
                    {position.name}
                  </label>
                ))}
              </div>
              {positionError && (
                <Text className="text-error" variant="label">
                  {(positionError as any).message}
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
                      checked={item.experienced_level_id === experienceLevel.id}
                      onChange={() => handleExperienceChange(index, experienceLevel.id)}
                    />
                    {experienceLevel.name}
                  </label>
                ))}
              </div>
              {experiencedLevelError && (
                <Text className="text-error" variant="label">
                  {(experiencedLevelError as any).message}
                </Text>
              )}
            </div>

            {/* 삭제 버튼 */}
            <Button type="button" onClick={() => handleRemove(index)} color="error">
              <Text className="text-text-on-dark">삭제</Text>
            </Button>
          </div>
        );
      })}

      {/* 추가 버튼 */}
      <Button type="button" onClick={handleAppend} variant="default" color="primary">
        <Text className="text-text-on-dark">+ 포지션 추가</Text>
      </Button>
    </div>
  );
}
