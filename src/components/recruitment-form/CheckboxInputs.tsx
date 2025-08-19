import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";
import type { UseFormRegister } from "react-hook-form";
import BadgeCheckBox from "@/components/BadgeCheckbox";

interface CheckboxInputsProps {
  data: {
    id: string;
    name: string;
  }[];
  register: UseFormRegister<TRecruitmentPostSchema>;
  name: keyof TRecruitmentPostSchema;
  type?: "checkbox" | "radio";
  defaultValues?: {
    id: string;
    name: string;
  }[];
}

export default function CheckboxInputs({
  data,
  register,
  name,
  type = "checkbox",
  defaultValues,
}: CheckboxInputsProps) {
  return (
    <div className="flex justify-start items-center flex-wrap gap-0.5">
      {data.map(({ name: label, id }) => {
        const isDefaultChecked = defaultValues
          ? defaultValues.some(({ id: defaultId }) => id === defaultId)
          : false;

        return (
          <BadgeCheckBox
            key={id}
            label={label}
            value={id}
            type={type}
            {...register(name)}
            className="text-text-on-dark"
            defaultChecked={isDefaultChecked}
          />
        );
      })}
    </div>
  );
}
