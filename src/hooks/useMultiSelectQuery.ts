import { useSearchParams } from "react-router-dom";

export function useMultiSelectQuery(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValues = searchParams.get(key)?.split(",").filter(Boolean) ?? [];

  /** 선택된 값에 포함되는지 여부 */
  const isSelected = (value: string) => selectedValues.includes(value);

  /** 값 토글 (추가/제거) */
  const toggleValue = (value: string) => {
    let updated: string[];

    if (isSelected(value)) {
      updated = selectedValues.filter((v) => v !== value);
    } else {
      updated = [...selectedValues, value];
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
