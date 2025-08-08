import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import DarkModeToggle from "@/components/darkMode/DarkModeToggle";

//LinkButton 컴포넌트는 링크로 연결된 버튼의 역할
import LinkButton from "@/components/header/LinkButton";
import BurgerIcon from "@/components/icons/BurgerIcon";
import NavigationLink from "@/components/header/NavigationLink";

// Header 컴포넌트
export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 버거버튼 클릭 시 상태 변경
  const BurgerBtn = useCallback(() => {
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
      className={`relative flex justify-between items-center w-full h-[52px] sm:h-[80px] px-4 sm:px-6 sm:py-0 ${burgerOpen ? "shadow-lg" : ""} sm:shadow-none`}
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
        {/* 다크 모드 토글 버튼( PC / 모바일 둘 다) */}
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />

        {/* 햄버거 버튼 (모바일에서만 보임) */}
        <button onClick={BurgerBtn} className="flex items-center justify-end sm:hidden">
          <BurgerIcon />
        </button>

        {/* 데스크톱 인증 버튼 (PC에서만 보임) */}
        {isLogin ? (
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <LinkButton title="myPage" to="#" type="primary" />
            <LinkButton title="Logout" to="#" type="secondary" onClick={toggleLogin} />
          </div>
        ) : (
          <div className="items-center justify-end hidden gap-1 sm:flex">
            <LinkButton title="로그인" to="#" type="secondary" />
            <LinkButton title="회원가입" to="#" type="primary" />
          </div>
        )}
      </div>

      {/* 모바일 드롭다운 메뉴 (모바일에서만 보임) */}
      {burgerOpen && (
        <div className="absolute flex flex-col w-[40%] bg-white right-0 top-full text-left p-5 sm:hidden rounded-bl-xl gap-2 shadow-xl">
          <div className="flex flex-col gap-4 my-4">
            <NavigationLink title="Profile List" to="#" onClick={BurgerBtn} />
            <NavigationLink title="People List" to="#" onClick={BurgerBtn} />
          </div>

          {/* 로그인 상태에 따라 보여주는 버튼 달리함*/}
          {isLogin ? (
            <>
              <LinkButton title="myPage" to="#" type="primary" onClick={BurgerBtn} />
              <LinkButton
                title="Logout"
                to="#"
                type="secondary"
                onClick={() => {
                  toggleLogin();
                  BurgerBtn();
                }}
              />
            </>
          ) : (
            <>
              <LinkButton title="로그인" to="#" type="secondary" onClick={BurgerBtn} />
              <LinkButton title="회원가입" to="#" type="primary" onClick={BurgerBtn} />
            </>
          )}
        </div>
      )}
    </header>
  );
}
