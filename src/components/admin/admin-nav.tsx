import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", enabled: true },
  { href: "/admin/experiences", label: "Experiences", enabled: true },
  { href: "/admin/categories", label: "Categories", enabled: false },
  { href: "/admin/media", label: "Media", enabled: false },
  { href: "/admin/settings", label: "Settings", enabled: false },
] as const;

export function AdminNav() {
  return (
    <nav
      aria-label="Admin"
      className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6"
    >
      {NAV_ITEMS.map((item) =>
        item.enabled ? (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            {item.label}
          </Link>
        ) : (
          <span
            key={item.href}
            className="shrink-0 cursor-not-allowed rounded-md px-3 py-1.5 text-sm text-muted-foreground/50"
            title="Coming in a future phase"
          >
            {item.label}
          </span>
        )
      )}
    </nav>
  );
}
