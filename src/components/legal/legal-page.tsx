import Link from "next/link";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  introduction: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  introduction,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <main className="pt-28 pb-section lg:pt-32">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />

        <article className="mx-auto mt-10 max-w-3xl">
          <header className="border-b border-border/60 pb-8">
            <p className="label-luxury">Legal</p>
            <h1 className="mt-3 font-heading text-4xl text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {introduction}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: <time dateTime={updatedAt}>{updatedAt}</time>
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-2xl text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs && (
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground md:text-base">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
            Questions about this page can be sent to{" "}
            <Link
              href="mailto:hello@caspaya.com"
              className="text-luxury-gold-soft hover:text-luxury-gold"
            >
              hello@caspaya.com
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
