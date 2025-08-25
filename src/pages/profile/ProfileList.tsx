import { useEffect } from "react";
import Filter from "@/components/Filter";
import ProfileCard from "@/components/ProfileCard";
import { ProfileListLoading } from "@/components/skeletons/Loaders";

import { useSearchParams } from "react-router";
import type { UserList } from "@/types/api-res-profile";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/libs/axios";
import H1 from "@/components/text/H1";

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
  const debouncedSearchParams = useDebounce(searchParams);
  // const query = buildProfilesQueryFromSearchParams(searchParams);
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  //   useInfinite<UserProfile>({
  //     queryKey: ["profiles", query],
  //     fetchPage: ({ pageParam }) => fetchProfilesInfinitePage({ pageParam, query }),
  //   });

  // const loaderRef = useRef<HTMLDivElement | null>(null);

  // 마지막 센티널에 닿으면 다음 페이지 로드
  // useEffect(() => {
  //   if (!loaderRef.current) return;
  //   const el = loaderRef.current;

  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     { rootMargin: "120px" }
  //   );

  //   io.observe(el);
  //   return () => io.unobserve(el);
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // const pages = data?.pages ?? [];
  // const profiles = pages.flatMap((p) => p.items);

  const { data, isPending, refetch } = useQuery<UserList>({
    queryKey: ["profile", debouncedSearchParams.toString()],
    queryFn: async () => {
      const res = await api.get("/profiles", { params: debouncedSearchParams });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchParams, refetch]);

  return (
    <TwoColLayout>
      <div className={GRID}>
        {/* 1) 첫 페이지 로딩 때만 스켈레톤 전체 렌더 */}
        {isPending ? (
          <ProfileListLoading count={9} />
        ) : (
          <>
            {/* 2) 누적 카드 렌더 */}
            {data ? (
              data.profiles.length > 0 ? (
                data.profiles.map((profile) => (
                  <ProfileCard key={profile.user_id} profile={profile} />
                ))
              ) : (
                <H1>조건에 맞는 데이터가 없습니다.</H1>
              )
            ) : (
              <H1>데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</H1>
            )}
            {/* 
           3) 하단 인디케이터(다음 페이지 로딩 중에만 표시)
            isFetchingNextPage && <InlineDots />

             4) 센티널: 보이기만 하면 다음 페이지 로드 트리거 
            hasNextPage && <div ref={loaderRef} className="col-span-full h-4" /> */}
          </>
        )}
      </div>
    </TwoColLayout>
  );
}
