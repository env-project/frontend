import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "email" | "number";
}

export default function Input({ className, type = "text", ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const currentType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div
      className="flex bg-bg-secondary
     text-text-primary w-[325px]  md:w-[500px] p-3 rounded-lg "
    >
      <input
        type={currentType}
        className={clsx("focus:outline-none w-full border-none bg-transparent", className)}
        {...rest}
      />
      {type === "password" && (
        <button type="button" onClick={togglePassword} className="cursor-pointer">
          {!showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
}
