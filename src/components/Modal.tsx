import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ComponentProps,
  type ReactElement,
  useEffect,
} from "react";
import { cn } from "@/libs/utils";
import H3 from "./text/H3";

/* --------------------
   Context
-------------------- */
interface ModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
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
  const { open } = useModalContext();
  return (
    <div onClick={open} {...rest} className="hover:cursor-pointer">
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
  const { isOpen, close } = useModalContext();

  // ESC 키 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-bg-on-dark/50 z-40" onClick={close} />

      {/* Modal */}
      <div
        className={cn(
          "fixed z-50 flex flex-col min-w-64 border-primary-soft bg-bg-primary border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg",
          className
        )}
        {...props}
      >
        <div className="w-full flex items-center justify-end p-2">
          <H3
            className=" text-text-primary hover:cursor-pointer p-1"
            onClick={() => {
              close();
            }}
          >
            X
          </H3>
        </div>
        <div className="w-full p-4">{children}</div>
      </div>
    </>
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

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close, toggle }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

export { Modal, ModalContent, ModalTrigger };
