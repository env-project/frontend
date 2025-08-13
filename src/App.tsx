import { Routes, Route } from "react-router";
import "@/index.css";
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import RecruitmentList from "@/pages/recruitment-post/RecruitmentList";
import ProfileList from "@/pages/profile/ProfileList";
import RecruitmentNewPost from "@/pages/recruitment-post/RecruitmentNewPost";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/recruitment-post">
          <Route index element={<RecruitmentList />} />
          <Route path="/recruitment-post/new-post" element={<RecruitmentNewPost />} />
        </Route>

        <Route path="profile">
          <Route index element={<ProfileList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
