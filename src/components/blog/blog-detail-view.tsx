import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogDetail } from "@/data";

type BlogDetailViewProps = {
  article: BlogDetail;
};

export function BlogDetailView({ article }: BlogDetailViewProps) {
  const reviewedDate = article.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(article.updatedAt))
    : null;

  return (
    <article>
      <div className="relative aspect-[21/9] min-h-[16rem] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20" />
      </div>

      <Container className="py-section">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2 text-muted-foreground hover:text-luxury-gold"
        >
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="max-w-3xl">
          <Badge
            variant="outline"
            className="border-luxury-gold-muted/30 text-luxury-gold-soft"
          >
            {article.category}
          </Badge>
          <h1 className="mt-4 font-heading text-3xl leading-tight text-foreground text-balance md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {article.author && (
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-flex size-8 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-xs font-medium text-luxury-gold-soft"
                  aria-hidden
                >
                  {article.author.initials}
                </span>
                <span className="text-foreground">{article.author.name}</span>
              </span>
            )}
            <time dateTime={article.publishedAt}>{article.date}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {article.readTime}
            </span>
            {reviewedDate && <span>Last reviewed {reviewedDate}</span>}
          </div>

          {article.author?.bio && (
            <p className="mt-5 max-w-2xl border-l-2 border-luxury-gold-muted/50 pl-4 text-sm leading-relaxed text-muted-foreground">
              {article.author.bio}
            </p>
          )}
        </header>

        {article.sections.length > 0 ? (
          <div className="prose-luxury mt-10 max-w-3xl space-y-10 text-base leading-relaxed text-luxury-white-muted">
            {article.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="font-heading text-2xl text-foreground md:text-3xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="overflow-x-auto rounded-xl border border-border/60">
                      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                        {section.table.caption && (
                          <caption className="border-b border-border/60 bg-card px-4 py-3 text-left text-xs leading-relaxed text-muted-foreground">
                            {section.table.caption}
                          </caption>
                        )}
                        <thead className="bg-card">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="border-b border-border/60 px-4 py-3 font-medium text-foreground"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")} className="border-b border-border/40 last:border-0">
                              {row.map((cell, index) => (
                                index === 0 ? (
                                  <th
                                    key={`${index}-${cell}`}
                                    scope="row"
                                    className="px-4 py-3 align-top font-medium text-foreground"
                                  >
                                    {cell}
                                  </th>
                                ) : (
                                  <td
                                    key={`${index}-${cell}`}
                                    className="px-4 py-3 align-top text-luxury-white-muted"
                                  >
                                    {cell}
                                  </td>
                                )
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {section.subsections?.map((subsection) => (
                    <section key={subsection.id} aria-labelledby={subsection.id}>
                      <h3
                        id={subsection.id}
                        className="font-heading text-xl text-foreground"
                      >
                        {subsection.heading}
                      </h3>
                      <div className="mt-3 space-y-4">
                        {subsection.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                        ))}
                        {subsection.bullets && (
                          <ul className="list-disc space-y-2 pl-5">
                            {subsection.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="prose-luxury mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-luxury-white-muted">
            {(article.content ?? []).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        )}

        {article.faqs.length > 0 && (
          <section className="mt-14 max-w-3xl" aria-labelledby="article-faqs">
            <h2 id="article-faqs" className="font-heading text-2xl text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 space-y-5">
              {article.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-heading text-lg text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {article.sources.length > 0 && (
          <section className="mt-14 max-w-3xl" aria-labelledby="article-sources">
            <h2 id="article-sources" className="font-heading text-2xl text-foreground">
              Sources
            </h2>
            <ul className="mt-5 space-y-3">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
                  >
                    <ExternalLink className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>{source.publisher}: {source.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {article.internalLinks.length > 0 && (
          <nav className="mt-14 max-w-3xl" aria-labelledby="continue-planning">
            <h2 id="continue-planning" className="font-heading text-2xl text-foreground">
              Continue planning
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {article.internalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl border border-border/60 bg-card p-4 text-sm text-luxury-gold-soft transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </article>
  );
}
