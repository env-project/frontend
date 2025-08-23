import RecruitmentCard from "@/components/RecruitmentCard";
import { usePopularRecruitment } from "@/hooks/queries/usePopularRecruitment";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import InlineSpinner from "./loading/InlineSpinner";

export default function PopularRecruitmentList() {
  const { data, isPending } = usePopularRecruitment({ sortBy: "views", limit: 20 });

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 3, spacing: 15 },
    breakpoints: {
      "(max-width: 640px)": { slides: { perView: 1, spacing: 10 } },
      "(min-width: 641px) and (max-width: 1024px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width: 1025px)": { slides: { perView: 4, spacing: 20 } },
      "(min-width: 1545px)": { slides: { perView: 5, spacing: 20 } },
    },
  });

  if (isPending) {
    return <InlineSpinner />;
  }

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div>
        <h1>인기 구인글이 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start text-text-primary">
      <button onClick={() => slider.current?.prev()} className="px-2 ">
        ◀
      </button>
      <div ref={sliderRef} className="w-full px-4 keen-slider">
        {data.posts.map((post) => (
          <div key={post.id} className="keen-slider__slide">
            <RecruitmentCard postData={post} className="h-64" />
          </div>
        ))}
      </div>
      <button onClick={() => slider.current?.next()} className="px-2 ">
        ▶
      </button>
    </div>
  );
}
