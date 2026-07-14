/** Analytics and admin reporting use Dubai local calendar days. */
export const ANALYTICS_TIME_ZONE = "Asia/Dubai";

const DATE_KEY_FORMATTER_CACHE = new Map<string, Intl.DateTimeFormat>();
const DATE_TIME_PARTS_CACHE = new Map<string, Intl.DateTimeFormat>();

function getDateKeyFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = DATE_KEY_FORMATTER_CACHE.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    DATE_KEY_FORMATTER_CACHE.set(timeZone, formatter);
  }

  return formatter;
}

function getDateTimePartsFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = DATE_TIME_PARTS_CACHE.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    DATE_TIME_PARTS_CACHE.set(timeZone, formatter);
  }

  return formatter;
}

function readNumericPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
): number {
  return Number(parts.find((part) => part.type === type)?.value);
}

/** Returns YYYY-MM-DD for the instant in the given IANA timezone. */
export function formatDateKeyInTimeZone(date: Date, timeZone: string): string {
  return getDateKeyFormatter(timeZone).format(date);
}

/** Offset between UTC epoch ms and wall-clock parts interpreted as UTC. */
function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = getDateTimePartsFormatter(timeZone).formatToParts(date);
  const asUtc = Date.UTC(
    readNumericPart(parts, "year"),
    readNumericPart(parts, "month") - 1,
    readNumericPart(parts, "day"),
    readNumericPart(parts, "hour"),
    readNumericPart(parts, "minute"),
    readNumericPart(parts, "second")
  );

  return asUtc - date.getTime();
}

/** Converts a wall-clock datetime in `timeZone` to the matching UTC instant. */
export function zonedDateTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
  timeZone: string
): Date {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const firstOffset = getTimeZoneOffsetMs(new Date(utcGuess), timeZone);
  let resultMs = utcGuess - firstOffset;

  const secondOffset = getTimeZoneOffsetMs(new Date(resultMs), timeZone);
  if (secondOffset !== firstOffset) {
    resultMs = utcGuess - secondOffset;
  }

  return new Date(resultMs);
}

/** UTC instant for start of the calendar day containing `date` in `timeZone`. */
export function getStartOfDayInTimeZone(
  date: Date,
  timeZone: string
): Date {
  const dateKey = formatDateKeyInTimeZone(date, timeZone);
  return dateKeyToStartOfDayUtc(dateKey, timeZone);
}

/** UTC instant for start of the next calendar day — use as an exclusive range end. */
export function getStartOfNextDayInTimeZone(
  date: Date,
  timeZone: string
): Date {
  const dateKey = formatDateKeyInTimeZone(date, timeZone);
  return addDaysToDateKey(dateKey, 1, timeZone);
}

export function dateKeyToStartOfDayUtc(
  dateKey: string,
  timeZone: string
): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return zonedDateTimeToUtc(year, month, day, 0, 0, 0, timeZone);
}

/** Moves a YYYY-MM-DD calendar key by `days` and returns that day's start in UTC. */
export function addDaysToDateKey(
  dateKey: string,
  days: number,
  timeZone: string
): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return zonedDateTimeToUtc(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth() + 1,
    shifted.getUTCDate(),
    0,
    0,
    0,
    timeZone
  );
}

/** A stable midday instant for formatting a stored Dubai date key in the UI. */
export function dateKeyToRepresentativeInstant(
  dateKey: string,
  timeZone: string
): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return zonedDateTimeToUtc(year, month, day, 12, 0, 0, timeZone);
}

export type TimeRange = {
  start: Date;
  end: Date;
};

/** Inclusive start, exclusive end — `[start, end)`. */
export function isInstantInRange(
  instant: Date,
  range: TimeRange
): boolean {
  const ms = instant.getTime();
  return ms >= range.start.getTime() && ms < range.end.getTime();
}

export function countInstantsInRange(
  instants: Date[],
  range: TimeRange
): number {
  const startMs = range.start.getTime();
  const endMs = range.end.getTime();
  return instants.filter((instant) => {
    const ms = instant.getTime();
    return ms >= startMs && ms < endMs;
  }).length;
}
