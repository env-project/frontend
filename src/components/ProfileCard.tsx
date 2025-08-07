import clsx from "clsx";
import H2 from "@/components/text/H2";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import BookmarkBtn from "@/components/BookmarkBtn";
import type { UserProfile } from "@/types/api-response";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { user_id, nickname, image_url, is_bookmarked, positions, genres, email } = profile;
  const firstPosition = positions[0];
  const positionName = firstPosition?.position.name ?? "포지션 없음";
  const experienceName = firstPosition?.experience_level.name ?? "미정";

  return (
    <div
      className={clsx(
        "relative w-75 rounded-xl bg-bg-secondary px-4 pt-16 pb-5 ",
        "shadow-sm border border-gray-300",
        "hover:shadow-lg hover:shadow-primary-thick"
      )}
    >
      {/* 프로필 이미지 (좌측 상단) */}
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full overflow-hidden border border-gray-300">
        <img
          src={image_url}
          alt={`${nickname}님의 프로필 사진`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 북마크 버튼 (우측 상단) */}
      <div className="absolute top-4 right-4">
        <BookmarkBtn userId={user_id} isBookmarked={is_bookmarked} />
      </div>

      {/* 이름 (중앙 상단) */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <H2 className="text-base text-center">{nickname}</H2>
      </div>

      <div className="flex items-center gap-4 mt-4 text-left">
        {/* 포지션 */}
        <div className="flex items-center gap-1">
          <Text variant="label">포지션</Text>
          <Badge label={positionName} color="primary" size="sm" />
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
          <Badge key={genre.id} label={genre.name} color="primary" size="sm" />
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
