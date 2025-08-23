import Badge from "@/components/Badge";
import BookmarkButton from "@/components/BookmarkBtn";
import CommentInput from "@/components/commentUI/CommentInput";
import CommentUI from "@/components/commentUI/CommentUI";
import H1 from "@/components/text/H1";
import Text from "@/components/text/Text";
import { getTimeDiff } from "@/libs/utils";

import type { PostDetail } from "@/types/api-res-recruitment";

import type { CommentList } from "@/types/api-res-comment";

import { Link, useParams } from "react-router";
import EyeIcon from "@/components/icons/EyeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import Button from "@/components/Button";
import TogglePostStatusModal from "@/components/TogglePostStatusModal";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import useComment from "@/hooks/api/useComment";
import InlineSpinner from "@/components/loading/InlineSpinner";
import useRecruitmentDetail from "@/hooks/api/useRecruitmentDetail";


export default function RecruitmentDetail() {
  const { postId } = useParams();

  const { data: postData, isPending, isError } = useRecruitmentDetail(postId || "");

  const { data: commentList, isPending: isCommentListPending } = useComment(postId || "");

  if (!postId) {
    return <div>해당 게시물은 삭제되었습니다.</div>;
  }

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return (
      <H1 className="text-text-primary bg-bg-primary w-full min-h-full">
        데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </H1>
    );
  }

  const {
    title,
    is_bookmarked: isBookmarked,
    author: { id: userId, nickname },
    created_at: createdAt,
    is_closed: isClosed,
    band_name: bandName,
    band_composition: bandComposition,
    activity_time: activityTime,
    practice_frequency_time: practiceFrequencyTime,
    application_method: applicationMethod,
    contact_info: contactInfo,
    other_conditions: otherCondition,
    recruitment_type: recruitmentType,
    genres,
    orientation,
    positions,
    regions,
    content,
    image_url: imageUrl,
    views_count: viewsCount,
    comments_count: commentsCount,
    bookmarks_count: bookmarksCount,
    is_owner: isOwner,
  } = postData;

  return (
    <div className="bg-bg-primary text-text-primary p-2 flex justify-center">
      <div className="flex flex-col gap-3 items-center w-full">
        <div className="flex flex-col max-w-2xl w-full ">
          <div className="flex max-w-full min-w-0 justify-between items-center">
            <H1 className="truncate  min-w-0 flex-1">{title}</H1>
            <BookmarkButton
              isBookmarked={isBookmarked}
              className="shrink-0"
              size="sm"
              userId={userId}
            />
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
              <Text variant="subText">{nickname}</Text>
              <Text variant="subText">·</Text>
              <Text variant="subText">{`${getTimeDiff(new Date(createdAt))}`}</Text>
            </div>
          </div>

          <div className="flex flex-col space-y-3 justify-start items-start">
            {bandName ? <Text>{`밴드 이름: ${bandName}`}</Text> : null}
            {bandComposition ? <Text>{`밴드 구성: ${bandComposition}`}</Text> : null}
            {activityTime ? <Text>{`주 활동 시간: ${activityTime}`}</Text> : null}
            {practiceFrequencyTime ? <Text>{`활동 주기: ${practiceFrequencyTime}`}</Text> : null}
            {contactInfo ? <Text>{`연락 방법: ${contactInfo}`}</Text> : null}
            {applicationMethod ? <Text>{`지원 방법: ${applicationMethod}`}</Text> : null}
            {otherCondition ? <Text>{`기타 조건: ${otherCondition}`}</Text> : null}

            {positions ? (
              <div className="flex flex-col space-y-0.5">
                {positions.map((position, index) => {
                  const {
                    position_name: positionName,
                    experienced_level_name: experienceLevelName,
                  } = position;
                  return (
                    <div
                      className="flex flex-row justify-start items-center space-x-1.5"
                      key={index}
                    >
                      <Text>{`모집 포지션 ${index + 1}`}</Text>
                      <Badge size="sm" color="primarySoft">
                        {positionName}
                      </Badge>
                      <Badge size="sm" color="primarySoft">
                        {experienceLevelName}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {genres ? (
              <div className="flex flex-row justify-start items-center space-x-1.5">
                <Text>선호 장르</Text>
                {genres.map(({ name, id }) => (
                  <Badge size="sm" color="primarySoft" key={id}>
                    {name}
                  </Badge>
                ))}
              </div>
            ) : null}

            {regions ? (
              <div className="flex flex-row justify-start items-center space-x-1.5">
                <Text>활동 지역</Text>
                {regions.map(({ name, id }) => (
                  <Badge size="sm" color="primarySoft" key={id}>
                    {name}
                  </Badge>
                ))}
              </div>
            ) : null}

            {orientation ? (
              <div className="flex flex-row justify-start items-center space-x-1.5">
                <Text>지향</Text>
                <Badge size="sm" color="primarySoft">
                  {orientation.name}
                </Badge>
              </div>
            ) : null}

            {recruitmentType ? (
              <div className="flex flex-row justify-start items-center space-x-1.5">
                <Text>밴드 형태</Text>
                <Badge size="sm" color="primarySoft">
                  {recruitmentType.name}
                </Badge>
              </div>
            ) : null}

            <Text>{content}</Text>

            {imageUrl ? (
              <div className="w-full flex justify-center">
                <img src={imageUrl} className="rounded-lg w-[512px]" />
              </div>
            ) : null}

            <div className="flex space-x-1 justify-center items-center">
              <EyeIcon />
              <Text variant="subText">{viewsCount}</Text>
              <CommentIcon />
              <Text variant="subText">{commentsCount}</Text>
              <BookmarkIcon />
              <Text variant="subText">{bookmarksCount}</Text>
            </div>

            {isOwner ? (
              <div className="flex items-center justify-center space-x-2 w-full">
                <Link to={`/recruitment-post/${postId}/fix`}>
                  <Button color="secondary" variant="outline">
                    <Text>수정하기</Text>
                  </Button>
                </Link>
                <TogglePostStatusModal isClosed={isClosed} postId={postId} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-start w-full max-w-[512px] space-y-1">
          <CommentInput postId={postId} className="w-full" />
          {isCommentListPending ? (
            <InlineSpinner />
          ) : commentList && commentList.comments.length > 0 ? (
            commentList.comments.map((comment) => (
              <CommentUI comment={comment} key={comment.id} className="w-full" />
            ))
          ) : (
            <Text>아직 댓글이 없습니다</Text>
          )}
        </div>
      </div>
    </div>
  );
}
