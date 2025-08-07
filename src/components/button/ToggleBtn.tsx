import clsx from "clsx";
import { useState } from "react";
import { MdSunny } from "react-icons/md";
import { TbMoonFilled } from "react-icons/tb";

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
    <>
      <button
        onClick={handleClick}
        className={clsx("cursor-pointer", className)}
        aria-pressed={isOn}
      >
        {/* 모바일 버전 토글 */}
        <span
          className={clsx(
            "transition-colors duration-300 ease-in-out flex p-1 border rounded-full   border-neutral-400 md:hidden ",
            isOn
              ? "text-neutral-200  hover:bg-neutral-400 "
              : "text-neutral-400 hover:bg-bg-secondary hover:text-text-primary"
          )}
        >
          {isOn ? <TbMoonFilled size={"16px"} /> : <MdSunny size={"16px"} />}
        </span>

        {/* pc버젼 토글 */}
        <span className="hidden md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24" viewBox="0 0 64 24">
            <rect
              width="54"
              height="24"
              rx="12"
              className={`transition-colors duration-300 ease-in-out ${isOn ? "fill-bg-on-dark" : "fill-neutral-400"}`}
            />
            <circle
              cx={isOn ? "41" : "13"}
              cy="12"
              r="10"
              className="transition-all duration-300 ease-in-out fill-white"
            />
          </svg>
        </span>
      </button>
    </>
  );
}
