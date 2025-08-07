import type { Post } from "@/types/api-response";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import { getTimeDiff } from "@/libs/utils";
import BookmarkButton from "@/components/BookmarkBtn";
import EyeIcon from "@/components/icons/EyeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

interface RecruitmentCardProps {
  postData: Post;
}

export default function RecruitmentCard({ postData }: RecruitmentCardProps) {
  const {
    id,
    title,
    author,
    is_bookmarked: isInitialBookmarked,
    regions,
    created_at: createdAt,
    views_count: viewsCount,
    comments_count: commentsCount,
    is_closed: isClosed,
    positions,
    genres,
    orientation,
    bookmarks_count,
  } = postData;

  const [isBookmarked] = useState(isInitialBookmarked);
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    setTimeDiff(getTimeDiff(createdAt));
  }, [createdAt, setTimeDiff]);

  return (
    <Link
      to="#"
      className="flex flex-col items-start space-y-1 p-5 bg-bg-secondary text-text-primary transition-shadow rounded-xl w-96 hover:shadow-lg hover:shadow-primary-thick"
    >
      <div className="flex w-full justify-between items-center">
        <H3 className="truncate w-full">{title}</H3>
        <BookmarkButton isBookmarked={isBookmarked} size="sm" userId={id} />
      </div>

      <div className="flex justify-end w-full">
        <Text variant="subText">{author.nickname}</Text>
        <Text variant="subText">·</Text>
        <Text variant="subText">{`${timeDiff}`}</Text>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col space-y-0.5 flex-1">
          <div className="flex items-center space-x-1">
            <Text variant="mainText">모집포지션</Text>
            {positions.map((e, i) => (
              <Badge size="sm" key={i}>
                {e.position.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <Text variant="mainText">활동지역</Text>
            {regions.map((region, i) => (
              <Badge size="sm" key={i}>
                {region.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <Text variant="mainText">선호장르</Text>
            {genres.map((genre, i) => (
              <Badge size="sm" key={i}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <Text variant="mainText">지향</Text>
            <Badge size="sm">{orientation.name}</Badge>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          {isClosed ? (
            <Badge size="md">마감</Badge>
          ) : (
            <Badge size="md" color="secondary">
              모집중
            </Badge>
          )}
          <div className="flex space-x-1 justify-center items-center">
            <EyeIcon />
            <Text variant="subText">{viewsCount}</Text>
            <CommentIcon />
            <Text variant="subText">{commentsCount}</Text>
            <BookmarkIcon />
            <Text variant="subText">{bookmarks_count}</Text>
          </div>
        </div>
      </div>
    </Link>
  );
}
