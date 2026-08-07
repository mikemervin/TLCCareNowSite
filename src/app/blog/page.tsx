import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getBlogPostsForIndex, type BlogPost } from "@/lib/blog/posts";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Blog — Independent Living & Senior Care",
  description:
    "Articles for independent living communities, senior living operators, and families on scheduling care, on-demand visits, and using TLC CareNow.",
  path: "/blog",
});

function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article
      className={`blog-index-card${featured ? " blog-index-card--featured" : ""}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`blog-index-card-link group${featured ? " blog-index-card-link--featured" : ""}`}
      >
        <div
          className={`blog-index-card-media${featured ? " blog-index-card-media--featured" : ""}`}
        >
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority={featured}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 900px"
                : "(max-width: 768px) 100vw, 420px"
            }
          />
          <span className="blog-index-card-media-shade" aria-hidden />
        </div>
        <div className="blog-index-card-body">
          <div className="blog-index-card-tags">
            {featured ? (
              <span className="blog-index-featured-label">Latest</span>
            ) : null}
            <span className="blog-index-card-category">{post.category}</span>
          </div>
          <h2 className="blog-index-card-title">{post.title}</h2>
          <p className="blog-index-card-excerpt">{post.excerpt}</p>
          <div className="blog-index-card-footer">
            <p className="blog-index-card-meta">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </p>
            <span className="blog-index-card-read">
              Read article
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogPage() {
  const posts = getBlogPostsForIndex();
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <section className="blog-index">
        <div className="tlc-container blog-index-inner">
          <header className="blog-index-header">
            <div className="blog-index-header-panel">
              <p className="blog-index-eyebrow">TLC CareNow</p>
              <h1 className="blog-index-title">Blog</h1>
              <p className="blog-index-subtitle">
                For communities &amp; families
              </p>
              <span className="tlc-accent-line blog-index-accent" aria-hidden />
              <p className="blog-index-lead">
                Practical articles on independent living, senior living
                operations, and booking care—written for operators and families
                who use TLC CareNow.
              </p>
            </div>
          </header>

          {featured ? (
            <div className="blog-index-featured">
              <PostCard post={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="blog-index-more">
              <div className="blog-index-more-heading">
                <h2 className="blog-index-more-title">More articles</h2>
                <span className="blog-index-more-rule" aria-hidden />
              </div>
              <ul className="blog-index-grid">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
