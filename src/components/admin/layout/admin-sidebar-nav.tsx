"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FolderOpen,
  Images,
  LayoutDashboard,
  Map,
  Settings,
} from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import {
  ADMIN_NAV_GROUPS,
  formatAdminRole,
  isAdminNavItemActive,
  type AdminNavItem,
} from "@/lib/admin/navigation";
import { cn } from "@/lib/utils";

export type AdminShellUser = {
  name: string;
  email: string;
  role: string;
};

type AdminSidebarNavProps = {
  user: AdminShellUser;
  onNavigate?: () => void;
  className?: string;
};

const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "/admin": LayoutDashboard,
  "/admin/experiences": Map,
  "/admin/categories": FolderOpen,
  "/admin/media": Images,
  "/admin/analytics": BarChart3,
  "/admin/settings": Settings,
};

function NavIcon({ href }: { href: string }) {
  const Icon = NAV_ICONS[href] ?? LayoutDashboard;
  return <Icon className="size-4 shrink-0" aria-hidden />;
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = item.enabled && isAdminNavItemActive(pathname, item.href);

  if (!item.enabled) {
    return (
      <span
        className="flex min-h-10 cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/50"
        title="Coming in a future phase"
      >
        <NavIcon href={item.href} />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-wide">
            {item.badge}
          </span>
        )}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-luxury-gold/10 text-luxury-gold-soft ring-1 ring-luxury-gold-muted/30"
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      )}
    >
      <NavIcon href={item.href} />
      <span className="flex-1">{item.label}</span>
    </Link>
  );
}

export function AdminSidebarNav({
  user,
  onNavigate,
  className,
}: AdminSidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="border-b border-border/40 px-5 py-5">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="block font-heading text-lg text-foreground transition-colors hover:text-luxury-gold-soft"
        >
          Dubai Moments Admin
        </Link>
        <p className="mt-2 text-sm text-foreground">{user.name}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {formatAdminRole(user.role)}
        </p>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {ADMIN_NAV_GROUPS.map((group) => (
            <section key={group.id}>
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-luxury-gold-muted">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} pathname={pathname} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-border/40 px-4 py-4">
        <div className="mb-3 min-w-0">
          <p className="truncate text-sm text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="min-h-10 w-full rounded-lg border border-border/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-luxury-gold-muted/50 hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
