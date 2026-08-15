import type { MetadataRoute } from "next";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog/posts";
import { getSiteUrl } from "@/lib/site-url";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/campus-care", changeFrequency: "monthly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book-carenow", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => {
    const post = getBlogPost(slug);
    return {
      url: `${base}/blog/${slug}`,
      ...(post ? { lastModified: new Date(post.publishedAt) } : {}),
      changeFrequency: "monthly" as const,
      priority:
        slug.startsWith("schedule-") || slug.startsWith("on-demand-")
          ? 0.65
          : 0.5,
    };
  });

  return [...pages, ...posts];
}
