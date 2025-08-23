import ProfileCard from "@/components/ProfileCard";
import { usePopularProfiles } from "@/hooks/queries/usePopularProfile";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import InlineSpinner from "./loading/InlineSpinner";

export default function PopularProfileList() {
  const { data, isPending } = usePopularProfiles({ sortBy: "views", limit: 20 });

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

  if (!data || !data.profiles || data.profiles.length === 0) {
    return (
      <div>
        <h1 className="px-8">인기 프로필이 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start text-text-primary">
      <button onClick={() => slider.current?.prev()} className="px-2 ">
        ◀
      </button>
      <div ref={sliderRef} className="w-full px-4 keen-slider">
        {data.profiles.map((post) => (
          <div key={post.user_id} className="keen-slider__slide">
            <ProfileCard profile={post} key={post.user_id} />
          </div>
        ))}
      </div>
      <button onClick={() => slider.current?.next()} className="px-2 ">
        ▶
      </button>
    </div>
  );
}
