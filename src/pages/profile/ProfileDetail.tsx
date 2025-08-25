import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import InlineSpinner from "@/components/loading/InlineSpinner";
import { useMyBookmarks } from "@/hooks/api/useMyBookmark";
import { useProfileLists } from "@/hooks/api/useProfileLists";
import { useProfileBase } from "@/hooks/api/useProfileBase";
import { hasProfile, type Tag } from "@/libs/profileNormalizers";

function Section({
  title,
  count,
  to,
  children,
}: {
  title: string;
  count?: number;
  to?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-end gap-2">
          <H3 className="text-text-primary">{title}</H3>
          {typeof count === "number" ? (
            <Text variant="subText" className="text-text-primary">
              ({count})
            </Text>
          ) : null}
        </div>
        {to ? (
          <Link to={to} aria-label={`${title} 더보기`} className="shrink-0">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 hover:bg-bg-secondary transition">
              <Text variant="label" className="text-text-primary">
                +
              </Text>
            </span>
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function ProfileDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { isMine, resolvedUserId, base, loading, error, isMine404, sourceRaw } =
    useProfileBase(userId);

  const canShowLists = isMine ? true : !!base?.is_public;
  const { postsQuery, commentsQuery } = useProfileLists(resolvedUserId, canShowLists);
  const { bookmarkPostsQuery, bookmarkUsersQuery } = useMyBookmarks(isMine);

  // 404면 업데이트로 이동
  useEffect(() => {
    if (!isMine) return;
    if (isMine404) {
      navigate("/mypage/profile-update", { replace: true });
      return;
    }
    if (sourceRaw && !hasProfile(sourceRaw)) {
      navigate("/mypage/profile-update", { replace: true });
    }
  }, [isMine, isMine404, sourceRaw, navigate]);

  if (isMine404) return <InlineSpinner />;

  const loadError = error;

  if (loading) {
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

  if (loadError || !base) {
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
          {isMine ? (
            <Link
              to="/mypage/profile-update"
              aria-label="프로필 수정으로 이동"
              className="mx-auto md:mx-0 group outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 group-hover:ring-primary/40 transition-shadow shadow-sm cursor-pointer">
                <img
                  src={base.image_url || (defaultImage as unknown as string)}
                  alt={`${base.nickname}의 프로필 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <div className="mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-sm">
                <img
                  src={base.image_url || (defaultImage as unknown as string)}
                  alt={`${base.nickname}의 프로필 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* 이름 + 북마크 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <H1 className="text-text-primary tracking-tight">{base.nickname}</H1>
              <div className="self-start sm:self-auto">
                {!isMine && <BookmarkBtn userId={base.user_id} isBookmarked={base.is_bookmarked} />}
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

              {(base.regions ?? []).map((region: Tag) => (
                <Badge key={region.id} color="primarySoft">
                  <Text variant="label" className="text-text-primary">
                    {region.name}
                  </Text>
                </Badge>
              ))}

              {(base.genres ?? []).map((genre: Tag) => (
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

      {!isMine && !base.is_public ? (
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
            <Section
              title="게시글"
              count={postsQuery.data?.posts?.length ?? 0}
              to="/recruitment-post"
            >
              {postsQuery.isLoading ? (
                <div className="h-32 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : postsQuery.isError ? (
                <Text variant="subText" className="text-text-primary">
                  게시글을 불러오지 못했습니다.
                </Text>
              ) : !postsQuery.data?.posts?.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 게시글이 없습니다.
                </Text>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {postsQuery.data!.posts.map((post: Post) => (
                    <div key={post.id} className="[&>*]:!w-full">
                      <RecruitmentCard postData={post} />
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {isMine && (
              <Section
                title="북마크한 게시글"
                to="/recruitment-post?bookmark=bookmark"
                count={bookmarkPostsQuery.data?.posts.length ?? 0}
              >
                {bookmarkPostsQuery.isLoading ? (
                  <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
                ) : !bookmarkPostsQuery.data?.posts?.length ? (
                  <Text variant="subText" className="text-text-primary">
                    북마크한 게시글이 없습니다.
                  </Text>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {bookmarkPostsQuery.data!.posts.map((bp) => {
                      const asPost: Post = { ...(bp as any), is_bookmarked: true };
                      const key = (bp as any).bookmark_id ?? (bp as any).id; // 왜 any??
                      return (
                        <div key={key} className="[&>*]:!w-full">
                          <RecruitmentCard postData={asPost} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </Section>
            )}
          </div>

          {/* 최근 댓글 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 lg:p-6 lg:sticky lg:top-4 h-fit">
            <Section
              title="댓글"
              count={commentsQuery.data?.comments?.length ?? 0}
              to="/recruitment-post?view=comments"
            >
              {commentsQuery.isLoading ? (
                <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : commentsQuery.isError ? (
                <Text variant="subText" className="text-text-primary">
                  댓글을 불러오지 못했습니다.
                </Text>
              ) : !commentsQuery.data?.comments?.length ? (
                <Text variant="subText" className="text-text-primary">
                  작성한 댓글이 없습니다.
                </Text>
              ) : (
                <div className="flex flex-col gap-3 md:gap-4">
                  {commentsQuery.data!.comments.map((comment) => (
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
            {isMine && (
              <Section
                title="북마크한 사용자"
                to="/profile?bookmark=bookmark"
                count={bookmarkUsersQuery.data?.profiles.length ?? 0}
              >
                {bookmarkUsersQuery.isLoading ? (
                  <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
                ) : !bookmarkUsersQuery.data?.profiles?.length ? (
                  <Text variant="subText" className="text-text-primary">
                    북마크한 사용자가 없습니다.
                  </Text>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {bookmarkUsersQuery.data!.profiles.map((bu) => {
                      const userForCard: any = { ...(bu as any), is_bookmarked: true };
                      const key = (bu as any).bookmark_id ?? bu.user_id;
                      return <ProfileCard key={key} profile={userForCard} />;
                    })}
                  </div>
                )}
              </Section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
