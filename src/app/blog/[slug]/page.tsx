import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/BlogPostBody";
import { PageShell } from "@/components/PageShell";
import {
  getBlogArticleCtaLead,
  getBlogArticleCtas,
} from "@/lib/blog/ctas";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog/posts";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return pageMetadata({ title: "Blog", path: "/blog" });
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    openGraphType: "article",
    publishedTime: post.publishedAt,
    image: post.image,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const ctas = getBlogArticleCtas(post);

  return (
    <PageShell>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          publishedAt: post.publishedAt,
          slug: post.slug,
          image: post.image,
          author: post.author,
        })}
      />
      <article className="blog-article">
        <div className="tlc-container blog-article-layout">
          <Link href="/blog" className="blog-article-back">
            <span className="blog-article-back-icon" aria-hidden>
              ←
            </span>
            All posts
          </Link>

          <div className="blog-article-sheet">
            <header className="blog-article-hero">
              <div className="blog-article-hero-media">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
                <div className="blog-article-hero-scrim" aria-hidden />
              </div>
              <div className="blog-article-hero-copy">
                <span className="blog-article-category">{post.category}</span>
                <h1 className="blog-article-title">{post.title}</h1>
                <span className="tlc-accent-line blog-article-accent" aria-hidden />
                <p className="blog-article-meta">
                  <span>{post.author}</span>
                  <span className="blog-article-meta-sep" aria-hidden>
                    ·
                  </span>
                  <time dateTime={post.publishedAt}>{post.date}</time>
                  <span className="blog-article-meta-sep" aria-hidden>
                    ·
                  </span>
                  <span>{post.readTime}</span>
                </p>
              </div>
            </header>

            <div className="blog-article-content">
              <BlogPostBody blocks={post.body} />
            </div>

            <footer className="blog-article-footer">
              <p className="blog-article-footer-title">Explore {site.name}</p>
              <p className="blog-article-footer-lead">
                {getBlogArticleCtaLead(post)}
              </p>
              <div className="blog-article-cta-grid">
                {ctas.map((cta) => (
                  <Link
                    key={`${cta.href}-${cta.label}`}
                    href={cta.href}
                    className={
                      cta.primary
                        ? "blog-article-cta blog-article-cta--primary"
                        : "blog-article-cta"
                    }
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
