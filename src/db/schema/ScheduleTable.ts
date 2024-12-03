import ScheduleAvailabilityTable from "@/db/schema/ScheduleAvailabilityTable";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  timezone: text("timezone").notNull(),
  clerkUserId: text("clerkUserId").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable),
}));

export default ScheduleTable;
