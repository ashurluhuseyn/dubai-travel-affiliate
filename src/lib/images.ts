/**
 * Verified Unsplash photo IDs used across mock data.
 * Centralized to keep image URLs stable and easy to audit.
 */
export const unsplash = {
  skyline:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  desert:
    "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
  yacht:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
  coast:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  dining:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  heritage:
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
  travel:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  lounge:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  hotel:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  marina:
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
  burjAlArab:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  nature:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
  rooftop:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
} as const;

/** Appends Unsplash transform params for Next/Image. */
export function unsplashUrl(
  id: keyof typeof unsplash,
  width: number,
  quality = 80
): string {
  return `${unsplash[id]}?w=${width}&q=${quality}`;
}
