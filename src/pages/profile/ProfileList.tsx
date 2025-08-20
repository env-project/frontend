import { useRef, useEffect } from "react";
import Filter from "@/components/Filter";
import ProfileCard from "@/components/ProfileCard";
import { ProfileListLoading } from "@/components/skeletons/Loaders";
import InlineDots from "@/components/loading/InlineDots";
import { useInfinite } from "@/hooks/useInfinite";
import { useSearchParams } from "react-router";
import { buildProfilesQueryFromSearchParams } from "@/libs/buildProfilesquery";
import type { UserProfile } from "@/types/api-res-profile";
import { fetchProfilesInfinitePage } from "@/api/fetchProfilesInfinite";

const GRID =
  "grid gap-4 sm:gap-6 lg:gap-8 justify-items-center [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]";

function TwoColLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="self-start lg:sticky lg:top-20">
          <Filter filterType="profileFilter" className="w-full max-w-none" />
        </aside>
        <section className="relative min-w-0">{children}</section>
      </div>
    </div>
  );
}

export default function ProfileList() {
  const [searchParams] = useSearchParams();
  const query = buildProfilesQueryFromSearchParams(searchParams);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinite<UserProfile>({
      queryKey: ["profiles", query],
      fetchPage: ({ pageParam }) => fetchProfilesInfinitePage({ pageParam, query }),
    });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 마지막 센티널에 닿으면 다음 페이지 로드
  useEffect(() => {
    if (!loaderRef.current) return;
    const el = loaderRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "120px" }
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const pages = data?.pages ?? [];
  const profiles = pages.flatMap((p) => p.items);

  return (
    <TwoColLayout>
      <div className={GRID}>
        {/* 1) 첫 페이지 로딩 때만 스켈레톤 전체 렌더 */}
        {isLoading ? (
          <ProfileListLoading count={9} />
        ) : (
          <>
            {/* 2) 누적 카드 렌더 */}
            {profiles.map((profile) => (
              <ProfileCard key={profile.user_id} profile={profile} />
            ))}

            {/* 3) 하단 인디케이터(다음 페이지 로딩 중에만 표시) */}
            {isFetchingNextPage && <InlineDots />}

            {/* 4) 센티널: 보이기만 하면 다음 페이지 로드 트리거 */}
            {hasNextPage && <div ref={loaderRef} className="col-span-full h-4" />}
          </>
        )}
      </div>
    </TwoColLayout>
  );
}
