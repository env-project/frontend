import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/libs/axios";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import ProfileCard from "@/components/ProfileCard";
import type { UserList } from "@/types/api-res-profile";

export default function PopularProfileList() {
  const [searchParams] = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams);

  const { data, isPending, refetch } = useQuery<UserList>({
    queryKey: ["popular-Profile-list", { sort_by: "views", limit: 20 }],
    queryFn: async () => {
      const res = await api.get("/profiles", {
        params: {
          sort_by: "views",
          limit: 20,
        },
      });
      console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    console.log("apiProfile", data);
    console.log(debouncedSearchParams.toString());
    refetch();
  }, [debouncedSearchParams]);

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (!data || !data.profiles || data.profiles.length === 0) {
    return (
      <div>
        <h1>인기 프로필이 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-2 p-4 bg-bg-primary text-text-primary">
      <div className="flex flex-wrap items-center justify-center w-full gap-2">
        {data.profiles.map((post) => (
          <ProfileCard profile={post} key={post.user_id} />
        ))}
      </div>
    </div>
  );
}
