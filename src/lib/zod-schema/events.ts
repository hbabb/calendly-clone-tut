import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive({ message: "Duration must be a positive number" })
    .max(60 * 12, `Duration must be less than 12 hours (${60 * 12} minutes)`),
});
