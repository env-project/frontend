import { cn } from "@/libs/utils";
import { useState } from "react";

interface ToggleBtnProps {
  onToggle?: (isOn: boolean) => void;
  defaultOn?: boolean;
  className?: string;
}

export default function ToggleBtn({ onToggle, defaultOn = false, className }: ToggleBtnProps) {
  const [isOn, setIsOn] = useState(defaultOn);

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <button onClick={handleClick} className={cn("cursor-pointer", className)} aria-pressed={isOn}>
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
