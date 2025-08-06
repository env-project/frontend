import type { Post } from "@/types/api-response";
import { useState } from "react";
import { Link } from "react-router";
import H3 from "./text/H3";
import Text from "./text/Text";
import Badge from "./Badge";

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
  } = postData;

  const [isBookmarked, setIsBookmarked] = useState(isInitialBookmarked);

  return (
    <Link
      to="#"
      className="flex flex-col items-start space-y-1 p-5 bg-bg-secondary text-text-primary rounded-xl w-96"
    >
      <H3 className="truncate w-full">{title}</H3>
      <div className="flex justify-end w-full">
        <Text variant="subText">{author.nickname}</Text>
        <Text variant="subText">·</Text>
        <Text variant="subText">{`${createdAt.getMonth()}/${createdAt.getDate()}`}</Text>
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
          <div className="flex space-x-1">
            <Text variant="subText">{`눈: ${viewsCount}`}</Text>
            <Text variant="subText">{`댓: ${commentsCount}`}</Text>
          </div>
        </div>
      </div>
    </Link>
  );
}
