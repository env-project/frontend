import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
interface H3Props extends ComponentPropsWithoutRef<"h3"> {
  children: ReactNode;
}

export default function H3({ children, className = "", ...rest }: H3Props) {
  return (
    <h3 className={cn("text-lg font-semibold sm:text-xl", className)} {...rest}>
      {children}
    </h3>
  );
}
