"use client";

import clsx from "clsx";
import H1 from "./text/H1";
import Text from "./text/Text";

export default function HeroBanner() {
  return (
    <div className="relative w-full aspect-[16/6] overflow-hidden bg-black">
      {/* 배경 이미지 */}
      <img
        src="/images/banner.jpg"
        alt="Band on Stage"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 텍스트 콘텐츠 */}
      <div
        className={clsx(
          "relative z-10",
          "w-full h-full",
          "flex flex-col items-center justify-center text-center",
          "px-4"
        )}
      >
        <H1 className="text-text-secondary text-4xl sm:text-5xl md:text-6xl">
          모이는 밴드 울리는 무대
        </H1>
        <Text variant="subText" className="mt-4 text-text-secondary">
          지금 바로 시작해보세요. 당신의 음악 여정이 여기서 시작됩니다.
        </Text>
      </div>
    </div>
  );
}
