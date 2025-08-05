import { useRef } from "react";
import Text from "@/components/text/Text";

export default function ImageInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="flex justify-center items-center border-2 border-dotted size-96 border-gray-600 rounded-xl bg-bg-primary transition-colors hover:bg-bg-secondary"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center items-center">
        <Text variant="subText" className="text-center">
          대표사진을 업로드해주세요.
        </Text>
        <Text variant="tooltip" className="text-center">
          사진은 한 장, 5mb 이하, jpg 혹은 png 파일만 가능합니다.
        </Text>
      </div>

      <input type="file" accept="image/*" className="hidden" ref={inputRef} />
    </div>
  );
}
