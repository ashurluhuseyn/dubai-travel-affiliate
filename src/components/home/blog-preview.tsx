import { Container } from "@/components/shared/container";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeader } from "@/components/shared/section-header";
import { blogPosts } from "@/lib/data/home";

export function BlogPreview() {
  return (
    <section id="journal" className="py-section scroll-mt-24">
      <Container>
        <SectionHeader
          label="Journal"
          title="Stories from the Emirates"
          description="Insider guides, hotel reviews, and itineraries from our editorial team."
          href="#"
          linkLabel="Read the journal"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
