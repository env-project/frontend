import Button from "@/components/Button";
import AuthInput from "@/components/input/AuthInput";
import Text from "@/components/text/Text";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const logInSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }),
  password: z.string().min(8, "비밀번호는 최소 8자리 입력해주세요"),
});

type TLogInSchema = z.infer<typeof logInSchema>;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <form
      noValidate
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-0 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-[585px] flex flex-col gap-16 p-6 sm:px-8 py-16 sm:border-hidden sm:shadow-2xl sm:rounded-3xl">
        <Link to="/" className=" sm:hidden">
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
            <AuthInput
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
            />
            <AuthInput
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              error={errors.password?.message}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="p-3 bg-primary-thick hover:scale-100 disabled:bg-error"
              disabled={isSubmitting}
            >
              <Text className="text-base font-semibold text-text-on-dark ">
                {isSubmitting ? "좀멘 기다리소" : "로그인"}
              </Text>
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
    </form>
  );
};

export default LogIn;
