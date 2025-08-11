import SkeletonText from "@/components/ui/SkeletonText";

export default function CommentCardSkeleton() {
  return (
    <div className="relative block rounded-xl p-4 border-2 bg-bg-primary border-primary-soft max-w-96">
      {/* 시간 */}
      <SkeletonText variant="tooltip" className="w-24 mb-2" />
      {/* 본문 2줄 */}
      <SkeletonText variant="h3" className="w-4/5 mb-2" />
      <SkeletonText variant="subText" className="w-2/3" />
      {/* 우하단 날짜 */}
      <SkeletonText variant="tooltip" className="w-20 absolute bottom-2 right-4" />
    </div>
  );
}
