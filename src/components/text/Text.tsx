import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
interface TextProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "mainText" | "subText" | "label" | "tooltip";
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
  }[variant];

  return (
    <span className={clsx(baseClass, className)} {...rest}>
      {children}
    </span>
  );
}
