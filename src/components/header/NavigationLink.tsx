import type { FC } from "react";
import { Link } from "react-router";
import Text from "@/components/text/Text";

interface NavigationLinkProps {
  title: string;
  to: string;
  onClick?: () => void;
}

const NavigationLink: FC<NavigationLinkProps> = ({ title, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="transition-transform duration-200 hover:-translate-y-0.5 hover:underline hover:decoration-1 underline-offset-4"
  >
    <Text variant="subText" className="sm:text-lg">
      {title}
    </Text>
  </Link>
);

export default NavigationLink;
