import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

type PageLayoutProps = {
  children: React.ReactNode;
  /** Extra classes on `<main>` (e.g. top padding for detail pages). */
  mainClassName?: string;
};

/** Standard site chrome: header, main landmark, footer. */
export function PageLayout({ children, mainClassName }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </>
  );
}
