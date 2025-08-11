import { useState, useCallback, type FC } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "@/components/darkMode/DarkModeToggle";

import HamburgerIcon from "@/components/icons/BurgerIcon";
import NavigationLink from "@/components/header/NavigationLink";
import Button from "@/components/Button";
import Text from "@/components/text/Text";

const Header: FC = () => {
  const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 버거버튼 클릭 시 상태 변경
  const toggleBurger = useCallback(() => {
    setBurgerOpen((prev) => !prev);
  }, []);

  // 다크모드 클릭 시 상태 변경
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // 로그인 클릭 시 상태 변경
  const toggleLogin = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <header
      className={`relative flex justify-between items-center w-full h-[52px] sm:h-[80px] px-4 sm:px-6 sm:py-0 ${isBurgerOpen ? "shadow-lg" : ""} sm:shadow-none`}
    >
      {/* 메인 로고 */}
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[70px] md:w-[80px] ml-2" />
      </Link>

      {/* 데스크톱 네비게이션 링크 (PC에서만 보임) */}
      <div className="items-center justify-around hidden gap-16 sm:flex">
        <NavigationLink title="Profile List" to="#" />
        <NavigationLink title="Find People" to="#" />
      </div>

      <div className="flex items-center gap-8 ">
        {/* 다크 모드 토글 버튼 */}
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />

        {/* 햄버거 메뉴 버튼 (모바일에서만 보임) */}
        <button
          onClick={toggleBurger}
          className="flex items-center justify-end sm:hidden"
          aria-expanded={isBurgerOpen}
          aria-controls="mobile-menu"
        >
          <HamburgerIcon />
        </button>

        {/* 데스크톱 인증 버튼 (PC에서만 보임) */}
        {isLogin ? (
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <Link to="#">
              <Button variant="link-primary">
                <Text variant="mainText">MyPage</Text>
              </Button>
            </Link>
            <Link to="#">
              <Button variant="link-secondary" onClick={toggleLogin}>
                <Text variant="mainText">Logout</Text>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <Link to="#">
              <Button variant="link-secondary" className="w-full">
                <Text variant="mainText">로그인</Text>
              </Button>
            </Link>
            <Link to="#">
              <Button variant="link-primary" className="w-full">
                <Text variant="mainText">회원가입</Text>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* 모바일 드롭다운 메뉴 (모바일에서만 보임) */}
      {isBurgerOpen && (
        <div className="absolute flex flex-col w-[40%] bg-white right-0 top-full text-left p-5 sm:hidden rounded-bl-xl gap-2 shadow-xl">
          <div className="flex flex-col gap-4 my-4">
            <NavigationLink to="#" title="Profile List" onClick={toggleBurger} />
            <NavigationLink to="#" title="People List" onClick={toggleBurger} />
          </div>
          {isLogin ? (
            <>
              <Link to="#">
                <Button variant="link-primary" className="w-full" onClick={toggleBurger}>
                  <Text variant="button">MyPage</Text>
                </Button>
              </Link>
              <Link to="#">
                <Button
                  variant="link-secondary"
                  className="w-full"
                  onClick={() => {
                    toggleLogin();
                    toggleBurger();
                  }}
                >
                  <Text variant="button">Logout</Text>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="#">
                <Button variant="link-secondary" className="w-full" onClick={toggleBurger}>
                  <Text variant="button">로그인</Text>
                </Button>
              </Link>
              <Link to="#">
                <Button variant="link-primary" className="w-full" onClick={toggleBurger}>
                  <Text variant="button">회원가입</Text>
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
