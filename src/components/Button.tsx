import { cn } from "@/libs/utils";
import type { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "outline";
  color?:
    | "primary"
    | "primary-thick"
    | "primary-soft"
    | "secondary"
    | "secondary-thick"
    | "secondary-soft"
    | "error"
    | "neutral"
    | "neutral-soft";
  children: ReactNode;
  className?: string;
}

const getVariantClasses = (variant: ButtonProps["variant"], color: ButtonProps["color"]) => {
  if (variant === "outline") {
    return cn("border border-1 bg-bg-primary", {
      "border-primary": color === "primary",
      "border-primary-thick": color === "primary-thick",
      "border-primary-soft": color === "primary-soft",
      "border-secondary": color === "secondary",
      "border-secondary-thick": color === "secondary-thick",
      "border-secondary-soft": color === "secondary-soft",
      "border-error": color === "error",
      "border-neutral-600": color === "neutral",
      "border-neutral-300": color === "neutral-soft",
    });
  }

  return cn({
    "bg-primary": color === "primary",
    "bg-primary-thick": color === "primary-thick",
    "bg-primary-soft": color === "primary-soft",
    "bg-secondary": color === "secondary",
    "bg-secondary-thick": color === "secondary-thick",
    "bg-secondary-soft": color === "secondary-soft",
    "bg-error": color === "error",
    "bg-neutral-600": color === "neutral",
    "bg-neutral-300": color === "neutral-soft",
  });
};

export default function Button({
  variant = "default",
  color = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-6 py-2 rounded-md transition-all active:scale-95 hover:cursor-pointer hover:scale-105 focus:outline-none duration-300 ease-in-out",
        getVariantClasses(variant, color),
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
