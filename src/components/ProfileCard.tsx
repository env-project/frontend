import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import defaultImage from "@/assets/images/user-default-image.png";
import type { UserProfile } from "@/types/api-res-profile";
import { cn } from "@/libs/utils";
import H3 from "./text/H3";
import { Link } from "react-router";
import { useUserInfo } from "@/hooks/api/useUserInfo";
import ProfileBookmark from "./bookmark/ProfileBookmark";
import type { ComponentProps } from "react";

interface ProfileCardProps extends ComponentProps<"div"> {
  profile: UserProfile;
}

const BADGE_LIMIT = 2;

function renderLimitedBadges(
  items: { id: string; name: string }[] | undefined,
  limit = BADGE_LIMIT,
  showKey: "name" | "id" = "name"
) {
  if (!items || items.length === 0) return null;
  const shown = items.slice(0, limit);
  const extra = items.length - shown.length;
  const hidden = items.slice(limit);

  return (
    <>
      {shown.map((item) => (
        <Badge key={item.id} label={item.name} color="primarySoft" size="sm" />
      ))}
      {extra > 0 && (
        <Badge
          // 전체 목록을 툴팁으로
          title={hidden.map((it) => it[showKey]).join(", ")}
          label={`+${extra}`}
          color="secondarySoft"
          size="sm"
        />
      )}
    </>
  );
}

export default function ProfileCard({ profile, className, ...rest }: ProfileCardProps) {
  const {
    user_id: userId,
    nickname,
    image_url: imageUrl,
    is_bookmarked: isBookmarked,
    positions,
    genres,
    email,
    regions,
  } = profile;
  const firstPosition = positions?.[0];
  const positionName = firstPosition?.position.name ?? "포지션 없음";
  const experienceName = firstPosition?.experience_level.name ?? "미정";

  const { data: myUserInfo } = useUserInfo();

  return (
    <div
      className={cn(
        "relative bg-white overflow-hidden z-0",
        "w-full rounded-xl",
        "p-4 sm:p-5",
        "border border-gray-300 shadow-sm hover:shadow-lg hover:shadow-primary-soft hover:z-10",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* 좌측: 프로필 이미지 */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-gray-300 shrink-0">
          <img
            src={imageUrl || defaultImage}
            alt={`${nickname}님의 프로필 사진`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 중앙: 닉네임 */}
        <Link
          to={`/profile/${userId}`}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <H3 className="text-base text-center underline-offset-2 hover:underline">{nickname}</H3>
        </Link>

        {/* 우측: 북마크 버튼 */}
        <div className="shrink-0">
          {myUserInfo?.id === userId ? null : (
            <ProfileBookmark userId={userId} initialIsBookmark={isBookmarked} />
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
        {/* 포지션 */}
        <Text variant="label" className="whitespace-nowrap">
          포지션:
        </Text>
        <Badge label={positionName} color="primarySoft" size="sm" />
      </div>
      {/* 경력 */}
      <div className="flex items-center gap-1">
        <Text variant="label" className="whitespace-nowrap">
          경력:
        </Text>
        <Text variant="label">{experienceName}</Text>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-left">
        {/* 선호 장르 */}
        <div className="grid grid-cols-[auto_1fr] items-start gap-x-1">
          {genres.length > 0 ? (
            <>
              <Text variant="label" className="self-center whitespace-nowrap leading-6">
                선호 장르:
              </Text>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 min-w-0">
                {renderLimitedBadges(genres)}
              </div>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-[auto_1fr] items-start gap-x-1">
          {regions.length > 0 ? (
            <>
              <Text variant="label" className="self-center whitespace-nowrap leading-6">
                지역:
              </Text>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 min-w-0">
                {regions.map((regions) => (
                  <Badge key={regions.id} label={regions.name} color="primarySoft" size="sm" />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* 이메일 */}
      {email && (
        <div className="mt-4 text-left">
          <Text variant="subText" className="break-all sm:break-words">
            email: &nbsp; {email}
          </Text>
        </div>
      )}
    </div>
  );
}
