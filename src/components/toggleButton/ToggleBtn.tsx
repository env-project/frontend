import MobileToggleBtn from "@/components/toggleButton/MobileToggleBtn";
import PCToggleBtn from "@/components/toggleButton/PCToggleBtn";
import clsx from "clsx";

interface ToggleBtnProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export default function ToggleBtn({ isDarkMode, onToggle, className }: ToggleBtnProps) {
  return (
    <>
      <MobileToggleBtn
        isDarkMode={isDarkMode}
        onToggle={onToggle}
        className={clsx(className, "md:hidden")}
      />
      <PCToggleBtn
        isDarkMode={isDarkMode}
        onToggle={onToggle}
        className={clsx(className, "hidden md:flex")}
      />
    </>
  );
}
