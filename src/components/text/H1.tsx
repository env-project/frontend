import type { ReactNode, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
interface H1Props extends ComponentPropsWithoutRef<"h1"> {
  children: ReactNode;
}

export default function H1({ children, className = "", ...rest }: H1Props) {
  return (
    <h1 className={clsx("text-2xl font-bold sm:text-3xl", className)} {...rest}>
      {children}
    </h1>
  );
}
