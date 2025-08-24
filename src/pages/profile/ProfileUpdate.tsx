import Button from "@/components/Button";
import Input from "@/components/input/Input";
import ImageInput from "@/components/input/ImageInput";
import Text from "@/components/text/Text";
import InputWithLabelContainer from "@/components/recruitment-form/InputWithLabelContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const { isPending, data: masterData } = useMasterData();

  const { mutate } = useMutation({
    mutationFn: (form: TProfileUpdateSchema) => {
      const requestData = {
        ...form,
      };
      return api.put("/profile", requestData);
    },
    onSuccess: () => {
      navigate("/profile");
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.status === 400) {
          setApiError("잘못된 입력 값입니다.");
        } else if (e.status === 401) {
          setApiError("로그인이 필요합니다.");
        } else {
          setApiError("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        setApiError("서버에 연결할 수 없습니다.");
      }
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TProfileUpdateSchema>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      positions: [],
      regionIds: [],
      genreIds: [],
    },
  });

  const onImageChange = (imageFile: File | null) => {
    if (!imageFile) return;
    setValue("image", imageFile);
  };

  const onSubmit = (form: TProfileUpdateSchema) => {
    console.log(form);
    mutate(form);
  };

  const onCancel = () => {
    reset();
    navigate("/profile");
  };

  return isPending ? (
    <LoadingOverlay />
  ) : masterData ? (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full p-10 mb-20"
      >
        <section className="flex flex-col items-center justify-center w-full gap-24 sm:flex-row ">
          <ImageInput id="image" onChange={onImageChange} className="w-[300px]" />
          <div className="flex flex-col gap-5 flex-grow w-full sm:max-w-[500px]">
            <InputWithLabelContainer>
              <label htmlFor="name">이름:</label>
              <Input
                id="name"
                placeholder="이름을 입력해주세요"
                {...register("name")}
                error={errors.name?.message}
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

            <InputWithLabelContainer>
              <label htmlFor="content">한 줄 소개:</label>
              <Input
                id="content"
                {...register("content")}
                error={errors.content?.message}
                placeholder="안녕하세요, 잘 부탁드립니다"
                className="w-full"
              />
            </InputWithLabelContainer>

            <InputWithLabelContainer>
              <label htmlFor="ProfessionalExperience">경력:</label>
              <Input
                id="ProfessionalExperience"
                {...register("ProfessionalExperience")}
                error={errors.ProfessionalExperience?.message}
                placeholder="ex) 5개월"
                className="w-full"
              />
            </InputWithLabelContainer>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-10 my-20">
          <InputWithLabelContainer>
            <label>선호 장르(복수 선택 가능)</label>
            <ProfileCheckboxInputs register={register} name="genreIds" data={masterData.genres} />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <label>활동 지역(복수 선택 가능)</label>
            <ProfileCheckboxInputs
              register={register}
              type="radio"
              name="regionIds"
              data={masterData.regions}
            />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <ProfilePositionsInputs
              register={register}
              errors={errors}
              control={control}
              positions={masterData.positions}
              experienceLevels={masterData.experience_levels}
            />
          </InputWithLabelContainer>
        </section>
        <Text variant="label" className="text-error">
          {apiError}
        </Text>
        <div className="flex gap-4 ">
          <Button type="button" color="error" onClick={onCancel}>
            <Text className="text-text-on-dark">취소</Text>
          </Button>
          <Button type="submit" color="primary-thick">
            <Text className="text-text-on-dark">저장하기</Text>
          </Button>
        </div>
      </form>
    </>
  ) : (
    <H1 className="text-text-primary">데이터 로딩에 실패했습니다. 잠시후 다시 시도해주세요.</H1>
  );
}
