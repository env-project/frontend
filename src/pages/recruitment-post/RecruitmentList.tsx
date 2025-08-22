import Filter from "@/components/Filter";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import RecruitmentCard from "@/components/RecruitmentCard";
import H1 from "@/components/text/H1";
import { useUserInfo } from "@/hooks/api/useUserInfo";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/libs/axios";
import type { PostList } from "@/types/api-res-recruitment";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function RecruitmentList() {
  const [searchParams] = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams);

  const { data, isPending, refetch } = useQuery<PostList>({
    queryKey: ["recruiment-list", debouncedSearchParams.toString()],
    queryFn: async () => {
      const res = await api.get("/recruiting", { params: debouncedSearchParams });
      return res.data;
    },
  });

  useEffect(() => {
    console.log(debouncedSearchParams.toString());
    refetch();
  }, [debouncedSearchParams, refetch]);

  const user = useUserInfo();

  return (
    <div className="p-4 gap-2 flex flex-col items-start sm:flex-row bg-bg-primary text-text-primary">
      <Filter filterType="recruitmentPostFilter" isLogin={!!user} />
      {isPending ? (
        <LoadingOverlay />
      ) : data ? (
        <div className="flex flex-wrap gap-2 w-full justify-start items-center">
          {data.posts.map((post) => (
            <RecruitmentCard postData={post} key={post.id} className="h-64" />
          ))}
        </div>
      ) : (
        <H1>데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</H1>
      )}
    </div>
  );
}
