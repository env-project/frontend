import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
interface H1Props extends ComponentPropsWithoutRef<"h1"> {
  children: ReactNode;
}

export default function H1({ children, className = "", ...rest }: H1Props) {
  return (
    <h1 className={cn("text-2xl font-bold sm:text-3xl", className)} {...rest}>
      {children}
    </h1>
  );
}
