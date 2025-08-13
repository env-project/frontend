import { cn } from "@/libs/utils";

export default function InlineDots() {
  return (
    <div
      className={cn("col-span-full", "flex items-center justify-center gap-2 py-6")}
      role="status"
      aria-live="polite"
    >
      <span className={cn("animate-pulse")}>•</span>
      <span className={cn("animate-pulse", "[animation-delay:100ms]")}>•</span>
      <span className={cn("animate-pulse", "[animation-delay:200ms]")}>•</span>
    </div>
  );
}
