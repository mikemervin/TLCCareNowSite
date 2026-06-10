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

export type PathTrafficCategory = "known" | "bot" | "unknown";

/** Common typos and legacy paths folded into real routes for counting. */
const PATH_ALIASES: Record<string, string> = {
  "/campuscare": "/campus-care",
  "/bookcarenow": "/book-carenow",
};

const BOT_PATH_PREFIXES = [
  "/forum",
  "/forums",
  "/member",
  "/members",
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/wp-includes",
  "/xmlrpc",
  "/.env",
  "/.git",
  "/administrator",
  "/phpmyadmin",
] as const;

const BOT_PATH_KEYWORDS =
  /casino|bonus|depozytu|poker|viagra|cialis|slot-machine|gambling|betting/i;

export function normalizeAnalyticsPath(path: string): string {
  const base = path.split("?")[0] ?? path;
  if (base.length > 1 && base.endsWith("/")) {
    return base.slice(0, -1);
  }
  return base;
}

export function canonicalAnalyticsPath(path: string): string {
  const normalized = normalizeAnalyticsPath(path);
  return PATH_ALIASES[normalized.toLowerCase()] ?? normalized;
}

export function isKnownMarketingPath(path: string): boolean {
  const normalized = canonicalAnalyticsPath(path);
  if (PAGE_LABELS[normalized]) return true;
  if (normalized.startsWith("/blog/") && normalized.length > "/blog/".length) {
    return true;
  }
  return false;
}

export function isBotLikePath(path: string): boolean {
  const normalized = normalizeAnalyticsPath(path).toLowerCase();

  if (BOT_PATH_KEYWORDS.test(normalized)) return true;
  if (/\.(php|asp|aspx|cgi|env)$/.test(normalized)) return true;

  for (const prefix of BOT_PATH_PREFIXES) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
      return true;
    }
  }

  return false;
}

export function pathTrafficCategory(path: string): PathTrafficCategory {
  if (isKnownMarketingPath(path)) return "known";
  if (isBotLikePath(path)) return "bot";
  return "unknown";
}

export function analyticsPageLabel(path: string): string {
  const normalized = canonicalAnalyticsPath(path);
  if (PAGE_LABELS[normalized]) return PAGE_LABELS[normalized];
  if (normalized.startsWith("/blog/")) return "Blog article";
  if (pathTrafficCategory(path) === "bot") return "Likely bot scan";
  return "Unknown / likely 404";
}

export type AnalyticsPageDisplay = {
  label: string;
  detail: string | null;
  category: PathTrafficCategory;
};

export function analyticsPageDisplay(path: string): AnalyticsPageDisplay {
  const raw = normalizeAnalyticsPath(path);
  const canonical = canonicalAnalyticsPath(path);
  const category = pathTrafficCategory(path);

  if (category === "known") {
    const detail =
      raw !== canonical && raw.toLowerCase() !== canonical.toLowerCase()
        ? raw
        : null;
    return {
      label: analyticsPageLabel(path),
      detail,
      category,
    };
  }

  return {
    label: category === "bot" ? "Likely bot scan" : "Unknown / likely 404",
    detail: raw,
    category,
  };
}
