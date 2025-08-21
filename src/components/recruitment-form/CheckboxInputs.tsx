import BadgeCheckBox from "@/components/BadgeCheckbox";

interface CheckboxInputsProps {
  data: {
    id: string;
    name: string;
  }[];

  value: string[];
  onChange: (value: string[]) => void;
  name: string;
  type?: "checkbox" | "radio";
}

export default function CheckboxInputs({
  data,
  value,
  onChange,
  name,
  type = "checkbox",
}: CheckboxInputsProps) {
  const handleChange = (id: string, isChecked: boolean) => {
    //checkbox일때
    if (type === "checkbox") {
      const newValues = isChecked ? [...value, id] : value.filter((item) => item !== id);
      onChange(newValues);
      //radio일때
    } else if (type === "radio") {
      onChange([id]);
    }
  };
  return (
    <div className="flex justify-start items-center flex-wrap gap-0.5">
      {data.map(({ name: label, id }) => (
        <BadgeCheckBox
          key={id}
          label={label}
          value={id}
          type={type}
          checked={value.includes(id)}
          onChange={(e) => handleChange(id, e.target.checked)}
          className="text-text-on-dark"
        />
      ))}
    </div>
  );
}
