import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";

type Tone = "soft" | "contrast";

interface Props extends ComponentPropsWithoutRef<"div"> {
  tone?: Tone; // 배경 대비
  anim?: boolean;
}

/** 공통 스켈레톤 바 */
export default function Skeleton({ className, tone = "contrast", anim = true, ...rest }: Props) {
  const toneClass =
    tone === "contrast" ? "bg-gray-300 dark:bg-gray-600" : "bg-gray-200/80 dark:bg-gray-700/50";

  return (
    <div
      role="status"
      aria-busy="true"
      className={cn(
        "relative overflow-hidden rounded-md",
        "animate-pulse motion-reduce:before:animate-none",
        toneClass,
        anim &&
          'before:content-[""] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_ease_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent',
        className
      )}
      {...rest}
    />
  );
}
