import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  addDaysToDateKey,
  ANALYTICS_TIME_ZONE,
  dateKeyToStartOfDayUtc,
  formatDateKeyInTimeZone,
  getStartOfDayInTimeZone,
  getStartOfNextDayInTimeZone,
  isInstantInRange,
  zonedDateTimeToUtc,
} from "../../src/lib/affiliate-tracking/timezone";

const DUBAI = ANALYTICS_TIME_ZONE;

describe("getStartOfDayInTimeZone", () => {
  it("converts Dubai start-of-day to the matching UTC instant", () => {
    const dubaiMorning = new Date("2026-07-15T02:33:00.000+04:00");
    const start = getStartOfDayInTimeZone(dubaiMorning, DUBAI);

    assert.equal(start.toISOString(), "2026-07-14T20:00:00.000Z");
  });

  it("uses an exclusive next-day boundary for today ranges", () => {
    const dubaiMorning = new Date("2026-07-15T02:33:00.000+04:00");
    const end = getStartOfNextDayInTimeZone(dubaiMorning, DUBAI);

    assert.equal(end.toISOString(), "2026-07-15T20:00:00.000Z");
  });
});

describe("isInstantInRange", () => {
  it("counts clicks near Dubai midnight even when UTC date differs", () => {
    const dubaiNow = new Date("2026-07-15T02:35:00.000+04:00");
    const range = {
      start: getStartOfDayInTimeZone(dubaiNow, DUBAI),
      end: getStartOfNextDayInTimeZone(dubaiNow, DUBAI),
    };

    const clickDuringDubaiToday = new Date("2026-07-14T22:33:00.000Z");
    const clickDuringPreviousDubaiDay = new Date("2026-07-14T19:59:00.000Z");

    assert.equal(formatDateKeyInTimeZone(clickDuringDubaiToday, DUBAI), "2026-07-15");
    assert.equal(formatDateKeyInTimeZone(clickDuringDubaiToday, "UTC"), "2026-07-14");
    assert.equal(isInstantInRange(clickDuringDubaiToday, range), true);
    assert.equal(isInstantInRange(clickDuringPreviousDubaiDay, range), false);
  });
});

describe("addDaysToDateKey", () => {
  it("steps calendar days in Dubai without drifting at UTC boundaries", () => {
    const todayKey = "2026-07-15";
    const sevenDaysStart = addDaysToDateKey(todayKey, -6, DUBAI);

    assert.equal(sevenDaysStart.toISOString(), "2026-07-08T20:00:00.000Z");
    assert.equal(
      formatDateKeyInTimeZone(sevenDaysStart, DUBAI),
      "2026-07-09"
    );
  });
});

describe("dateKeyToStartOfDayUtc", () => {
  it("matches zonedDateTimeToUtc for Dubai midnight", () => {
    const fromKey = dateKeyToStartOfDayUtc("2026-07-15", DUBAI);
    const fromParts = zonedDateTimeToUtc(2026, 7, 15, 0, 0, 0, DUBAI);

    assert.equal(fromKey.toISOString(), fromParts.toISOString());
  });
});
