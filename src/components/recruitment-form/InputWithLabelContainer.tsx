import type { ReactNode } from "react";

export default function InputWithLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-start space-y-0.5 w-full">{children}</div>
  );
}
