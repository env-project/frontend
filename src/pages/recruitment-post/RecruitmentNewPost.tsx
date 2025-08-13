import z from "zod";

export const positionItemSchema = z.object({
  position_id: z.string(),
  experienced_level_id: z.string(),
});

const recruitmentPostSchema = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(1),

  imageUrl: z.string().optional(),
  bandName: z.string().optional(),
  bandComposition: z.string().optional(),
  activityTime: z.string().optional(),
  applicationMethod: z.string().optional(),
  practiceFrequencyTime: z.string().optional(),
  otherConditions: z.string().optional(),

  orientationId: z.string().optional(),
  recruitmentTypeId: z.string().optional(),

  regionIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema).optional(),
});

export default function RecruitmentNewPost() {
  return <div>RecruitmentNewPost</div>;
}
