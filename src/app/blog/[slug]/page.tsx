import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

const posts: Record<
  string,
  { title: string; author: string; date: string; body: string[] }
> = {
  "depression-in-elderly-people": {
    title:
      "Depression in Elderly People: Tips for Helping Your Aging Loved One",
    author: "Stephanie Stewart",
    date: "Mar 31, 2021",
    body: [
      "Melissa* could tell that her father was suffering. He'd dropped several pounds in the last few months, was reluctant to bathe and kept to himself more than usual.",
      "Depression in older adults is common and often overlooked. Changes in health, mobility, or social connection can contribute to feelings of sadness or withdrawal.",
      "If you notice persistent changes in mood, appetite, sleep, or interest in activities, talk with their physician. Professional support, social engagement, and compassionate daily care can make a meaningful difference.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return pageMetadata({ title: "Blog", path: "/blog" });
  return pageMetadata({
    title: post.title,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <PageShell>
      <article className="bg-tlc-cream py-14 sm:py-20">
        <div className="tlc-container max-w-2xl">
          <Link
            href="/blog"
            className="text-sm text-tlc-text-muted underline-offset-2 hover:underline"
          >
            ← Back to Blog
          </Link>
          <h1 className="mt-6 text-2xl font-normal leading-snug text-tlc-text sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-tlc-text-muted">
            {post.author} · {post.date}
          </p>
          <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-tlc-text-muted">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
