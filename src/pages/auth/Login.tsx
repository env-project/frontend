import Button from "@/components/Button";
import Input from "@/components/input/Input";
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
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="p-3 bg-primary-thick hover:scale-100 disabled:bg-error"
              disabled={isSubmitting}
            >
              <Text className="text-base font-semibold text-text-on-dark ">
                {isSubmitting ? "로그인 중..." : "로그인"}
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
