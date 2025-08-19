import z from "zod";

const positionItemSchema = z.object({
  position_id: z.string(),
  experienced_level_id: z.string(),
});

export const recruitmentPostSchema = z.object({
  title: z.string().min(1, "1글자 이상으로 작성해주세요").max(40, "40글자 이하로 작성해주세요"),
  content: z.string().min(1, "1글자 이상으로 작성해주세요").max(500, "500글자 이하로 작성해주세요"),

  image: z.file().optional(),
  bandName: z.string().optional(),
  bandComposition: z.string().optional(),
  activityTime: z.string().optional(),
  contactInfo: z.string().optional(),
  applicationMethod: z.string().optional(),
  practiceFrequencyTime: z.string().optional(),
  otherConditions: z.string().optional(),

  orientationId: z.string().optional(),
  recruitmentTypeId: z.string().optional(),

  regionIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema).optional(),
});

export type TRecruitmentPostSchema = z.infer<typeof recruitmentPostSchema>;
