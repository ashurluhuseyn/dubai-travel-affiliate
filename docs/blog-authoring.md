# Manual blog publishing

Caspaya blog posts are intentionally stored as typed TypeScript objects. A
post is never added to the sitemap unless it is marked as published and passes
the minimum editorial checks in `isBlogPostIndexable`.

## Workflow

1. Add the article to `researchedBlogDetails` in
   `src/data/blog-detail.ts` with `status: "draft"` and `noindex: true`.
2. Write the full article using H2 `sections` and optional H3 `subsections`.
3. Add current authoritative sources and the date each source was accessed.
4. Add FAQs, internal links, a verified author, cover-image alt text, and real
   ISO publication/update dates.
5. Run lint, tests, and the production build.
6. Only after editorial review, change the record to `status: "published"`
   and `noindex: false`.

The article will then appear on `/blog`, receive Article and Breadcrumb
structured data, and enter the sitemap automatically.

## Article template

```ts
"article-slug": {
  id: "article-slug",
  slug: "article-slug",
  title: "Reader-facing article title",
  seoTitle: "Search-focused title",
  metaDescription: "A specific description of the article's value.",
  excerpt: "A concise summary for article cards.",
  image: "https://...",
  imageAlt: "A precise description of the cover image",
  category: "Guides",
  readTime: "10 min read",
  date: "August 24, 2026",
  publishedAt: "2026-08-24T00:00:00.000Z",
  updatedAt: "2026-08-24T00:00:00.000Z",
  href: "/blog/article-slug",
  status: "draft",
  noindex: true,
  author: {
    name: "Verified author name",
    initials: "VA",
    bio: "Short factual author description",
  },
  sections: [
    {
      id: "planning-section",
      heading: "H2 section heading",
      paragraphs: ["Paragraph one.", "Paragraph two."],
      bullets: ["Optional practical point"],
      subsections: [
        {
          id: "specific-detail",
          heading: "H3 subsection heading",
          paragraphs: ["Detailed subsection paragraph."],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "A real reader question?",
      answer: "A concise, sourced answer.",
    },
  ],
  sources: [
    {
      title: "Source page title",
      publisher: "Official publisher",
      url: "https://...",
      accessedAt: "2026-08-24",
    },
  ],
  internalLinks: [
    { label: "Relevant Caspaya guide", href: "/blog/related-guide" },
  ],
  relatedArticleSlugs: [],
},
```
