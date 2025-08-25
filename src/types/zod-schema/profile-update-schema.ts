import z from "zod";

export const positionItemSchema = z.object({
  position: z.object({
    id: z.string(),
    name: z.string().optional(),
  }),
  experience_level: z.object({
    id: z.string(),
    name: z.string().optional(),
  }),
});

export const profileUpdateSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1),
  image: z.file().optional(),
  is_public: z.boolean().default(true),
  regions: z.array(z.object({ id: z.string(), name: z.string().optional() })).default([]),
  positions: z.array(positionItemSchema).default([]),
  genres: z.array(z.object({ id: z.string(), name: z.string().optional() })).default([]),
});

export type TProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;
