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

function decodeGeoDisplay(value: string): string {
  if (!value.includes("%")) return value;
  try {
    return decodeURIComponent(value);
  } catch {
    return value.replaceAll("%20", " ");
  }
}

/** City, region, and country — e.g. "Chicago, IL · United States". */
export function formatLocation(
  country: string | null,
  city?: string | null,
  region?: string | null,
): string {
  const countryLabel = country ? formatCountry(country) : null;
  const placeParts: string[] = [];

  if (city?.trim()) {
    const c = decodeGeoDisplay(city.trim());
    if (region?.trim()) {
      const r = region.trim();
      placeParts.push(country === "US" ? `${c}, ${r.toUpperCase()}` : `${c}, ${r}`);
    } else {
      placeParts.push(c);
    }
  }

  if (placeParts.length > 0) {
    if (countryLabel && countryLabel !== "—") {
      return `${placeParts[0]} · ${countryLabel}`;
    }
    return placeParts[0];
  }

  if (countryLabel && countryLabel !== "—") return countryLabel;
  return "—";
}
