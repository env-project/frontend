import Skeleton from "@/components/ui/Skeleton";
import SkeletonText from "@/components/ui/SkeletonText";
import { cn } from "@/libs/utils";

export default function RecruitmentCardSkeleton() {
  return (
    <div
      className={cn(
        "block min-w-0 relative isolate overflow-hidden",
        "rounded-xl border border-gray-300 bg-bg-secondary p-5 text-text-primary shadow-sm",
        "w-full max-w-96"
      )}
      role="status"
      aria-busy="true"
      aria-label="로딩 중"
    >
      {/* 헤더: 제목 + 북마크 */}
      <div className="flex w-full items-center gap-3">
        <SkeletonText variant="h3" className="flex-1 min-w-0" />
        <Skeleton className="h-6 w-6 shrink-0 rounded" />
      </div>

      {/* 배지 / 작성자·시간 */}
      <div className="mt-2 mb-3 flex w-full items-center justify-between">
        <Skeleton className="h-6 w-16 rounded-full" />
        <div className="flex items-center gap-2">
          <SkeletonText variant="subText" className="w-20" />
          <SkeletonText variant="subText" className="w-10" />
        </div>
      </div>

      {/* 본문 */}
      <div className="flex w-full flex-col gap-4 sm:flex-row min-w-0">
        <div className="flex flex-1 min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <SkeletonText variant="mainText" className="w-12" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonText variant="mainText" className="w-10" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonText variant="mainText" className="w-16" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonText variant="mainText" className="w-10" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>

        {/* 우측 메타 */}
        <div className="flex flex-col items-end justify-end pr-1">
          <div className="flex items-center gap-3">
            <SkeletonText variant="subText" className="w-10" />
            <SkeletonText variant="subText" className="w-10" />
            <SkeletonText variant="subText" className="w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
