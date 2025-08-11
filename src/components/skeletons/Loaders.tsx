import RecruitingPostCardSkeleton from "./RecruitmentCardSkeleton";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import CommentItemSkeleton from "./CommentCardSkeleton";

export function RecruitingPostListLoading({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <RecruitingPostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProfileListLoading({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProfileCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CommentListLoading({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CommentItemSkeleton key={i} />
      ))}
    </div>
  );
}
