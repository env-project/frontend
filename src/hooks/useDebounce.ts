import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMS = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMS);

    // cleanup timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMS]);

  return debouncedValue;
}
