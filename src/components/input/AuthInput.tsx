import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Text from "@/components/text/Text";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "email" | "number";
  error?: string;
}

export default function AuthInput({
  className,
  type = "text",
  error,
  placeholder,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  let currentType = type;
  if (type === "password") {
    currentType = showPassword ? "text" : "password";
  }

  return (
    <div className="flex flex-col gap-1 py-4">
      <div
        className={clsx(
          "flex bg-bg-secondary text-text-primary w-[325px]  md:w-[500px] p-3 rounded-lg ",
          error && "border border-error"
        )}
      >
        <input
          type={currentType}
          placeholder={placeholder}
          className={clsx(
            "focus:outline-none w-full border-none bg-transparent placeholder-text-primary",
            className
          )}
          {...rest}
        />
        {type === "password" && (
          <button type="button" onClick={togglePassword} className="cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </button>
        )}
      </div>
      {error && <Text className="text-error text-xs px-2">{error}</Text>}
    </div>
  );
}
