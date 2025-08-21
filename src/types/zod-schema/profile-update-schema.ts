import z from "zod";

export const positionItemSchema = z.object({
  position_id: z.string(),
  experienced_level_id: z.string(),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "1글자 이상으로 작성해주세요"),
  content: z.string().min(1, "1글자 이상으로 작성해주세요").max(30, "30글자 이하로 작성해주세요"),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }),
  ProfessionalExperience: z.string().min(1, "1글자 이상으로 작성해주세요"),
  image: z.file().optional(),
  regionIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema).optional(),
});

export type TProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;
