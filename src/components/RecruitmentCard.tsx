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
import type { Post } from "@/types/api-res-recruitment";

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
      className="flex flex-col items-start p-5 bg-bg-secondary text-text-primary transition-shadow rounded-xl w-full max-w-96 hover:shadow-lg hover:shadow-primary-thick"
    >
      <div className="flex w-full justify-between items-center">
        <H3 className="truncate w-full">{title}</H3>
        <BookmarkButton isBookmarked={isBookmarked} size="sm" userId={id} />
      </div>

      <div className="flex justify-between items-center w-full mt-2 mb-3">
        {isClosed ? (
          <Badge size="sm" className="bg-primary-thick">
            <Text variant="label" className="text-text-on-dark">
              마감
            </Text>
          </Badge>
        ) : (
          <Badge size="sm" color="secondary">
            모집중
          </Badge>
        )}
        <div>
          <Text variant="subText">{author.nickname}</Text>
          <Text variant="subText">·</Text>
          <Text variant="subText">{`${timeDiff}`}</Text>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full sm:flex-row">
        <div className="flex flex-col space-y-0.5 flex-1">
          <div className="flex items-center space-x-1">
            <Text variant="mainText">포지션</Text>
            {positions.slice(0, 3).map((e, i) => (
              <Badge size="sm" key={i}>
                {e.position.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <Text variant="mainText">지역</Text>
            {regions.slice(0, 3).map((region, i) => (
              <Badge size="sm" key={i}>
                {region.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <Text variant="mainText">선호장르</Text>
            {genres.slice(0, 3).map((genre, i) => (
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
