import { Routes, Route } from "react-router";
import Text from "@/components/text/Text";
import { Badge } from "./components/badge";

//react router dom 테스트용 개발 시 삭제
function Home() {
  return (
    <div>
      <Text>예시 텍스트</Text>
      <Badge label="일렉트릭 기타" />
      <Badge label="드럼" />
    </div>
  );
}
//react router dom 테스트용 개발 시 삭제
function Post() {
  return <div>post</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}

export default App;
