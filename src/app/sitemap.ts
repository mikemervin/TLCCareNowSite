import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const blogSlugs = ["depression-in-elderly-people"] as const;

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

  const posts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
