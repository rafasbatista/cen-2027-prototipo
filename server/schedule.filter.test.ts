import { describe, expect, it } from "vitest";
import { filterScheduleEvents, matchesTime, schedule } from "../client/src/components/ScheduleSection";

describe("schedule filters", () => {
  it("keeps morning events in the morning filter", () => {
    expect(schedule.every((event) => matchesTime(event, "all"))).toBe(true);
    expect(filterScheduleEvents("04", "morning").map((event) => event.id)).toEqual(["congresso-principal", "simposio-04"]);
  });

  it("filters events by selected day", () => {
    expect(filterScheduleEvents("05", "all").map((event) => event.id)).toEqual(["congresso-principal", "simposio-05"]);
    expect(filterScheduleEvents("07", "morning").map((event) => event.id)).toEqual(["congresso-principal"]);
  });

  it("returns no events for an evening filter until official evening events are published", () => {
    expect(filterScheduleEvents("all", "evening")).toHaveLength(0);
  });
});
