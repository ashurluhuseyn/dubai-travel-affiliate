/** Cards per page when the grid shows 1–2 columns (below xl). */
export const DESTINATION_PAGE_SIZE_COMPACT = 6;

/** Cards per page when the grid shows 3 columns (xl and up). */
export const DESTINATION_PAGE_SIZE_WIDE = 9;

/** Tailwind `xl` breakpoint — matches destination grid `xl:grid-cols-3`. */
export const DESTINATION_GRID_XL_MEDIA = "(min-width: 1280px)";

export function destinationPageSize(matchesWideGrid: boolean): number {
  return matchesWideGrid
    ? DESTINATION_PAGE_SIZE_WIDE
    : DESTINATION_PAGE_SIZE_COMPACT;
}

export function destinationTotalPages(
  resultCount: number,
  pageSize: number
): number {
  if (resultCount <= 0) return 0;
  return Math.ceil(resultCount / pageSize);
}

export function clampPage(page: number, totalPages: number): number {
  if (totalPages <= 0) return 1;
  return Math.min(Math.max(page, 1), totalPages);
}

export function paginateResults<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
