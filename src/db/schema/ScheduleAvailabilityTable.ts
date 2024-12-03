import { DayOfWeek } from "@/constants/DayOfWeek";
import { index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import ScheduleTable from "./ScheduleTable";

export const scheduleDayOfWeekEnum = pgEnum("day", DayOfWeek);

const ScheduleAvailabilityTable = pgTable(
  "schedule_availability",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId")
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
  },
  (table) => [index("scheduleIdIndex").on(table.scheduleId)],
);

export const ScheduleAvailabilityRelations = relations(ScheduleAvailabilityTable, ({ one }) => ({
  schedule: one(ScheduleTable, {
    fields: [ScheduleAvailabilityTable.scheduleId],
    references: [ScheduleTable.id],
  }),
}));

export default ScheduleAvailabilityTable;
