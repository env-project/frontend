import Filter from "@/components/Filter";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import RecruitmentCard from "@/components/RecruitmentCard";
import H1 from "@/components/text/H1";
import api from "@/libs/axios";
import type { PostList } from "@/types/api-res-recruitment";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export default function RecruitmentList() {
  const { data, isPending } = useQuery<AxiosResponse<PostList>>({
    queryKey: ["recruiment-list"],
    queryFn: () => {
      return api.get("/recruiting");
    },
  });

  return (
    <div className="p-4 gap-2 flex flex-col sm:flex-row bg-bg-primary text-text-primary">
      <Filter filterType="recruitmentPostFilter" />
      {isPending ? (
        <LoadingOverlay />
      ) : data ? (
        <div className="flex flex-wrap gap-2 w-full justify-start items-center">
          {data.data.posts.map((post) => (
            <RecruitmentCard postData={post} key={post.id} />
          ))}
        </div>
      ) : (
        <H1>데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</H1>
      )}
    </div>
  );
}
