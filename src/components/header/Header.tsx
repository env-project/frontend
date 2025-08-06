import Text from "@/components/text/Text";
import { Link } from "react-router-dom";
import ToggleBtn from "@/components/button/ToggleBtn";
import { useState } from "react";
import Button from "../Button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="grid justify-between w-full h-[52px] md:h-[64px] grid-cols-2 md:grid-cols-4 px-3 py-3 md:px-6 md:py-4">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[70px] " />
      </Link>
      <div className="items-center justify-around hidden gap-5 md:gap-14 md:flex">
        <Link to="#">
          <Text variant="subText">Profile List</Text>
        </Link>
        <Link to="#">
          <Text variant="subText">Find People</Text>
        </Link>
        <Link to="#">
          <Text variant="subText">Support</Text>
        </Link>
      </div>
      <ToggleBtn className="items-center justify-end hidden md:flex" />
      <button
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        className="flex items-center justify-end md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#49454F" />
        </svg>
      </button>
      <div className="items-center justify-end hidden gap-2 md:flex">
        <Link to="#">
          <Button
            variant="outline"
            color="primary"
            className="w-[120px] bg-white hover:bg-primary-thick hover:text-text-on-dark"
          >
            로그인
          </Button>
        </Link>
        <Link to="#">
          <Button
            variant="outline"
            color="primary"
            className="w-[120px] bg-white hover:bg-primary-thick hover:text-text-on-dark"
          >
            회원가입
          </Button>
        </Link>
      </div>
    </header>
  );
}
