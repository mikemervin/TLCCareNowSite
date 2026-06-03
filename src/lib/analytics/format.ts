/** Human-readable referrer (hostname or "Direct"). */
export function formatReferrer(referrer: string | null): string {
  if (!referrer?.trim()) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./i, "");
    return host || "Direct";
  } catch {
    return referrer.length > 48 ? `${referrer.slice(0, 45)}…` : referrer;
  }
}

/** Short browser + OS label from User-Agent. */
export function formatBrowser(userAgent: string | null): string {
  if (!userAgent) return "—";
  const ua = userAgent;

  let browser = "Browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";

  let os = "";
  if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Mac OS X|Macintosh/.test(ua)) os = "macOS";
  else if (/Windows/.test(ua)) os = "Windows";
  else if (/Linux/.test(ua)) os = "Linux";

  return os ? `${browser} · ${os}` : browser;
}

const regionNames =
  typeof Intl !== "undefined"
    ? new Intl.DisplayNames("en", { type: "region" })
    : null;

export function formatCountry(code: string | null): string {
  if (!code) return "—";
  return regionNames?.of(code) ?? code;
}
