import { cn } from "@/libs/utils";
import type { ComponentProps, ElementType, ReactNode } from "react";

interface ButtonProps<T extends ElementType = "button"> {
  as?: T;
  variant?: "default" | "outline" | "link-primary" | "link-secondary";
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
  to?: string;
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

  if (variant === "link-primary") {
    return cn(
      "bg-primary-thick text-text-on-dark border-transparent hover:bg-white hover:border-1 hover:text-text-primary hover:border-primary-thick"
    );
  }

  if (variant === "link-secondary") {
    return cn(
      "bg-white border border-transparent hover:text-text-primary hover:border-1 hover:border-primary-thick"
    );
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

export default function Button<T extends ElementType = "button">({
  as,
  variant = "default",
  color = "primary",
  className,
  children,
  ...rest
}: ButtonProps<T> & Omit<ComponentProps<T>, keyof ButtonProps>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "flex items-center justify-center px-6 py-2 rounded-md transition-all active:scale-95 hover:cursor-pointer hover:scale-105 focus:outline-none duration-300 ease-in-out",
        getVariantClasses(variant, color),
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
