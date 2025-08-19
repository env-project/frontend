import Badge from "@/components/Badge";
import BookmarkButton from "@/components/BookmarkBtn";
import CommentInput from "@/components/commentUI/CommentInput";
import CommentUI from "@/components/commentUI/CommentUI";
import H1 from "@/components/text/H1";
import Text from "@/components/text/Text";
import { getTimeDiff } from "@/libs/utils";
import type { CommentList } from "@/types/api-res-comment";
import type { PostDetail } from "@/types/api-res-recruitment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EyeIcon from "@/components/icons/EyeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import Button from "@/components/Button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/Modal";
import H3 from "@/components/text/H3";

//더미 포스트 데이터 실제론 api 준비
const dummyPostData: PostDetail = {
  id: "1",
  title: "유지민 밴드에서 키보드를 찾습니다!",
  author: {
    id: "1111",
    nickname: "이재현",
  },
  is_closed: false,
  is_owner: true,
  is_bookmarked: true,

  created_at: "2025-08-12T11:00:00Z",

  views_count: 100,
  comments_count: 10,
  bookmarks_count: 5,

  content:
    "서울 홍대에서 활동 하고 있는 유지빈 밴드입니다. 취미 지향 직장인 밴드입니다. 합주는 주로 주말에 격주로 진행합니다. 멤버는 현재 남보컬 겸 세컨 기타, 리드 기타, 드럼, 베이스로 이루어져 있습니다. 관심 있으시면 댓글이나 아래 이메일로 편하게 연락주세요! example@example.com",

  band_name: "유지민 밴드",
  band_composition: "남보컬 겸 세컨 기타, 리드 기타, 드럼, 베이스",
  activity_time: "월요일 오후 8시, 주말",
  practice_frequency_time: "격주로 주 1회",
  contact_info: "examle@example.com",
  application_method: "대면 오디션",
  other_conditions: "공연 경험 있으면 우대",

  recruitment_type: { id: "asdfadsfa", name: "고정 밴드" },

  genres: [
    {
      id: "143125235",
      name: "인디락",
    },
    {
      id: "14313asdfa25235",
      name: "하드락",
    },
  ],

  orientation: {
    id: "asdfagsdfjoppjo",
    name: "취미",
  },

  positions: [
    {
      position_id: "1222",
      position_name: "키보드",
      experience_level_id: "312345",
      experience_level_name: "취미 1년 이상 3년 이하",
    },
    {
      position_id: "12234t622",
      position_name: "여보컬",
      experience_level_id: "312315545",
      experience_level_name: "취미 1년 이상 3년 이하",
    },
  ],

  regions: [
    {
      id: "12415r123t5234",
      name: "서울 서부",
    },
    {
      id: "12r123t5234",
      name: "서울 남부",
    },
  ],

  image_url: "https://dummyimage.com/600x400/000/fff​",
};

//실제론 api로 호출
const dummyCommenList: CommentList = {
  next_cursor: "cursor_12345",
  comments: [
    {
      id: "comment_1",
      content: "첫 번째 댓글입니다.",
      created_at: "2025-08-12T10:30:00Z",
      post: {
        id: "post_1",
        title: "첫 번째 게시글 제목",
      },
      children: [
        {
          id: "comment_1_1",
          content: "첫 번째 댓글의 대댓글입니다.",
          created_at: "2025-08-12T11:00:00Z",
          post: {
            id: "post_1",
            title: "첫 번째 게시글 제목",
          },
          children: [],
          is_owner: false,
          author: {
            user_id: "user_002",
            nickname: "김한주",
          },
        },
      ],
      is_owner: true,
      author: {
        user_id: "user_001",
        nickname: "유다빈",
      },
    },
    {
      id: "comment_2",
      content: "두 번째 댓글입니다.",
      created_at: "2025-08-12T12:15:00Z",
      post: {
        id: "post_2",
        title: "두 번째 게시글 제목",
      },
      children: [],
      is_owner: false,
      author: {
        user_id: "user_003",
        nickname: "최웅희",
      },
    },
  ],
};

export default function RecruitmentDetail() {
  const { postId } = useParams();

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
  } = dummyPostData;

  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    setTimeDiff(getTimeDiff(new Date(createdAt)));
  }, [createdAt, setTimeDiff]);

  if (!postId) {
    return <div>해당 게시물은 삭제되었습니다.</div>;
  }

  return (
    <div className="bg-bg-primary text-text-primary p-2 flex justify-center ">
      <div className="flex flex-col gap-3 items-center max-w-full min-w-0 ">
        <div className="flex flex-col max-w-2xl min-w-0">
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
              <Text variant="subText">{`${timeDiff}`}</Text>
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
                    experience_level_name: experienceLevelName,
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
                <Link to="#">
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
          {dummyCommenList.comments.length > 0 ? (
            dummyCommenList.comments.map((comment) => (
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

interface TogglePostStatusModalProps {
  isClosed: boolean;
  postId: string;
}

function TogglePostStatusModal({ isClosed, postId }: TogglePostStatusModalProps) {
  const handleClick = () => {
    //실제 api 연결
    console.log(`${postId} 마감 상태 변경`);
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button color="error" variant="outline">
          <Text>{isClosed ? "다시 열기" : "마감하기"}</Text>
        </Button>
      </ModalTrigger>
      <ModalContent className="flex flex-col items-start justify-start p-2 space-y-5">
        <H3 className="text-text-primary">
          {isClosed ? "다시 열시겠습니까?" : "마감하시겠습니까?"}
        </H3>
        <div className="flex justify-end items-center w-full space-x-2">
          <ModalClose>
            <Button variant="outline" color="error">
              <Text variant="subText" className="text-text-primary">
                취소
              </Text>
            </Button>
          </ModalClose>
          <Button color="error" onClick={handleClick}>
            <Text className="text-text-on-dark" variant="subText">
              {isClosed ? "다시 열기" : "마감하기"}
            </Text>{" "}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
