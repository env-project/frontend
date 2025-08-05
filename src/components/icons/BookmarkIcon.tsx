import type { ComponentProps } from "react";

interface Props extends ComponentProps<"svg"> {
  color?: string; // 사용자 정의 색상 prop
}

export default function BookmarkIconFilled({
  color = "var(--color-primary)", // 기본 색상 지정
  ...props
}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 3C5.44772 3 5 3.44772 5 4V21.382C5 21.9362 5.7096 22.1879 6.08729 21.7656L12 15.25L17.9127 21.7656C18.2904 22.1879 19 21.9362 19 21.382V4C19 3.44772 18.5523 3 18 3H6Z" />
    </svg>
  );
}
