import { cn } from "@/libs/utils";
import { useState, type ComponentProps } from "react";

interface ToggleBtnProps extends ComponentProps<"button"> {
  onToggleChange?: (isOn: boolean) => void;
  defaultOn?: boolean;
  className?: string;
}

export default function ToggleBtn({
  //토글상태 변경시 호출 함수
  onToggleChange,
  //컴포넌트 초기상태
  defaultOn = false,
  className,
  ...props
}: ToggleBtnProps) {
  const [isOn, setIsOn] = useState(defaultOn);

  const handleClick = () => {
    setIsOn((prev) => {
      const newState = !prev;
      //부모 컴포넌트로 상태 공유
      onToggleChange?.(newState);
      return newState;
    });
  };

  return (
    <button
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      aria-pressed={isOn}
      aria-label={isOn ? "활성화됨" : "비활성화됨"}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24">
        <rect
          width="64"
          height="24"
          rx="12"
          className={`transition-colors duration-300 ease-in-out ${isOn ? "fill-primary-thick" : "fill-neutral-400"}`}
        />
        <circle
          cx={isOn ? "51" : "13"}
          cy="12"
          r="10"
          className="transition-all duration-300 ease-in-out fill-white"
        />
      </svg>
    </button>
  );
}
