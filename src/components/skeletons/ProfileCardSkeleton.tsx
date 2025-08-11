import Skeleton from "@/components/ui/Skeleton";
import SkeletonText from "@/components/ui/SkeletonText";

export default function ProfileCardSkeleton() {
  return (
    <div className="relative w-80 rounded-xl bg-bg-secondary px-4 pt-2 pb-5 border border-gray-300 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        {/* 좌: 아바타 */}
        <Skeleton className="w-12 h-12 rounded-full" />

        {/* 중앙: 닉네임 */}
        <div className="flex-1 text-center">
          <SkeletonText variant="h2" className="w-24 mx-auto" />
        </div>

        {/* 우: 북마크 */}
        <Skeleton className="h-6 w-6 rounded" />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <SkeletonText variant="label" className="w-10" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonText variant="label" className="w-10" />
          <SkeletonText variant="label" className="w-12" />
        </div>
      </div>

      <div className="mt-3 flex gap-4">
        <SkeletonText variant="label" className="w-16 mb-2" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-center">
        <SkeletonText variant="label" className="w-16 mb-2" />
        <SkeletonText variant="subText" className="w-40 mb-2" />
      </div>
    </div>
  );
}
