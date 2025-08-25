import RecruitmentCard from "@/components/RecruitmentCard";
import { usePopularRecruitment } from "@/hooks/queries/usePopularRecruitment";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import InlineSpinner from "./loading/InlineSpinner";
import useWindowWidth from "@/hooks/useWindowWidth";
import { cn } from "@/libs/utils";

export default function PopularRecruitmentList() {
  const { data, isPending } = usePopularRecruitment({ sortBy: "views", limit: 20 });

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 3, spacing: 15 },
    breakpoints: {
      "(max-width: 700px)": { slides: { perView: 1, spacing: 10 } },
      "(min-width: 701px) and (max-width: 1024px)": { slides: { perView: 2, spacing: 10 } },
      "(min-width: 1025px)": { slides: { perView: 3, spacing: 10 } },
      "(min-width: 1545px)": { slides: { perView: 4, spacing: 10 } },
    },
  });

  const width = useWindowWidth();

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
      <button onClick={() => slider.current?.prev()} className={cn(width > 420 ? "px-2" : "")}>
        {width > 420 ? "◀" : ""}
      </button>
      <div ref={sliderRef} className="w-full px-4 keen-slider">
        {data.posts.map((post) => (
          <div key={post.id} className="keen-slider__slide max-w-80">
            <RecruitmentCard
              postData={post}
              className={cn("h-76 hover:shadow-none", width > 420 ? "" : "w-60")}
            />
          </div>
        ))}
      </div>
      <button onClick={() => slider.current?.next()} className={cn(width > 420 ? "px-2" : "")}>
        {width > 420 ? "▶" : ""}
      </button>
    </div>
  );
}
