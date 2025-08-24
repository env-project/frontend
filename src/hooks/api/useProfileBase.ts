import { useMemo } from "react";
import type { AxiosError } from "axios";
import { useMe } from "./useMe";
import { useProfileDetail } from "./useProfileDetail";
import { useMyProfile } from "./useMyprofile";
import { normTags, toPositions } from "@/libs/profileNormalizers";

type UseProfileBaseResult = {
  isMine: boolean;
  resolvedUserId: string | null;
  base: null | {
    user_id: string;
    nickname: string;
    image_url: string;
    email: string;
    is_public: boolean;
    is_bookmarked: boolean;
    regions: { id: string; name: string }[];
    genres: { id: string; name: string }[];
    positions: any[]; // PositionAndLevel
  };
  loading: boolean;
  error: boolean;
  isMine404: boolean;
  sourceRaw: any; // 원본(필요시 디버깅용)
};

export function useProfileBase(userIdParam?: string): UseProfileBaseResult {
  const isMine = userIdParam === "me";

  // 나
  const meQuery = useMe(isMine);
  const myProfileQuery = useMyProfile(meQuery.data?.user_id, isMine);

  // 타 사용자
  const rawQuery = useProfileDetail(userIdParam, !isMine);

  const resolvedUserId = isMine ? (meQuery.data?.user_id ?? null) : (userIdParam ?? null);
  const loading = isMine ? meQuery.isLoading || myProfileQuery.isLoading : rawQuery.isLoading;

  const source = isMine ? myProfileQuery.data : rawQuery.data;

  const base = useMemo(() => {
    const id = resolvedUserId;
    if (!source || !id) return null;
    return {
      ...source,
      user_id: id,
      image_url: source.image_url ?? "",
      email: source.email ?? "",
      regions: normTags((source as any).regions),
      genres: normTags((source as any).genres),
      positions: toPositions(source.position_links),
    };
  }, [source, resolvedUserId]);

  const isMine404 =
    isMine &&
    myProfileQuery.isError &&
    (myProfileQuery.error as AxiosError | undefined)?.response?.status === 404;

  const error = isMine ? !!(myProfileQuery.isError && !isMine404) : !!rawQuery.isError;

  return {
    isMine,
    resolvedUserId,
    base,
    loading,
    error,
    isMine404,
    sourceRaw: source,
  };
}
