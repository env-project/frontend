import type { TProfileUpdateSchema } from "@/types/zod-schema/profile-update-schema";
import type { UseFormRegister } from "react-hook-form";
import BadgeCheckBox from "@/components/BadgeCheckbox";

interface ProfileCheckboxInputsProps {
  data: {
    id: string;
    name: string;
  }[];
  register: UseFormRegister<TProfileUpdateSchema>;
  name: keyof TProfileUpdateSchema;
  type?: "checkbox" | "radio";
}

export default function ProfileCheckboxInputs({
  data,
  register,
  name,
  type = "checkbox",
}: ProfileCheckboxInputsProps) {
  return (
    <div className="flex justify-start items-center flex-wrap gap-0.5">
      {data.map(({ name: label, id }) => (
        <BadgeCheckBox
          key={id}
          label={label}
          value={id}
          type={type}
          {...register(name)}
          className="text-text-on-dark"
        />
      ))}
    </div>
  );
}
