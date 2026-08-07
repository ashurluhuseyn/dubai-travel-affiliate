"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { formatAdminRole } from "@/lib/admin/navigation";
import { siteConfig } from "@/lib/site";

import {
  AdminSidebarNav,
  type AdminShellUser,
} from "./admin-sidebar-nav";

type AdminMobileNavProps = {
  user: AdminShellUser;
};

function AdminMobileNav({ user }: AdminMobileNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Open admin navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" aria-hidden />
        </button>
        <div className="min-w-0">
          <p className="truncate font-heading text-base text-foreground">
            {siteConfig.name} Admin
          </p>
          <p className="truncate text-xs capitalize text-muted-foreground">
            {formatAdminRole(user.role)}
          </p>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[min(100vw-2rem,280px)] border-border/60 bg-card p-0"
          showCloseButton
        >
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <AdminSidebarNav
            user={user}
            onNavigate={() => setMobileOpen(false)}
            className="h-full"
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

type AdminShellProps = {
  user: AdminShellUser;
  children: React.ReactNode;
};

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-[260px] shrink-0 border-r border-border/60 bg-card/30 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <AdminSidebarNav user={user} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav key={pathname} user={user} />

        <main className="mx-auto w-full max-w-[90rem] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
