import Button from "@/components/Button";
import Input from "@/components/input/Input";
import ImageInput from "@/components/input/ImageInput";
import Text from "@/components/text/Text";
import InputWithLabelContainer from "@/components/recruitment-form/InputWithLabelContainer";
import type { MasterData } from "@/types/api-res-common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  profileUpdateSchema,
  type TProfileUpdateSchema,
} from "@/types/zod-schema/profile-update-schema";
import ProfileCheckboxInputs from "@/components/profile/ProfileCheckboxInputs";
import ProfilePositionsInputs from "@/components/profile/ProfilePositionInputs";

const MASTER_DATA: MasterData = {
  regions: [
    { id: "1", name: "서울 서부" },
    { id: "2", name: "서울 동부" },
    { id: "3", name: "서울 남부" },
    { id: "4", name: "서울 북부" },
    { id: "5", name: "인천" },
    { id: "6", name: "부산" },
    { id: "7", name: "대구" },
    { id: "8", name: "광주" },
    { id: "9", name: "대전" },
    { id: "10", name: "울산" },
    { id: "11", name: "제주" },
    { id: "12", name: "경기" },
    { id: "13", name: "강원" },
    { id: "14", name: "충북" },
    { id: "15", name: "충남" },
    { id: "16", name: "경북" },
    { id: "17", name: "경남" },
    { id: "18", name: "전북" },
    { id: "19", name: "전남" },
  ],
  positions: [
    { id: "p1", name: "보컬" },
    { id: "p2", name: "일렉 기타" },
    { id: "p3", name: "어쿠스틱 기타" },
    { id: "p4", name: "베이스" },
    { id: "p5", name: "드럼" },
    { id: "p6", name: "키보드" },
    { id: "p7", name: "그 외" },
  ],
  genres: [
    { id: "g1", name: "인디락" },
    { id: "g2", name: "K-pop" },
    { id: "g3", name: "J-pop" },
    { id: "g4", name: "메탈" },
    { id: "g5", name: "하드락" },
    { id: "g6", name: "재즈" },
    { id: "g7", name: "그 외" },
  ],
  experience_levels: [
    { id: "e1", name: "취미 1년 이하" },
    { id: "e2", name: "취미 1~3년" },
    { id: "e3", name: "취미 3~5년" },
    { id: "e4", name: "취미 5년 이상" },
    { id: "e5", name: "전공" },
    { id: "e6", name: "프로" },
  ],
  orientations: [
    { id: "o1", name: "취미" },
    { id: "o2", name: "프로" },
    { id: "o3", name: "프로 지향" },
  ],
  recruitment_types: [
    { id: "r1", name: "고정 밴드" },
    { id: "r2", name: "프로젝트 밴드" },
  ],
  recruiting_post_types: [],
};

export default function ProfileUpdate() {
  const navigate = useNavigate();

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
  };

  const onCancel = () => {
    reset();
    navigate("/profile");
  };

  return (
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
            <ProfileCheckboxInputs register={register} name="genreIds" data={MASTER_DATA.genres} />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <label>활동 지역(복수 선택 가능)</label>
            <ProfileCheckboxInputs
              register={register}
              type="radio"
              name="regionIds"
              data={MASTER_DATA.regions}
            />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <ProfilePositionsInputs
              register={register}
              errors={errors}
              control={control}
              positions={MASTER_DATA.positions}
              experienceLevels={MASTER_DATA.experience_levels}
            />
          </InputWithLabelContainer>
        </section>
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
  );
}
