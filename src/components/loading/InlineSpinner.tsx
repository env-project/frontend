import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
import Text from "@/components/text/Text";

export default function InlineSpinner({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...rest}>
      <div
        className={cn(
          "h-5 w-5 rounded-full border-2 border-current border-t-transparent",
          "animate-spin motion-reduce:animate-none"
        )}
        aria-hidden="true"
      />
      <Text className="sr-only">로딩 중</Text>
    </div>
  );
}
