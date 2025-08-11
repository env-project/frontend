import InlineSpinner from "./InlineSpinner";

export default function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/30 backdrop-blur-sm"
      role="status"
      aria-busy="true"
      aria-label="로딩 중"
    >
      <InlineSpinner className="text-primary" />
    </div>
  );
}
