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
  image: z.file().optional(),
  is_public: z.boolean(),
  regions: z.array(z.string()).optional(),
  positions: z.array(positionItemSchema),
  genres: z.array(z.string()).optional(),
});

export type TProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;
