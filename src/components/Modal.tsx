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
import Text from "./text/Text";
import H3 from "./text/H3";

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
interface ModalTriggerProps {
  children: ReactNode;
}

function ModalTrigger({ children, ...rest }: ModalTriggerProps) {
  const { toggle } = useModalContext();
  return (
    <div
      onClick={() => {
        toggle();
      }}
      {...rest}
      className="hover:cursor-pointer"
    >
      {children}
    </div>
  );
}

/* --------------------
   2. Content
-------------------- */
interface ModalContentProps extends ComponentProps<"div"> {
  children: ReactNode;
}

function ModalContent({ children, className, ...props }: ModalContentProps) {
  const { isOpen, toggle } = useModalContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        isOpen ? "visible" : "hidden",
        "flex flex-col  min-w-64 border-primary-soft bg-bg-primary border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center justify-end">
        <H3
          className=" text-text-primary hover:cursor-pointer p-1"
          onClick={() => {
            toggle();
          }}
        >
          X
        </H3>
      </div>
      <div className="w-full p-2">{children}</div>
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
