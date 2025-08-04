import { Routes, Route } from "react-router";
import Text from "@/components/text/Text";

//react router dom 테스트용 개발 시 삭제
function Home() {
  return (
    <div>
      <Footer />
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
