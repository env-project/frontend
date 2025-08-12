import { useState, type ComponentPropsWithoutRef } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Text from "@/components/text/Text";
import { cn } from "@/libs/utils";

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
    <div className="flex flex-col gap-1 ">
      <div
        className={cn(
          "flex bg-bg-secondary text-text-primary p-3 rounded-lg ",
          error && "border border-error"
        )}
      >
        <input
          type={currentType}
          placeholder={placeholder}
          className={cn(
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
      {error && (
        <Text variant="label" className="px-2 text-xs text-error">
          {error}
        </Text>
      )}
    </div>
  );
}
