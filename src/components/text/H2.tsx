import type { ReactNode, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
interface H2Props extends ComponentPropsWithoutRef<"h2"> {
  children: ReactNode;
}

export default function H2({ children, className = "", ...rest }: H2Props) {
  return (
    <h2 className={clsx("text-xl font-semibold sm:text-2xl", className)} {...rest}>
      {children}
    </h2>
  );
}
