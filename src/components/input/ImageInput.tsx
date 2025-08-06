import { useRef, useState } from "react";
import Text from "@/components/text/Text";
import Button from "@/components/Button";

export default function ImageInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleClick = () => {
    setError("");
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 파일 타입, 크기 제한 검사
    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setError("유효하지 않은 파일입니다. JPG 또는 PNG 파일이며, 5MB 이하여야 합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return preview ? (
    <Preview preview={preview} setPreview={setPreview} />
  ) : (
    <div
      className="flex flex-col justify-center items-center border-2 border-dotted size-96 border-gray-600 rounded-xl bg-bg-primary transition-colors hover:bg-bg-secondary"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center items-center">
        {error ? (
          <Text variant="subText" className="text-error">
            {error}
          </Text>
        ) : (
          <>
            <Text variant="subText" className="text-center">
              대표사진을 업로드해주세요.
            </Text>
            <Text variant="tooltip" className="text-center">
              사진은 한 장, 5mb 이하, jpg 혹은 png 파일만 가능합니다.
            </Text>
          </>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
}

interface PreviewProps {
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

function Preview({ preview, setPreview }: PreviewProps) {
  return (
    <div className="flex flex-col justify-center items-center w-96 space-y-1">
      <img src={preview} alt="preview-image" className="w-full object-contain rounded-xl" />
      <Button
        onClick={() => {
          setPreview("");
        }}
      >
        <Text variant="label" className="text-text-on-dark">
          다른 사진 고르기
        </Text>
      </Button>
    </div>
  );
}
