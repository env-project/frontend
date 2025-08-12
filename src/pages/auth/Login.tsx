import Button from "@/components/Button";
import AuthInput from "@/components/input/AuthInput";
import Text from "@/components/text/Text";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
import type { FC } from "react";

const LogIn: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-0">
      <div className="w-full max-w-[585px] flex flex-col gap-16 p-6 sm:px-8 py-16 sm:border-hidden sm:shadow-2xl sm:rounded-3xl">
        <Link to="/" className="hover:cursor-pointer sm:hidden">
          <Text variant="mainText" className="flex items-center gap-2 font-semibold">
            <FaArrowLeftLong />
            로그인
          </Text>
        </Link>
        <Text className="text-3xl font-semibold sm:text-3xl sm:font-bold">
          악기하나
          <br />
          비어 있어요
        </Text>
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col gap-2">
            <AuthInput type="email" placeholder="이메일을 입력해주세요" />
            <AuthInput type="password" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="default" className="p-3 bg-primary-thick hover:scale-100">
              <Text className="text-base font-semibold text-text-on-dark">로그인</Text>
            </Button>
            <Button variant="default" className="p-3 bg-bg-secondary hover:scale-100">
              <FcGoogle size={24} />
              <Text className="text-base font-semibold">Google</Text>
            </Button>
          </div>
        </div>
        <Link to="/sign-up" className="text-center">
          <Text variant="mainText">아직 회원이 아니신가요? 회원가입</Text>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
