import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/libs/utils";
interface TextProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "mainText" | "subText" | "label" | "tooltip" | "button";
  children: ReactNode;
}

export default function Text({
  variant = "mainText",
  children,
  className = "",
  ...rest
}: TextProps) {
  const baseClass = {
    mainText: "font-normal  sm:text-base text-sm",
    subText: "font-normal text-xs sm:text-sm",
    label: "font-medium text-xs",
    tooltip: "font-normal text-[11px]",
    button: "font-semibold text-xs",
  }[variant];

  return (
    <span className={cn(baseClass, className)} {...rest}>
      {children}
    </span>
  );
}
