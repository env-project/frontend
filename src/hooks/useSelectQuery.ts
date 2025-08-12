// hooks/useSelectQuery.ts
import { useSearchParams } from "react-router-dom";

type Mode = "multi" | "single";

export function useSelectQuery(key: string, mode: Mode = "multi") {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValues = searchParams.get(key)?.split(",").filter(Boolean) ?? [];

  const isSelected = (value: string) => selectedValues.includes(value);

  const toggleValue = (value: string) => {
    let updated: string[];

    if (mode === "single") {
      // 단일 선택 모드
      if (isSelected(value)) {
        updated = [];
      } else {
        updated = [value];
      }
    } else {
      // 다중 선택 모드
      if (isSelected(value)) {
        updated = selectedValues.filter((v) => v !== value);
      } else {
        updated = [...selectedValues, value];
      }
    }

    if (updated.length > 0) {
      searchParams.set(key, updated.join(","));
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  };

  return { selectedValues, isSelected, toggleValue };
}
