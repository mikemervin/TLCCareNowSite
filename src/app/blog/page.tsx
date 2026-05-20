import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { images } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const posts = [
  {
    slug: "depression-in-elderly-people",
    title:
      "Depression in Elderly People: Tips for Helping Your Aging Loved One",
    excerpt:
      "Melissa* could tell that her father was suffering. He'd dropped several pounds in the last few months, was reluctant to bathe and kept...",
    author: "Stephanie Stewart",
    date: "Mar 31, 2021",
    readTime: "3 min read",
    image: images.blogPost,
  },
];

export default function BlogPage() {
  return (
    <PageShell>
      <section className="bg-tlc-cream py-14 sm:py-20">
        <div className="tlc-container">
          <h1 className="tlc-heading-green mb-12 text-3xl sm:text-4xl">Blog</h1>
          <ul className="space-y-12">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-8 md:grid-cols-[300px_1fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eee]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="300px"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-normal text-tlc-text group-hover:text-tlc-green sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-tlc-text-muted">{post.excerpt}</p>
                    <p className="mt-3 text-sm text-tlc-text-muted">
                      {post.author} · {post.date} · {post.readTime}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
