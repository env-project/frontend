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
import type { PublicUserProfileDetail, PrivateUserProfileDetail } from "@/types/api-res-profile";
import { fetchProfileDetail } from "../../api/fetchProfileDetail";

type Detail = PublicUserProfileDetail | PrivateUserProfileDetail;

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
      <div className="flex items-end gap-2">
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

  const { data, isLoading, isError } = useQuery<Detail>({
    queryKey: ["profile-detail", userId],
    queryFn: () => fetchProfileDetail(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-44 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 md:gap-6">
            <div className="h-80 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
            <div className="h-80 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-8">
        <H2 className="text-text-primary">프로필을 불러오지 못했습니다.</H2>
        <Text variant="subText" className="text-text-primary">
          잠시 후 다시 시도해주세요.
        </Text>
      </div>
    );
  }

  const isPublic = data.is_public;
  const base = data;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 space-y-8 md:space-y-10">
      {/* 헤더 카드 */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(160px,200px)_1fr] gap-6 md:gap-8 items-center">
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
                <BookmarkBtn userId={base.user_id} isBookmarked={base.is_bookmarked} />
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

      {!isPublic ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6">
          <H3 className="text-text-primary mb-1.5">비공개 계정입니다</H3>
          <Text variant="subText" className="text-text-primary">
            프로필 정보는 공개되어 있으나 게시글과 댓글은 표시되지 않습니다.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 md:gap-6">
          {/* 최근 게시글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 lg:p-6">
            <Section title="게시글" count={(data as PublicUserProfileDetail).recent_posts.length}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {(data as PublicUserProfileDetail).recent_posts.map((post) => (
                  <div key={post.id} className="[&>*]:!w-full">
                    <RecruitmentCard
                      key={post.id}
                      postData={
                        {
                          id: post.id,
                          title: post.title,
                          author: { user_id: base.user_id, nickname: base.nickname },
                          is_bookmarked: false,
                          regions: base.regions,
                          created_at: post.created_at,
                          views_count: Math.floor(Math.random() * 500) + 10,
                          comments_count: Math.floor(Math.random() * 20),
                          is_closed: false,
                          positions: base.positions?.map((positionLevel) => ({
                            position_id: positionLevel.position.id,
                            position_name: positionLevel.position.name,
                            experience_level_id: positionLevel.experience_level.id,
                            experience_level_name: positionLevel.experience_level.name,
                          })),
                          genres: base.genres,
                          orientation: undefined,
                          bookmarks_count: Math.floor(Math.random() * 200),
                        } as unknown as Post
                      }
                    />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* 최근 댓글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 lg:p-6">
            <Section title="댓글" count={(data as PublicUserProfileDetail).recent_comments.length}>
              <div className="flex flex-col gap-3 md:gap-4">
                {(data as PublicUserProfileDetail).recent_comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={{
                      id: comment.id,
                      content: comment.content,
                      created_at: comment.created_at,
                      post: comment.post,
                      children: [],
                      is_owner: true,
                      author: {
                        user_id: base.user_id,
                        nickname: base.nickname,
                        image_url: base.image_url,
                      },
                    }}
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}
