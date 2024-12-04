import { startOfDay } from "date-fns";
import { z } from "zod";

const meetingSchemaBase = z.object({
  startTime: z.date().min(new Date()),
  guestEmail: z.string().email().min(1, { message: "Email is required" }),
  guestName: z.string().min(1, { message: "Name is required" }),
  guestNotes: z.string().optional(),
  timezone: z.string().min(1, { message: "Timezone is required" }),
});

export const meetingFormSchema = z
  .object({
    date: z.date().min(startOfDay(new Date()), {
      message: "Date must be in the future",
    }),
  })
  .merge(meetingSchemaBase);

export const meetingActionSchema = z
  .object({
    eventId: z.string().min(1, { message: "Event is required" }),
    clerkUserId: z.string().min(1, { message: "User is required" }),
  })
  .merge(meetingSchemaBase);
