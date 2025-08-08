import type { ComponentProps, ReactNode } from "react";
import Button from "./Button";

interface ModalProps extends ComponentProps<"div"> {
  buttonChildren: ReactNode;
  children: ReactNode;
}

export default function Modal({ buttonChildren, children }: ModalProps) {
  return (
    <div>
      <div>
        <Button>{buttonChildren}</Button>
      </div>
      <div>{children}</div>
    </div>
  );
}
