import HeroBanner from "@/components/HeroBanner";
import PopularRecruitmentList from "@/components/PopularRecruitmentList";
import PopularProfileList from "@/components/PopularProfileList";
import H2 from "@/components/text/H2";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-14">
      <HeroBanner />
      <section className="flex flex-col gap-4 px-4 sm:gap-6 sm:px-10 ">
        <H2 className="px-8">인기 구인글</H2>
        <PopularRecruitmentList />
      </section>
      <section className="flex flex-col gap-4 px-4 sm:gap-6 sm:px-10">
        <H2 className="px-8">인기 프로필</H2>
        <PopularProfileList />
      </section>
    </div>
  );
}
