import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import H1 from "@/components/text/H1";
import H2 from "@/components/text/H2";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import BookmarkBtn from "@/components/BookmarkBtn";
import defaultImage from "@/assets/images/user-default-image.png";
import RecruitmentCard from "@/components/RecruitmentCard";
import CommentCard from "@/components/CommentCard";
import type { Post } from "@/types/api-res-recruitment";
import type { UserProfileDetail } from "@/types/api-res-profile";
import { fetchProfileDetail, type RawProfileDetail } from "@/api/fetchProfileDetail";
import {
  fetchUserPostsByAuthor,
  type RecruitingCursorResponse,
} from "@/api/fetchUserPostsByAuthor";
import { fetchUserCommentsByAuthor } from "@/api/fetchUserCommentsByAuthor";
import type { CommentList } from "@/types/api-res-comment";
import { useMemo } from "react";
import type { PositionAndLevel } from "@/types/api-res-profile";
import type { Position, ExperienceLevel } from "@/types/api-res-common";

type RawPositionLink = { position: Position; experience_level: ExperienceLevel };
function toPositions(links: RawPositionLink[] | null | undefined): PositionAndLevel[] {
  if (!Array.isArray(links)) return [];
  return links.map(({ position, experience_level }) => ({ position, experience_level }));
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <H3 className="text-text-primary">{title}</H3>
        {typeof count === "number" ? (
          <Text variant="subText" className="text-text-primary">
            ({count})
          </Text>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function ProfileDetail() {
  const { userId } = useParams();

  // -----------------------------------------------------------------------------------------------------------------------------
  const DUMMY = true;

  if (DUMMY) {
    const base: UserProfileDetail = {
      user_id: userId ?? "11111111-1111-1111-1111-111111111111",
      nickname: "테스터",
      image_url: "",
      is_public: true,
      is_bookmarked: false,
      regions: [{ id: "7", name: "대구" }],
      positions: [
        { position: { id: "p1", name: "보컬" }, experience_level: { id: "e2", name: "중급" } },
      ],
      genres: [
        { id: "g1", name: "록" },
        { id: "g2", name: "메탈" },
      ],
      email: "tester@example.com",
    };

    const posts: Post[] = [
      {
        id: "post-1",
        author: {
          user_id: base.user_id!,
          nickname: base.nickname,
          image_url: base.image_url,
        },
        title: "기타/보컬 구합니다",
        is_closed: false,
        created_at: "2025-08-10T12:00:00Z",
        is_owner: false,
        is_bookmarked: false,
        views_count: 132,
        comments_count: 3,
        bookmarks_count: 9,
        orientation: { id: "o1", name: "밴드 지향" },
        recruitment_type: { id: "r1", name: "정규" },
        regions: base.regions,
        genres: [{ id: "g1", name: "록" }],
        positions: [
          {
            position_id: "p1",
            position_name: "보컬",
            experience_level_id: "e2",
            experience_level_name: "중급",
          },
        ],
        image_url: undefined,
        band_name: undefined,
        band_composition: undefined,
        activity_time: undefined,
        contact_info: undefined,
        application_method: undefined,
        practice_frequency_time: undefined,
        other_conditions: undefined,
      } as unknown as Post,
    ];

    const comments = [
      {
        id: "c-1",
        content: "연락 드렸습니다. 함께 해요!",
        created_at: "2025-08-11T09:30:00Z",
        post: { id: "post-1", title: "기타/보컬 구합니다 " },
      },
      {
        id: "c-2",
        content: "연습실은 어디인가요?",
        created_at: "2025-08-11T10:00:00Z",
        post: { id: "post-1", title: "기타/보컬 구합니다" },
      },
    ];

    // FIX: 하드코드 모드에서는 여기서 바로 렌더 후 return.
    //        (아래에서 React Query 훅을 호출하지 않도록 분기 종료)
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 space-y-8 md:space-y-10">
        {/* 헤더 카드 */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(140px,180px)_1fr] xl:grid-cols-[minmax(180px,220px)_1fr] gap-5 sm:gap-6 md:gap-8 items-center">
            <div className="mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-sm">
                <img
                  src={base.image_url || (defaultImage as unknown as string)}
                  alt={`${base.nickname}의 프로필 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* 이름 + 북마크 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <H1 className="text-text-primary tracking-tight">{base.nickname}</H1>
                <div className="self-start sm:self-auto">
                  <BookmarkBtn userId={base.user_id!} isBookmarked={base.is_bookmarked} />{" "}
                  {/* FIX: non-null 보증 */}
                </div>
              </div>

              {/* 메타 배지 */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 overflow-x-auto md:overflow-visible whitespace-nowrap [-webkit-overflow-scrolling:touch]">
                {base.positions?.[0] ? (
                  <>
                    <Badge color="primarySoft">
                      <Text variant="label" className="text-text-primary">
                        {base.positions[0].position.name}
                      </Text>
                    </Badge>
                    <Badge color="primarySoft">
                      <Text variant="label" className="text-text-primary">
                        {base.positions[0].experience_level.name}
                      </Text>
                    </Badge>
                  </>
                ) : null}

                {base.regions.map((region) => (
                  <Badge key={region.id} color="primarySoft" className="shrink-0">
                    <Text variant="label" className="text-text-primary">
                      {region.name}
                    </Text>
                  </Badge>
                ))}

                {base.genres.map((genre) => (
                  <Badge key={genre.id} color="primarySoft" className="shrink-0">
                    <Text variant="label" className="text-text-primary">
                      {genre.name}
                    </Text>
                  </Badge>
                ))}
              </div>

              {/* 이메일 */}
              {base.email ? (
                <Text variant="subText" className="text-text-primary/80 break-words sm:break-all">
                  email: {base.email}
                </Text>
              ) : null}
            </div>
          </div>
        </div>

        {/* 본문: 게시글 + 댓글 */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[1.6fr_1fr] gap-5 md:gap-6">
          {/* 게시글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 lg:p-6">
            <Section title="게시글" count={posts.length}>
              {!posts.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 게시글이 없습니다.
                </Text>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {posts.map((post) => (
                    <div key={post.id} className="[&>*]:!w-full">
                      <RecruitmentCard postData={post} />
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          {/* 댓글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 lg:p-6">
            <Section title="댓글" count={comments.length}>
              {!comments.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 댓글이 없습니다.
                </Text>
              ) : (
                <div className="flex flex-col gap-3 md:gap-4">
                  {comments.map((c) => (
                    <CommentCard
                      key={c.id}
                      comment={{
                        id: c.id,
                        content: c.content,
                        created_at: c.created_at,
                        post: c.post,
                        children: [],
                        is_owner: false,
                        author: {
                          user_id: base.user_id!,
                          nickname: base.nickname,
                          image_url: base.image_url,
                        },
                      }}
                    />
                  ))}
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>
    ); // ← 여기서 컴포넌트 반환하고 종료
  } // FIX: 하드코드 분기 블록 닫기(아래 훅 호출이 조건부가 되지 않게 함)

  // -----------------------------------------------------------------------------------------------------------------------------

  const {
    data: raw,
    isLoading,
    isError,
  } = useQuery<RawProfileDetail>({
    queryKey: ["profile-detail", userId],
    queryFn: () => fetchProfileDetail(userId!),
    enabled: !!userId,
  });

  const base = useMemo(() => {
    if (!raw || !userId) return null;
    return {
      ...raw,
      user_id: userId, // ← 라우트에서 주입
      image_url: raw.image_url ?? "",
      email: raw.email ?? "",
      regions: raw.regions ?? [],
      genres: raw.genres ?? [],
      positions: toPositions(raw.position_links), // ← 링크 → positions
    };
  }, [raw, userId]);

  const isPublic = !!base?.is_public;

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery<RecruitingCursorResponse>({
    queryKey: ["profile-posts", userId],
    queryFn: () => fetchUserPostsByAuthor(userId!, 10),
    enabled: !!userId && isPublic,
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery<CommentList>({
    queryKey: ["profile-comments", userId],
    queryFn: () => fetchUserCommentsByAuthor(userId!, 10),
    enabled: !!userId && isPublic,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-40 sm:h-44 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 md:gap-6">
            <div className="h-72 sm:h-80 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
            <div className="h-72 sm:h-80 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !base) {
    return (
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-8">
        <H2 className="text-text-primary">프로필을 불러오지 못했습니다.</H2>
        <Text variant="subText" className="text-text-primary">
          잠시 후 다시 시도해주세요.
        </Text>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 space-y-8 md:space-y-10">
      {/* 헤더 카드 */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(140px,180px)_1fr] xl:grid-cols-[minmax(180px,220px)_1fr] gap-5 sm:gap-6 md:gap-8 items-center">
          <div className="mx-auto md:mx-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-sm">
              <img
                src={base.image_url || (defaultImage as unknown as string)}
                alt={`${base.nickname}의 프로필 이미지`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* 이름 + 북마크 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <H1 className="text-text-primary tracking-tight">{base.nickname}</H1>
              <div className="self-start sm:self-auto">
                <BookmarkBtn userId={userId!} isBookmarked={base.is_bookmarked} />
              </div>
            </div>

            {/* 메타 배지 */}
            <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
              {base.positions?.[0] ? (
                <>
                  <Badge color="primarySoft">
                    <Text variant="label" className="text-text-primary">
                      {base.positions[0].position.name}
                    </Text>
                  </Badge>
                  <Badge color="primarySoft">
                    <Text variant="label" className="text-text-primary">
                      {base.positions[0].experience_level.name}
                    </Text>
                  </Badge>
                </>
              ) : null}

              {(base.regions ?? []).map((region) => (
                <Badge key={region.id} color="primarySoft">
                  <Text variant="label" className="text-text-primary">
                    {region.name}
                  </Text>
                </Badge>
              ))}

              {(base.genres ?? []).map((genre) => (
                <Badge key={genre.id} color="primarySoft">
                  <Text variant="label" className="text-text-primary">
                    {genre.name}
                  </Text>
                </Badge>
              ))}
            </div>

            {/* 이메일 */}
            {base.email ? (
              <Text variant="subText" className="text-text-primary/80 break-all">
                email: {base.email}
              </Text>
            ) : null}
          </div>
        </div>
      </div>

      {!base.is_public ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6">
          <H3 className="text-text-primary mb-1.5">비공개 계정입니다</H3>
          <Text variant="subText" className="text-text-primary">
            프로필 정보는 공개되어 있으나 게시글과 댓글은 표시되지 않습니다.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {/* 최근 게시글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 lg:p-6">
            <Section title="게시글" count={postsData?.posts?.length ?? 0}>
              {postsLoading ? (
                <div className="h-32 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : postsError ? (
                <Text variant="subText" className="text-text-primary">
                  게시글을 불러오지 못했습니다.
                </Text>
              ) : !postsData?.posts?.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 게시글이 없습니다.
                </Text>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {postsData!.posts.map((post: Post) => (
                    <div key={post.id} className="[&>*]:!w-full">
                      <RecruitmentCard postData={post} />
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          {/* 최근 댓글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 lg:p-6 lg:sticky lg:top-4 h-fit">
            <Section title="댓글" count={commentsData?.comments?.length ?? 0}>
              {commentsLoading ? (
                <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : commentsError ? (
                <Text variant="subText" className="text-text-primary">
                  댓글을 불러오지 못했습니다.
                </Text>
              ) : !commentsData?.comments?.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 댓글이 없습니다.
                </Text>
              ) : (
                <div className="flex flex-col gap-3 md:gap-4">
                  {commentsData!.comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={{
                        id: comment.id,
                        content: comment.content,
                        created_at: comment.created_at,
                        post: comment.post,
                        children: [],
                        is_owner: false,
                        author: {
                          user_id: base.user_id!,
                          nickname: base.nickname,
                          image_url: base.image_url,
                        },
                      }}
                    />
                  ))}
                </div>
              )}
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}
