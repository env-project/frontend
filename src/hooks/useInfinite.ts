// src/hooks/useInfinite.ts
import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from "@tanstack/react-query";

/** 각 페이지 표준 형태: 아이템 배열 + 다음 커서 */
export type InfinitePage<T> = {
  items: T[];
  next_cursor?: string | null | "";
};

/** 범용 무한스크롤 훅
 * - queryKey: React Query 키 (필터/정렬 등 포함)
 * - fetchPage: 페이지 로더(pageParam를 받아 다음 페이지를 반환)
 */
export function useInfinite<T>({
  queryKey,
  fetchPage,
}: {
  queryKey: unknown[];
  fetchPage: (args: { pageParam?: string }) => Promise<InfinitePage<T>>;
}): UseInfiniteQueryResult<InfiniteData<InfinitePage<T>, Error>> {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchPage({ pageParam }),
    initialPageParam: "0",
    getNextPageParam: (lastPage) =>
      lastPage.next_cursor ? String(lastPage.next_cursor) : undefined,
  });
}

/** 편의 함수: pages 배열을 평탄화하여 모든 items를 반환 */
export function flattenInfiniteItems<T>(data?: InfiniteData<InfinitePage<T>>) {
  return data?.pages.flatMap((p) => p.items) ?? [];
}
