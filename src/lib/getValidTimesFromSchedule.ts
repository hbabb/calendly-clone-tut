import type { DayOfWeek } from "@/constants/DayOfWeek";
import { db } from "@/db/index";
import type { ScheduleAvailabilityTable } from "@/db/schema";
import { getCalendarEventTimes } from "@/lib/server/googleCalendar";
import {
  addMinutes,
  areIntervalsOverlapping,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  isWithinInterval,
  setHours,
  setMinutes,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";

function getAvailabilities(
  groupedAvailabilities: Partial<
    Record<(typeof DayOfWeek)[number], (typeof ScheduleAvailabilityTable.$inferSelect)[]>
  >,
  date: Date,
  timezone: string,
) {
  let availabilities: (typeof ScheduleAvailabilityTable.$inferSelect)[] | undefined;

  if (isMonday(date)) {
    availabilities = groupedAvailabilities.Monday;
  }
  if (isTuesday(date)) {
    availabilities = groupedAvailabilities.Tuesday;
  }
  if (isWednesday(date)) {
    availabilities = groupedAvailabilities.Wednesday;
  }
  if (isThursday(date)) {
    availabilities = groupedAvailabilities.Thursday;
  }
  if (isFriday(date)) {
    availabilities = groupedAvailabilities.Friday;
  }
  if (isSaturday(date)) {
    availabilities = groupedAvailabilities.Saturday;
  }
  if (isSunday(date)) {
    availabilities = groupedAvailabilities.Sunday;
  }

  if (availabilities == null) return [];

  return availabilities.map(({ startTime, endTime }) => {
    const start = fromZonedTime(
      setMinutes(
        setHours(date, Number.parseInt(startTime.split(":")[0])),
        Number.parseInt(startTime.split(":")[1]),
      ),
      timezone,
    );

    const end = fromZonedTime(
      setMinutes(
        setHours(date, Number.parseInt(endTime.split(":")[0])),
        Number.parseInt(endTime.split(":")[1]),
      ),
      timezone,
    );

    return { start, end };
  });
}

export async function getValidTimesFromSchedule(
  timesInOrder: Date[],
  event: { clerkUserId: string; durationInMinutes: number },
) {
  const start = timesInOrder[0];
  const end = timesInOrder.at(-1);

  if (start == null || end == null) return [];

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId: userIdCol }, { eq }) => eq(userIdCol, event.clerkUserId),
    with: { availabilities: true },
  });

  if (schedule == null) return [];

  const groupedAvailabilities = Object.groupBy(schedule.availabilities, (a) => a.dayOfWeek);

  const eventTimes = await getCalendarEventTimes(event.clerkUserId, {
    start,
    end,
  });

  return timesInOrder.filter((intervalDate) => {
    const availabilities = getAvailabilities(
      groupedAvailabilities,
      intervalDate,
      schedule.timezone,
    );
    const eventInterval = {
      start: intervalDate,
      end: addMinutes(intervalDate, event.durationInMinutes),
    };

    return (
      eventTimes.every((eventTime) => {
        return !areIntervalsOverlapping(eventTime, eventInterval);
      }) &&
      availabilities.some((availability) => {
        return (
          isWithinInterval(eventInterval.start, availability) &&
          isWithinInterval(eventInterval.end, availability)
        );
      })
    );
  });
}
