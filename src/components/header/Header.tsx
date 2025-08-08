import Text from "@/components/text/Text";
import { Link } from "react-router-dom";
import { useState } from "react";
import DarkModeToggle from "../darkMode/DarkModeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogined, setIsLogined] = useState<boolean>(true);

  //1. 토글 버튼 클릭 시 상태를 변경하는 함수
  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header
      className={`relative flex justify-between items-center w-full h-[52px] sm:h-[60px] px-5 pr-2 py-3 sm:py-0  ${menuOpen ? "shadow-lg" : ""}`}
    >
      {/* Main Logo */}
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[70px] " />
      </Link>

      {/* Nav Link */}
      <div className="items-center justify-around hidden gap-16 sm:flex ">
        <Link
          to="#"
          className="transition-transform duration-200 hover:-translate-y-0.5 hover:underline hover:decoration-1 underline-offset-4"
        >
          <Text variant="subText" className="font-semibold ">
            Profile List
          </Text>
        </Link>
        <Link
          to="#"
          className="transition-transform duration-200 hover:-translate-y-0.5 hover:underline hover:decoration-1 underline-offset-4"
        >
          <Text variant="subText" className="font-semibold">
            Find People
          </Text>
        </Link>
        {/* <Link to="#" className="transition-transform duration-200 hover:-translate-y-0.5">
          <Text variant="subText">Support</Text>
        </Link> */}
      </div>

      <div className="flex items-center gap-4 ">
        {/* Dark Mode Toggle btn */}
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={handleToggle} />

        {/* burger menu */}
        <button
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
          className="flex items-center justify-end sm:hidden"
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

        {!isLogined ? (
          // {/* 로그인 상태- myPage, logout 버튼 */}
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <Link
              to="#"
              className="rounded-md px-5 h-[38px] flex items-center border-1 justify-center bg-primary-thick text-text-on-dark hover:bg-white hover:text-text-primary  hover:border-primary-thick"
            >
              <Text variant="subText">myPage</Text>
            </Link>
            <Link
              to="#"
              className="rounded-md px-5 h-[38px] flex items-center border border-transparent  justify-center  bg-white hover:text-text-primary hover:border-1  hover:border-primary-thick "
            >
              <Text variant="subText">Logout</Text>
            </Link>
          </div>
        ) : (
          // {/* 비로그인상태- login, signup btn */}
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <Link
              to="#"
              className="rounded-md px-5 h-[38px] flex items-center border border-transparent  justify-center  bg-white hover:text-text-primary hover:border-1  hover:border-primary-thick "
            >
              <Text variant="subText">로그인</Text>
            </Link>
            <Link
              to="#"
              className="rounded-md px-5  h-[38px] flex items-center border-1 justify-center bg-primary-thick text-text-on-dark hover:bg-white hover:text-text-primary  hover:border-primary-thick"
            >
              <Text variant="subText">회원가입</Text>
            </Link>
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute flex flex-col w-[40%] bg-white  right-0 top-full  text-left p-5 sm:hidden rounded-bl-xl gap-4 shadow-xl">
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
