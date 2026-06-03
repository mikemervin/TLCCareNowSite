import type { MetadataRoute } from "next";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog/posts";
import { getSiteUrl } from "@/lib/site-url";

const staticPaths = [
  "",
  "/enterprise",
  "/campus-care",
  "/contact",
  "/about",
  "/book-carenow",
  "/blog",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/enterprise" ? 0.9 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => {
    const post = getBlogPost(slug);
    return {
      url: `${base}/blog/${slug}`,
      lastModified: post ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: slug.startsWith("schedule-") || slug.startsWith("on-demand-")
        ? 0.65
        : 0.5,
    };
  });

  return [...pages, ...posts];
}
