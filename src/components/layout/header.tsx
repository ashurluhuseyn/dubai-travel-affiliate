"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getNavLinks } from "@/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navLinks = getNavLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <Container
        className={cn(
          "flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-luxury sm:px-6",
          scrolled
            ? "border border-border/70 bg-luxury-black/70 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <Logo />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-luxury hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full transition-luxury sm:inline-flex"
          >
            <Link href="#planner">
              <Sparkles className="size-4" />
              Plan with AI
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/70 bg-luxury-charcoal/50 backdrop-blur-sm lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-border bg-luxury-charcoal sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav
                className="mt-8 flex flex-col gap-4 px-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading text-2xl text-foreground transition-luxury hover:text-luxury-gold"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 w-full rounded-full">
                  <Link href="#planner" onClick={() => setOpen(false)}>
                    <Sparkles className="size-4" />
                    Plan with AI
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
