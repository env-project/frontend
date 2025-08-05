import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "email" | "number";
}

export default function Input({ className, type = "text", ...rest }: InputProps) {
  return (
    <div
      className="flex bg-bg-secondary
     text-text-primary w-[325px]  md:w-[500px] p-3 rounded-lg "
    >
      <input
        type={type}
        className={clsx("focus:outline-none w-full border-none bg-transparent", className)}
        {...rest}
      />
    </div>
  );
}
