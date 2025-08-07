import clsx from "clsx";
import { MdSunny } from "react-icons/md";
import { TbMoonFilled } from "react-icons/tb";

interface MobileToggleBtnProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export default function MobileToggleBtn({ isDarkMode, onToggle, className }: MobileToggleBtnProps) {
  return (
    <button
      onClick={onToggle}
      className={clsx("cursor-pointer", className)}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "다크 모드 활성화됨" : "라이트 모드 활성화됨"}
    >
      <span
        className={clsx(
          "transition-colors duration-300 ease-in-out flex p-1 border rounded-full border-neutral-400 md:hidden",
          isDarkMode
            ? "text-neutral-200  hover:bg-neutral-400 "
            : "text-neutral-400 hover:bg-bg-secondary hover:text-text-primary"
        )}
      >
        {isDarkMode ? <TbMoonFilled size={"16px"} /> : <MdSunny size={"16px"} />}
      </span>
    </button>
  );
}
