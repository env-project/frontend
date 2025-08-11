import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
import Skeleton from "./Skeleton";

/** 네가 쓰는 타이포(H1/H2/H3/Text.variant) 높이에 맞춘 텍스트 스켈레톤 */
type Variant = "h1" | "h2" | "h3" | "mainText" | "subText" | "label" | "tooltip" | "button";

const map: Record<Variant, string> = {
  h1: "h-8 sm:h-10 rounded",
  h2: "h-7 sm:h-9 rounded",
  h3: "h-6 sm:h-8 rounded",
  mainText: "h-5 rounded",
  subText: "h-4 sm:h-5 rounded",
  label: "h-4 rounded",
  tooltip: "h-3 rounded",
  button: "h-4 rounded",
};

interface Props extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  variant: Variant;
}
export default function SkeletonText({ variant, className, ...rest }: Props) {
  return <Skeleton className={cn(map[variant], className)} {...rest} />;
}
