import { site } from "@/lib/site";

/** Human-readable page names aligned with the site header nav. */
const PAGE_LABELS: Record<string, string> = {
  "/": site.name,
  "/campus-care": "TeamLife Campus Care",
  "/enterprise": "Enterprise Solutions",
  "/book-carenow": "Book CareNow",
  "/contact": "Contact",
  "/about": "About",
  "/blog": "Blog",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

function normalizePath(path: string): string {
  const base = path.split("?")[0] ?? path;
  if (base.length > 1 && base.endsWith("/")) {
    return base.slice(0, -1);
  }
  return base;
}

export function analyticsPageLabel(path: string): string {
  const normalized = normalizePath(path);
  if (PAGE_LABELS[normalized]) return PAGE_LABELS[normalized];
  if (normalized.startsWith("/blog/")) return "Blog article";
  return normalized;
}
