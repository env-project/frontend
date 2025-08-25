import Button from "@/components/Button";
import Input from "@/components/input/Input";
// import ImageInput from "@/components/input/ImageInput";
import Text from "@/components/text/Text";
import InputWithLabelContainer from "@/components/recruitment-form/InputWithLabelContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  profileUpdateSchema,
  type TProfileUpdateSchema,
} from "@/types/zod-schema/profile-update-schema";
import ProfileCheckboxInputs from "@/components/profile/ProfileCheckboxInputs";
import ProfilePositionsInputs from "@/components/profile/ProfilePositionInputs";
import useMasterData from "@/hooks/api/useMasterData";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import H1 from "@/components/text/H1";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/libs/axios";
import ImageInput from "@/components/input/ImageInput";

// -------------------- 컴포넌트 --------------------
export default function ProfileUpdate() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const { isPending, data: masterData } = useMasterData();

  const {
    register, // 각 input을 리훅폼에 연결해서 value onchange onBlur 등을 자동으로 관리
    handleSubmit, // form 제출 시 유효성 검사 후 onsubmit 콜백 실행, 실패하면 errors 반환
    control, //s useFieldArray, controller 같은 고급 기능에서 폼 상태 제어시 사용
    formState: { errors }, // 각 필드의 유효성 검사 에러 정보 담고 있는 객체
    reset, // 폼 전체를 초기값으로 리셋할 때 사용
    setValue,
  } = useForm({
    resolver: zodResolver(profileUpdateSchema), // resolver는 외부 라이브러리 스키마 기반 검증과 리액트훅폼을 연결해주는 다리
    defaultValues: {
      nickname: "",
      email: "",
      positions: [],
      regions: [],
      genres: [],
      is_public: true,
    },
  });

  //useMutation은 데이터 수정/생성/삭제 용
  const { mutate } = useMutation({
    //mutate는 useMutation에서 제공하는 함수로, 실제 서버 요청을 실행하는 거야.
    // mutationFn: 실제 서버에 요청을 보내는 함수
    // payload: useForm에서 받아온 폼 데이터 전체 (TProfileUpdateSchema 타입)
    mutationFn: (payload: TProfileUpdateSchema) => {
      // 서버에 보낼 최종 데이터만 뽑아서 객체로 생성
      const dataToSend = {
        nickname: payload.nickname,
        email: payload.email,
        //image_url: payload.image_url,
        is_public: payload.is_public,
        regions: payload.regions,
        genres: payload.genres,
        positions: payload.positions,
      };
      // 서버 PATCH 요청, Content-Type: application/json
      return api.patch("/users/me/profile", dataToSend);
    },

    // 요청 성공 시 실행되는 콜백
    // 여기서는 프로필 페이지로 이동
    onSuccess: () => navigate("/profile"),

    // 요청 실패 시 실행되는 콜백
    onError: (e) => {
      // AxiosError인지, 서버에서 응답이 있는지 체크
      if (e instanceof AxiosError && e.response) {
        // axios 라이브러리에서 http요청 실패시 주어지는 에러 객체로 response, request, config등 http요청관련정보들어있음
        if (e.response.status === 400)
          setApiError("잘못된 입력 값입니다."); // 400 Bad Request
        else if (e.response.status === 401)
          setApiError("로그인이 필요합니다."); // 401 Unauthorized
        else setApiError("알 수 없는 오류가 발생했습니다."); // 그 외 오류
      } else {
        // 서버 연결 자체가 안 됐을 경우
        setApiError("서버에 연결할 수 없습니다.");
      }
    },
  });

  const onSubmit = (form: TProfileUpdateSchema) => {
    console.log("유효성 검사 통과, API 요청 시작:", form);
    //mutate(form);
  };

  const onCancel = () => {
    reset();
    navigate("/profile");
  };

  const handleImageChange: ((file: File | null) => void) | undefined = (file) => {
    if (!file) return;

    setValue("image", file);
  };

  if (isPending) return <LoadingOverlay />;
  if (!masterData)
    return (
      <H1 className="text-text-primary">데이터 로딩에 실패했습니다. 잠시후 다시 시도해주세요.</H1>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("유효성 검사 실패:", errors);
        setApiError("입력 값이 올바르지 않습니다. (콘솔에서 상세 내용 확인)");
      })}
      className="flex flex-col items-center justify-center w-full p-10 mb-20"
    >
      <section className="flex flex-col items-center justify-center w-full gap-24 sm:flex-row">
        <ImageInput id="image_file" onChange={handleImageChange} className="w-[300px]" />
        <div className="flex flex-col gap-5 flex-grow w-full sm:max-w-[500px]">
          <InputWithLabelContainer>
            <label htmlFor="name">이름:</label>
            <Input
              id="name"
              placeholder="이름을 입력해주세요"
              {...register("nickname")}
              error={errors.nickname?.message}
              className="w-full"
            />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <label htmlFor="email">이메일:</label>
            <Input
              id="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="이메일을 입력해주세요"
              className="w-full"
            />
          </InputWithLabelContainer>

          {/* <InputWithLabelContainer>
            <label htmlFor="content">한 줄 소개:</label>
            <Input
              id="content"
              {...register("content")}
              error={errors.content?.message}
              placeholder="안녕하세요, 잘 부탁드립니다"
              className="w-full"
            />
          </InputWithLabelContainer> */}

          <InputWithLabelContainer>
            <label htmlFor="professional_experience">경력:</label>
            <Input
              id="professional_experience"
              {...register("professional_experience")}
              error={errors.professional_experience?.message}
              placeholder="ex) 5개월"
              className="w-full"
            />
          </InputWithLabelContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 my-20">
        <InputWithLabelContainer>
          <label>선호 장르(복수 선택 가능)</label>
          <ProfileCheckboxInputs
            register={register as UseFormRegister<any>} // any로 캐스팅
            nickname="genre_ids"
            data={masterData.genres}
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <label>활동 지역(복수 선택 가능)</label>
          <ProfileCheckboxInputs
            register={register as UseFormRegister<any>}
            type="checkbox"
            name="region_ids"
            data={masterData.regions}
          />
        </InputWithLabelContainer>

        <InputWithLabelContainer>
          <ProfilePositionsInputs
            register={register as UseFormRegister<any>}
            errors={errors}
            control={control as Control<any>}
            positions={masterData.positions}
            experienceLevels={masterData.experience_levels}
          />
        </InputWithLabelContainer>
      </section>

      <Text variant="label" className="text-error">
        {apiError}
      </Text>

      <div className="flex gap-4">
        <Button type="button" color="error" onClick={onCancel}>
          <Text className="text-text-on-dark">취소</Text>
        </Button>

        <Button type="submit" color="primary-thick">
          <Text className="text-text-on-dark">저장하기</Text>
        </Button>
      </div>
    </form>
  );
}
