import Text from "@/components/text/Text";
import { Link } from "react-router-dom";
import ToggleBtn from "@/components/button/ToggleBtn";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="grid justify-between w-full h-[52px] md-[64px] grid-cols-2 md:grid-cols-3 px-3 py-3 md:px-6 md:py-4">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[70px] " />
      </Link>
      <div className="justify-around hidden md:gap-14 md:flex">
        <div className="flex items-center gap-5">
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
        <ToggleBtn />
      </div>
      <button
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        className="flex items-center justify-end md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#49454F" />
        </svg>
      </button>
      <div className="justify-end hidden gap-4 md:flex">
        <Link to="#">
          <Text className="text-sm font-semibold text-text-primary">로그인</Text>
        </Link>
        <Link to="#">
          <Text className="text-sm font-semibold text-text-primary">회원가입</Text>
        </Link>
      </div>
    </header>
  );
}
