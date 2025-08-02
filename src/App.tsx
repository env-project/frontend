import { Routes, Route } from "react-router";

//react router dom 테스트용 개발 시 삭제
function Home() {
  return <div>home</div>;
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
