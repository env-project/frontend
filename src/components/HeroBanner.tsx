"use client";

import H1 from "./text/H1";
import Text from "./text/Text";
import { cn } from "@/libs/utils";

export default function HeroBanner() {
  return (
    <div className="relative w-full aspect-[16/6] overflow-hidden bg-black">
      {/* 배경 이미지 */}
      <img
        src="src/assets/images/banner.jpg"
        alt="Band on Stage"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 텍스트 콘텐츠 */}
      <div
        className={cn(
          "relative z-10",
          "w-full h-full",
          "flex flex-col items-center justify-center text-center",
          "px-4"
        )}
      >
        <H1 className="text-2xl sm:py-6 text-text-secondary sm:text-5xl md:text-6xl">
          모이는 밴드 울리는 무대
        </H1>
        <Text className="mt-2 text-sm sm:py-6 sm:text-xl md:text-3xl text-text-secondary">
          지금 바로 시작해보세요. <br /> 당신의 음악 여정이 여기서 시작됩니다.
        </Text>
      </div>
    </div>
  );
}
