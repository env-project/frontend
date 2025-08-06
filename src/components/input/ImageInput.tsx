import { useCallback, useState } from "react";
import Text from "@/components/text/Text";
import Button from "@/components/Button";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

interface ImageInputProps {
  className?: string;
  onChange?: (file: File | null) => void;
}

export default function ImageInput({ className, onChange }: ImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFile = (file: File | null) => {
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setError("유효하지 않은 파일입니다. JPG 또는 PNG, 5MB 이하만 가능");
      onChange?.(null);
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    onChange?.(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFile(acceptedFiles[0] ?? null);
    },
  });

  return (
    <div className={clsx("w-[90%] max-w-96", className)}>
      {previewUrl ? (
        <div className="flex flex-col items-center space-y-1">
          <img src={previewUrl} alt="preview" className="w-full object-contain rounded-xl" />
          <Button
            onClick={() => {
              setPreviewUrl(null);
              onChange?.(null);
            }}
          >
            <Text variant="label" className="text-text-on-dark">
              다른 사진 고르기
            </Text>
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={clsx(
            "flex flex-col justify-center items-center cursor-pointer border-2 border-dotted aspect-square border-neutral-600 rounded-xl bg-bg-primary transition-colors hover:bg-primary-soft",
            isDragActive ? "bg-primary-soft" : ""
          )}
        >
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
                JPG, PNG / 5MB 이하
              </Text>
            </>
          )}
          <input {...getInputProps()} className="hidden" />
        </div>
      )}
    </div>
  );
}
