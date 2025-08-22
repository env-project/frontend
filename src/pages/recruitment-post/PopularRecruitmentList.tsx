import { useQuery } from "@tanstack/react-query";
import type { PostList } from "@/types/api-res-recruitment";
import { useEffect } from "react";
import api from "@/libs/axios";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import RecruitmentCard from "@/components/RecruitmentCard";
import LoadingOverlay from "@/components/loading/LoadingOverlay";

export default function PopularRecruitmentList() {
  const [searchParams] = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams);

  const { data, isPending, refetch } = useQuery<PostList>({
    queryKey: ["popular-recruitment-list", { sort_by: "views", limit: 20 }],
    queryFn: async () => {
      const res = await api.get("/recruiting", {
        params: {
          sort_by: "views",
          limit: 20,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    console.log("api", data);
    console.log(debouncedSearchParams.toString());
    refetch();
  }, [data]);

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div>
        <h1>인기 구인글이 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-2 p-4 bg-bg-primary text-text-primary">
      <div className="flex flex-wrap items-center justify-center w-full gap-2">
        {data.posts.map((post) => (
          <RecruitmentCard postData={post} key={post.id} className="h-64" />
        ))}
      </div>
    </div>
  );
}
