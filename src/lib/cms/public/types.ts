/** Published category exposed to public routes (CMS or static-derived). */
export type PublicCategory = {
  slug: string;
  label: string;
  description: string | null;
  iconKey: string | null;
  sortOrder: number;
};
