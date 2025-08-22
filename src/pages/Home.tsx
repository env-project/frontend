import HeroBanner from "@/components/HeroBanner";
import PopularRecruitmentList from "@/pages/recruitment-post/PopularRecruitmentList";
import PopularProfileList from "@/pages/profile/PopularProfileList";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <HeroBanner />
      <PopularRecruitmentList />
      <PopularProfileList />
    </div>
  );
}
