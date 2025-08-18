import { useParams } from "react-router";

export default function RecruitmentDetail() {
  const { postId } = useParams();

  return <div>RecruitmentDetail of {postId}</div>;
}
