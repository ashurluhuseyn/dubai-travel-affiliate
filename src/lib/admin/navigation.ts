export type AdminNavItem = {
  href: string;
  label: string;
  enabled: boolean;
  badge?: string;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

/** Single source of truth for protected admin navigation. */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "main",
    label: "Main",
    items: [{ href: "/admin", label: "Dashboard", enabled: true }],
  },
  {
    id: "content",
    label: "Content",
    items: [
      { href: "/admin/experiences", label: "Experiences", enabled: true },
      { href: "/admin/categories", label: "Categories", enabled: true },
      {
        href: "/admin/media",
        label: "Media",
        enabled: false,
        badge: "Soon",
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [{ href: "/admin/analytics", label: "Analytics", enabled: true }],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        href: "/admin/settings",
        label: "Settings",
        enabled: false,
        badge: "Soon",
      },
    ],
  },
];

export const ADMIN_NAV_ITEMS = ADMIN_NAV_GROUPS.flatMap((group) => group.items);

/** Returns whether a nav item should appear active for the current pathname. */
export function isAdminNavItemActive(pathname: string, href: string): boolean {
  const normalizedPath =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  if (href === "/admin") {
    return normalizedPath === "/admin";
  }

  return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
}

export function formatAdminRole(role: string): string {
  return role.replace(/_/g, " ");
}
