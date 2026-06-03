import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getBlogPostsForIndex } from "@/lib/blog/posts";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Guides — Independent Living & Senior Care",
  description:
    "Articles for independent living communities, senior living operators, and families on scheduling care, on-demand visits, and using TLC CareNow.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPostsForIndex();

  return (
    <PageShell>
      <section className="blog-index">
        <div className="tlc-container blog-index-inner">
          <header className="blog-index-header">
            <p className="blog-index-eyebrow">Resources</p>
            <h1 className="blog-index-title">Guides for communities &amp; families</h1>
            <span className="tlc-accent-line blog-index-accent" aria-hidden />
            <p className="blog-index-lead">
              Practical articles on independent living, senior living operations,
              and booking care—written for operators and families who use TLC
              CareNow.
            </p>
          </header>

          <ul className="blog-index-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="blog-index-card">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-index-card-link group"
                  >
                    <div className="blog-index-card-media">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                    </div>
                    <div className="blog-index-card-body">
                      <span className="blog-index-card-category">
                        {post.category}
                      </span>
                      <h2 className="blog-index-card-title">{post.title}</h2>
                      <p className="blog-index-card-excerpt">{post.excerpt}</p>
                      <p className="blog-index-card-meta">
                        {post.author} · {post.date} · {post.readTime}
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
