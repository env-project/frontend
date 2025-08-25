import Button from "@/components/Button";
import Filter from "@/components/Filter";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import RecruitmentCard from "@/components/RecruitmentCard";
import H1 from "@/components/text/H1";
import Text from "@/components/text/Text";
import { useUserInfo } from "@/hooks/api/useUserInfo";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/libs/axios";
import type { PostList } from "@/types/api-res-recruitment";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type JSX } from "react";
import { Link, useSearchParams } from "react-router";

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

  const { data: userData } = useUserInfo();

  return (
    <div className="p-4 gap-2 flex flex-col items-center justify-start sm:items-start sm:justify-start sm:flex-row bg-bg-primary text-text-primary min-h-screen">
      <div className="flex flex-col items-start space-y-1">
        <Filter filterType="recruitmentPostFilter" isLogin={!!userData} className="w-full" />
        {userData ? (
          <Link to="/recruitment-post/new-post">
            <Button>
              <Text className="text-text-on-dark">글 작성</Text>
            </Button>
          </Link>
        ) : null}
      </div>

      {(() => {
        let content: JSX.Element;

        if (isPending) {
          content = <LoadingOverlay />;
        } else if (data) {
          if (data.posts.length > 0) {
            content = (
              <div className="flex flex-wrap gap-2 w-full justify-center items-center">
                {data.posts.map((post) => (
                  <RecruitmentCard postData={post} key={post.id} className="h-76" />
                ))}
              </div>
            );
          } else {
            content = <H1>조건에 맞는 글이 없습니다.</H1>;
          }
        } else {
          content = <H1>데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</H1>;
        }

        return content;
      })()}
    </div>
  );
}
