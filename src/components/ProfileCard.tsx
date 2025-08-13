import H2 from "@/components/text/H2";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import BookmarkBtn from "@/components/BookmarkBtn";
import defaultImage from "@/assets/images/user-default-image.png";
import type { UserProfile } from "@/types/api-res-profile";
import { cn } from "@/libs/utils";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const {
    user_id: userId,
    nickname,
    image_url: imageUrl,
    is_bookmarked: isBookmarked,
    positions,
    genres,
    email,
  } = profile;
  const firstPosition = positions?.[0];
  const positionName = firstPosition?.position.name ?? "포지션 없음";
  const experienceName = firstPosition?.experience_level.name ?? "미정";

  return (
    <div
      className={cn(
        "relative w-75 rounded-xl bg-bg-secondary px-4 pt-2 pb-5",
        "shadow-sm border border-gray-300",
        "hover:shadow-lg hover:shadow-primary-thick",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        {/* 좌측: 프로필 이미지 */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 shrink-0">
          <img
            src={imageUrl || defaultImage}
            alt={`${nickname}님의 프로필 사진`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 중앙: 닉네임 */}
        <div className="flex-1 text-center">
          <H2 className="text-base">{nickname}</H2>
        </div>

        {/* 우측: 북마크 버튼 */}
        <div className="shrink-0">
          <BookmarkBtn userId={userId} isBookmarked={isBookmarked} />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-left">
        {/* 포지션 */}
        <div className="flex items-center gap-1">
          <Text variant="label">포지션</Text>
          <Badge label={positionName} color="primarySoft" size="sm" />
        </div>
        {/* 경력 */}
        <div className="flex items-center gap-1">
          <Text variant="label">경력</Text>
          <Text variant="label">{experienceName}</Text>
        </div>
      </div>

      {/* 선호 장르 */}
      <div className="mt-3 text-left">
        <Text variant="label">선호 장르</Text>
        {genres.map((genre) => (
          <Badge key={genre.id} label={genre.name} color="primarySoft" size="sm" />
        ))}
      </div>

      {/* 이메일 */}
      {email && (
        <div className="mt-4 text-left">
          <Text variant="subText">email: &nbsp; {email}</Text>
        </div>
      )}
    </div>
  );
}
