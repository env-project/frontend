import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "outline";
  color?: "primary" | "secondary" | "error" | "neutral";
  children: ReactNode;
}

const getVariantClasses = (variant: ButtonProps["variant"], color: ButtonProps["color"]) => {
  if (variant === "outline") {
    return clsx("border border-1 bg-bg-primary", {
      "border-primary": color === "primary",
      "border-secondary": color === "secondary",
      "border-error": color === "error",
      "border-neutral-600": color === "neutral",
    });
  }

  return clsx({
    "bg-primary": color === "primary",
    "bg-secondary": color === "secondary",
    "bg-error": color === "error",
    "bg-neutral-600": color === "neutral",
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
      className={clsx(
        "px-5 py-2 rounded-xl transition-all active:scale-95 hover:cursor-pointer hover:scale-105 focus:outline-none",
        getVariantClasses(variant, color),
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
