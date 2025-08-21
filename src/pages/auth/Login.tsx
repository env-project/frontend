import Button from "@/components/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_BASE_URL } from "@/constants/api-constants";
import type { TokenInfo } from "@/types/api-res-auth";
import InlineSpinner from "@/components/loading/InlineSpinner";
import { useState } from "react";

const logInSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }),
  password: z.string().min(8, "비밀번호는 최소 8자리 입력해주세요"),
});

type TLogInSchema = z.infer<typeof logInSchema>;

const LogIn = () => {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<AxiosResponse<TokenInfo>, Error, TLogInSchema>({
    mutationFn: (form: TLogInSchema) => {
      const params = new URLSearchParams();
      params.append("username", form.email);
      params.append("password", form.password);

      return axios.post(`${API_BASE_URL}/auth/token`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    },

    onSuccess: (res) => {
      console.log(res.data.access_token);
    },

    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          setApiError("비밀번호가 일치하지 않습니다.");
        } else if (e.status === 404) {
          setApiError("존재하지 않은 이메일입니다.");
        } else if (e.status === 422) {
          setApiError("옳지 않은 형식입니다.");
        } else {
          setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
      } else {
        setApiError("알 수 없는 서버 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) });

  const onSubmit = (form: TLogInSchema) => {
    mutate(form);
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-[url('/background.jpg')] bg-cover -mt-[52px] sm:-mt-[110px] sm:bg-fixed relative before:absolute before:inset-0 before:bg-black/50 pt-[120px] pb-[80px]">
      {/* 폼 컨테이너 */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="
        relative z-10 w-full max-w-[550px] flex flex-col gap-12 px-8 py-16 
        backdrop-blur-sm sm:p-10 sm:border sm:border-neutral-100 sm:shadow-md  
        sm:rounded-3xl sm:backdrop-blur-lg sm:bg-bg-primary/20 sm:shadow-neutral-50
      "
      >
        <Link to="/">
          <Text variant="mainText" className="flex items-center gap-2 text-text-on-dark">
            <FaArrowLeftLong />
            홈으로 돌아가기
          </Text>
        </Link>

        <div className="flex gap-10">
          <Text className="px-2 text-3xl font-semibold leading-normal whitespace-pre-line sm:text-4xl sm:font-bold text-text-on-dark ">
            <span className="text-secondary-soft ">악</span>기
            <span className="text-secondary-soft"> 하</span>
            나
            <br />
            <span className="text-secondary-soft">비</span>어 있어요
          </Text>
        </div>
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col gap-2">
            <Input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
            />
            <Input
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              error={errors.password?.message}
            />
            <Text variant="label" className="text-error">
              {apiError}
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="p-3 bg-primary-thick hover:scale-100 disabled:bg-error"
              disabled={isPending}
            >
              <Text className="text-base font-semibold text-text-on-dark ">
                {isPending ? <InlineSpinner /> : "로그인"}
              </Text>
            </Button>
            <Button variant="default" className="p-3 bg-bg-secondary hover:scale-100">
              <FcGoogle size={24} />
              <Text className="text-base font-semibold">Google</Text>
            </Button>
          </div>
        </div>
        <Link to="/sign-up" className="text-center text-text-on-dark">
          <Text variant="mainText">아직 회원이 아니신가요? 회원가입</Text>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
