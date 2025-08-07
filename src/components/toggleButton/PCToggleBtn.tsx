import clsx from "clsx";

interface PCToggleBtnProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export default function PCToggleBtn({ isDarkMode, onToggle, className }: PCToggleBtnProps) {
  return (
    <button
      onClick={onToggle}
      className={clsx("cursor-pointer", className)}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "다크 모드 활성화됨" : "라이트 모드 활성화됨"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24" viewBox="0 0 64 24">
        <rect
          width="50"
          height="24"
          rx="12"
          className={`transition-colors duration-300 ease-in-out ${isDarkMode ? "fill-bg-on-dark" : "fill-neutral-400"}`}
        />
        <circle
          cx={isDarkMode ? "38" : "13"}
          cy="12"
          r="10"
          className="transition-all duration-300 ease-in-out fill-white"
        />
      </svg>
    </button>
  );
}
