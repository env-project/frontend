import Text from "@/components/text/Text";
import { Link } from "react-router-dom";
import ToggleBtn from "@/components/toggleButton/ToggleBtn";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  //1. 다크 모드 상태를 관리하는 state
  const [isDarkMode, setIsDarkMode] = useState(false);

  //2. 토글 버튼 클릭 시 상태를 변경하는 함수
  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <header
      className={`relative flex justify-between items-center w-full h-[52px] md:h-[60px] px-5 pr-2 py-3 md:py-0  ${menuOpen ? "shadow-lg" : ""}`}
    >
      {/* Main Logo */}
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[70px] " />
      </Link>

      {/* Nav Link */}
      <div className="items-center justify-around hidden gap-8 md:flex ">
        <Link
          to="#"
          className="transition-transform duration-200 hover:-translate-y-0.5 hover:underline underline-offset-4"
        >
          <Text variant="subText" className="text-xs ">
            Profile List
          </Text>
        </Link>
        <Link to="#" className="transition-transform duration-200 hover:-translate-y-0.5">
          <Text variant="subText">Find People</Text>
        </Link>
        <Link to="#" className="transition-transform duration-200 hover:-translate-y-0.5">
          <Text variant="subText">Support</Text>
        </Link>
      </div>

      {/* Dark Mode Toggle btn */}
      <ToggleBtn isDarkMode={isDarkMode} onToggle={handleToggle} />

      {/* burger menu */}
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

      {/* login, signup btn */}
      <div className="items-center justify-end hidden gap-1 md:flex">
        <Link
          to="#"
          className="rounded-md px-5 hover:px-[19.5px] h-[38px] flex items-center justify-center hover:border-1  bg-white hover:text-text-primary hover:border-primary-thick "
        >
          <Text variant="subText">로그인</Text>
        </Link>
        <Link
          to="#"
          className="rounded-md px-5 hover:px-[19.5px] h-[38px] flex items-center justify-center bg-primary-thick text-text-on-dark hover:bg-white hover:text-text-primary hover:border-1 hover:border-primary-thick"
        >
          <Text variant="subText">회원가입</Text>
        </Link>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute flex flex-col w-[40%] bg-white  right-0 top-full  text-left p-5 md:hidden rounded-bl-xl gap-4 shadow-xl">
          <Link to="#">
            <Text variant="label" className="flex cursor-pointer text-text-primary">
              Profile List
            </Text>
          </Link>
          <Link to="#">
            <Text variant="label" className="flex cursor-pointer text-text-primary">
              People List
            </Text>
          </Link>
        </div>
      )}
    </header>
  );
}
