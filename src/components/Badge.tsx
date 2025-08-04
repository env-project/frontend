import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import Text from "@/components/text/Text";

type BadgeColor = "primary";

// 뱃지 컴포넌트 prop 타입 정의
interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  label?: string;
  children?: ReactNode;
  color?: BadgeColor;
  textVariant?: "label" | "mainText" | "subText" | "tooltip";
}

export default function Badge({
  label,
  children,
  color = "primary", // 기본 색상: primary
  textVariant = "label", // 기본 텍스트 스타일: label
  className = "",
  ...rest
}: BadgeProps) {
  const colorMap = {
    primary: "bg-[var(--color-primary-soft)] text-[var(--color-text-primary)]",
  };

  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 rounded-full transition-colors",
        colorMap[color],
        className
      )}
      {...rest}
    >
      <Text variant={textVariant} className="whitespace-nowrap">
        {label ?? children}
      </Text>
    </span>
  );
}
