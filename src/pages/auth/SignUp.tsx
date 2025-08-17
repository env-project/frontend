import Button from "@/components/Button";
import AuthInput from "@/components/input/AuthInput";
import Text from "@/components/text/Text";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z
  .object({
    nickName: z
      .string()
      .min(2, { message: "닉네임은 최소 2글자 이상 입력해주세요" })
      .regex(/^[가-힣a-zA-Z0-9]+$/, { message: "닉네임은 한글, 영문, 숫자만 가능합니다" }),
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }),
    password: z.string().min(8, { message: "비밀번호는 최소 8자리 입력해주세요" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof SignUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  const handleGoogleSignUp = (): void => {};

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-[url('/background.jpg')] bg-cover sm:bg-fixed relative before:absolute before:inset-0 before:bg-black/50 pt-[120px] pb-[80px]">
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

        <Text className="text-2xl font-semibold leading-relaxed whitespace-pre-line sm:text-3xl text-text-on-dark">
          반가워요! <span className="font-extrabold text-secondary-soft">회원가입</span> 하고
          <br />
          <span className="font-extrabold text-secondary-soft">나만의 밴드</span>를 찾아보세요.
        </Text>
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col gap-2">
            <AuthInput
              {...register("nickName")}
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickName?.message}
            />
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
            <AuthInput
              {...register("confirmPassword")}
              type="password"
              placeholder="비밀번호를 확인해주세요"
              error={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Button
              variant="default"
              className="p-3 bg-primary-thick hover:scale-100 disabled:bg-error"
              disabled={isSubmitting}
            >
              <Text className="text-base font-semibold text-text-on-dark ">회원가입</Text>
            </Button>
            <Button
              variant="default"
              className="p-3 bg-bg-secondary hover:scale-100"
              onClick={handleGoogleSignUp}
            >
              <FcGoogle size={24} />
              <Text className="text-base font-semibold">Google</Text>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
