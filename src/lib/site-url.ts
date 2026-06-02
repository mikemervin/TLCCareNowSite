/** Public marketing site origin (no trailing slash). Override in production if needed. */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tlccarenow.com";
  return url.replace(/\/$/, "");
}
