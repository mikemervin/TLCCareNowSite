import type { AnalyticsEventType, AnalyticsIngestPayload } from "@/lib/analytics/types";

const MAX_PATH_LENGTH = 512;
const MAX_NAME_LENGTH = 128;
const MAX_REFERRER_LENGTH = 2048;

export type ParsedIngest =
  | { ok: true; type: AnalyticsEventType; path: string; name: string | null; referrer: string | null }
  | { ok: false; error: string };

export function parseIngestPayload(body: AnalyticsIngestPayload): ParsedIngest {
  const type = body.type;
  if (type !== "pageview" && type !== "event") {
    return { ok: false, error: "Invalid event type." };
  }

  if (typeof body.path !== "string" || !body.path.startsWith("/")) {
    return { ok: false, error: "Invalid path." };
  }

  const path = body.path.slice(0, MAX_PATH_LENGTH);
  if (path.startsWith("/api/")) {
    return { ok: false, error: "Path not tracked." };
  }

  let name: string | null = null;
  if (body.name !== undefined && body.name !== null) {
    if (typeof body.name !== "string" || !body.name.trim()) {
      return { ok: false, error: "Invalid event name." };
    }
    name = body.name.trim().slice(0, MAX_NAME_LENGTH);
  }

  if (type === "event" && !name) {
    return { ok: false, error: "Event name is required." };
  }

  let referrer: string | null = null;
  if (typeof body.referrer === "string" && body.referrer.trim()) {
    referrer = body.referrer.trim().slice(0, MAX_REFERRER_LENGTH);
  }

  return { ok: true, type, path, name, referrer };
}

export function countryFromHeaders(headers: Headers): string | null {
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code");
  if (!country || country === "XX") return null;
  return country.slice(0, 2).toUpperCase();
}

export function userAgentFromHeaders(headers: Headers): string | null {
  const ua = headers.get("user-agent");
  if (!ua) return null;
  return ua.slice(0, 256);
}
