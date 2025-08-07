import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Text from "@/components/text/Text";
import { cn } from "@/libs/utils";

type BadgeColor = "primary" | "secondary";
type BadgeSize = "sm" | "md" | "lg";

// 뱃지 컴포넌트 prop 타입 정의
interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  label?: string;
  children?: ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  textVariant?: "label" | "mainText" | "subText" | "tooltip";
}

export default function Badge({
  label,
  children,
  color = "primary", // 기본 색상: primary
  size = "md", // 기본 사이즈: md
  textVariant = "label", // 기본 텍스트 스타일: label
  className = "",
  ...rest
}: BadgeProps) {
  const colorMap = {
    primary: "bg-primary-soft color-text-primary",
    secondary: "bg-secondary-soft color-text-primary",
  } satisfies Record<BadgeColor, string>;
  const sizeMap = {
    sm: "px-2 py-0.5",
    md: "px-3 py-1",
    lg: "px-4 py-1.5",
  } satisfies Record<BadgeSize, string>;

  return (
    <span
      className={cn(
        "inline-block rounded-full transition-colors",
        colorMap[color],
        sizeMap[size],
        className
      )}
      {...rest}
    >
      <Text variant={textVariant} className="whitespace-nowrap">
        {label || children}
      </Text>
    </span>
  );
}
