import { useEffect, useState } from "react";
import { Link } from "react-router";
import H3 from "@/components/text/H3";
import Text from "@/components/text/Text";
import Badge from "@/components/Badge";
import { cn, getTimeDiff } from "@/libs/utils";
import BookmarkButton from "@/components/bookmark/BookmarkBtn";
import EyeIcon from "@/components/icons/EyeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import type { Post } from "@/types/api-res-recruitment";

const MAX_BADGE = 2;

interface RecruitmentCardProps {
  postData: Post;
  className?: string;
}

export default function RecruitmentCard({ postData, className = "" }: RecruitmentCardProps) {
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
    setTimeDiff(getTimeDiff(new Date(createdAt)));
  }, [createdAt, setTimeDiff]);

  return (
    <Link
      to={`/recruitment-post/${id}`}
      className={cn(
        "flex flex-col items-start p-5 bg-bg-secondary text-text-primary transition-shadow rounded-xl w-full max-w-96 hover:shadow-lg hover:shadow-primary-thick",
        className
      )}
    >
      <div className="flex w-full justify-between items-center">
        <H3 className="truncate w-full">{title}</H3>
        <BookmarkButton isBookmarked={isBookmarked} size="sm" userId={id} />
      </div>

      <div className="flex justify-between items-start w-full mt-2 mb-3 flex-col">
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

      <div className="flex flex-col justify-between w-full flex-1">
        <div className="flex flex-col space-y-0.5 flex-1 w-full">
          {positions && positions.length > 0 ? (
            <div className="flex items-center space-x-1">
              <Text variant="mainText">포지션</Text>
              {positions.slice(0, MAX_BADGE).map(({ position_name: positionName }, i) => (
                <Badge size="sm" className="text-text-on-dark" key={i}>
                  {positionName}
                </Badge>
              ))}
              {positions.length > MAX_BADGE ? (
                <Badge size="sm" color="secondary" className="text-text-on-dark">
                  {`+${positions.length - MAX_BADGE}`}
                </Badge>
              ) : null}
            </div>
          ) : null}

          {regions && regions.length > 0 ? (
            <div className="flex items-center space-x-1">
              <Text variant="mainText">지역</Text>
              {regions.slice(0, MAX_BADGE).map((region, i) => (
                <Badge size="sm" className="text-text-on-dark" key={i}>
                  {region.name}
                </Badge>
              ))}
              {regions.length > MAX_BADGE ? (
                <Badge size="sm" color="secondary" className="text-text-on-dark">
                  {`+${regions.length - MAX_BADGE}`}
                </Badge>
              ) : null}
            </div>
          ) : null}

          {genres && genres.length > 0 ? (
            <div className="flex items-center space-x-1">
              <Text variant="mainText">선호장르</Text>
              {genres.slice(0, MAX_BADGE).map((genre, i) => (
                <Badge size="sm" className="text-text-on-dark" key={i}>
                  {genre.name}
                </Badge>
              ))}
              {genres.length > MAX_BADGE ? (
                <Badge size="sm" color="secondary" className="text-text-on-dark">
                  {`+${genres.length - MAX_BADGE}`}
                </Badge>
              ) : null}
            </div>
          ) : null}

          {orientation ? (
            <div className="flex items-center space-x-1">
              <Text variant="mainText">지향</Text>
              <Badge size="sm" className="text-text-on-dark">
                {orientation.name}
              </Badge>
            </div>
          ) : null}
        </div>
        <div className="flex space-x-1 justify-end items-center">
          <EyeIcon />
          <Text variant="subText">{viewsCount}</Text>
          <CommentIcon />
          <Text variant="subText">{commentsCount}</Text>
          <BookmarkIcon />
          <Text variant="subText">{bookmarks_count}</Text>
        </div>
      </div>
    </Link>
  );
}
