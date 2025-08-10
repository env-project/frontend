import type { ComponentProps, FC } from "react";
import { Link } from "react-router";
import Text from "@/components/text/Text";

// primary: 배경색 있는 버튼 , secondary: 배경색 없는 버튼
interface LinkButtonProps extends ComponentProps<typeof Link> {
  title: string;
  type: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

//재사용 링크버튼
const LinkButton: FC<LinkButtonProps> = ({ title, to, type, onClick, className = "", ...rest }) => {
  const primaryClasses =
    "bg-primary-thick text-text-on-dark hover:bg-white hover:text-text-primary hover:border-primary-thick";
  const secondaryClasses =
    "bg-white border border-transparent hover:text-text-primary hover:border-1 hover:border-primary-thick";
  const classes = type === "primary" ? primaryClasses : secondaryClasses;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-2 rounded-md border-1 transition-colors duration-300 ease-in-out ${classes} ${className}`}
      {...rest}
    >
      <Text variant="subText" className="sm:text-lg">
        {title}
      </Text>
    </Link>
  );
};

export default LinkButton;
