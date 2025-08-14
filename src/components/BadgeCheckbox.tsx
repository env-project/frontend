import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
import Badge from "@/components/Badge";

type BadgeCheckBoxType = "checkbox" | "radio";

type BadgeCheckBoxSize = "sm" | "md" | "lg";

interface BadgeCheckBoxProps extends Omit<ComponentPropsWithoutRef<"input">, "size" | "type"> {
  label: string;
  size?: BadgeCheckBoxSize;
  type?: BadgeCheckBoxType;
  textVariant?: "label" | "mainText" | "subText" | "tooltip";
}

export default function BadgeCheckBox({
  label,
  size = "md",
  type = "checkbox",
  textVariant = "label",
  className,
  ...rest
}: BadgeCheckBoxProps) {
  return (
    <label className={cn("inline-flex items-center cursor-pointer select-none", className)}>
      <input type={type} className="sr-only peer" {...rest} />
      <Badge
        label={label}
        color={"primary"}
        size={size}
        textVariant={textVariant}
        className={cn("peer-checked:bg-primary-thick")}
      />
    </label>
  );
}
