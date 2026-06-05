/** Case-insensitive match against a list of searchable strings. */
export function matchesSearchQuery(
  query: string,
  fields: string[]
): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  const haystack = fields.join(" ").toLowerCase();
  return haystack.includes(normalized);
}
