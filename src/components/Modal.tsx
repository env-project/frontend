import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ComponentProps,
  type ReactElement,
} from "react";
import { cn } from "@/libs/utils";
import Button from "./Button";
import type { ButtonProps } from "./Button";

/* --------------------
   Context
-------------------- */
interface ModalContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal components must be used within <Modal>");
  return ctx;
}

/* --------------------
   1. Trigger
-------------------- */
interface ModalTriggerProps extends ButtonProps {
  children: ReactNode;
}

function ModalTrigger({ children, ...rest }: ModalTriggerProps) {
  const { toggle } = useModalContext();
  return (
    <Button
      onClick={(e) => {
        toggle();
        rest.onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

/* --------------------
   2. Content
-------------------- */
interface ModalContentProps extends ComponentProps<"div"> {
  children: ReactNode;
}

function ModalContent({ children, className, ...props }: ModalContentProps) {
  const { isOpen } = useModalContext();
  return (
    <div
      className={cn(
        isOpen ? "visible" : "hidden",
        "size-10 border-neutral-600 border-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* --------------------
   3. Wrapper
-------------------- */
interface ModalProps {
  children: [ReactElement<typeof ModalTrigger>, ReactElement<typeof ModalContent>];
}

function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <ModalContext.Provider value={{ isOpen, toggle }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

export { Modal, ModalContent, ModalTrigger };
