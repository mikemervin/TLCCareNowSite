import type { AnalyticsEventType, AnalyticsIngestPayload } from "@/lib/analytics/types";

const MAX_PATH_LENGTH = 512;
const MAX_NAME_LENGTH = 128;
const MAX_PAGE_TITLE_LENGTH = 200;
const MAX_REFERRER_LENGTH = 2048;
const MAX_FORM_VALUE_LENGTH = 500;
const MAX_SESSION_ID_LENGTH = 64;

const FORM_FIELDS: Record<string, Set<string>> = {
  contact: new Set(["name", "email", "phone", "state", "subject", "message"]),
  enterprise: new Set(["name", "email", "phone", "state"]),
};

export type ParsedIngest =
  | {
      ok: true;
      type: AnalyticsEventType;
      path: string;
      name: string | null;
      pageTitle: string | null;
      referrer: string | null;
      formId: string | null;
      field: string | null;
      value: string | null;
      sessionId: string | null;
    }
  | { ok: false; error: string };

function isExcludedPath(path: string): boolean {
  return path === "/admin" || path.startsWith("/admin/");
}

export function parseIngestPayload(body: AnalyticsIngestPayload): ParsedIngest {
  const type = body.type;
  if (
    type !== "pageview" &&
    type !== "event" &&
    type !== "form_input" &&
    type !== "heartbeat"
  ) {
    return { ok: false, error: "Invalid event type." };
  }

  if (typeof body.path !== "string" || !body.path.startsWith("/")) {
    return { ok: false, error: "Invalid path." };
  }

  const path = body.path.slice(0, MAX_PATH_LENGTH);
  if (path.startsWith("/api/") || isExcludedPath(path.split("?")[0] ?? path)) {
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

  if (type === "heartbeat" && body.name) {
    return { ok: false, error: "Heartbeat must not include a name." };
  }

  let formId: string | null = null;
  let field: string | null = null;
  let value: string | null = null;
  let sessionId: string | null = null;

  if (
    (type === "pageview" ||
      type === "event" ||
      type === "form_input" ||
      type === "heartbeat") &&
    typeof body.sessionId === "string" &&
    body.sessionId.trim()
  ) {
    sessionId = body.sessionId.trim().slice(0, MAX_SESSION_ID_LENGTH);
  }

  if (type === "heartbeat" && !sessionId) {
    return { ok: false, error: "Invalid session id." };
  }

  if (type === "form_input") {
    if (typeof body.formId !== "string" || !FORM_FIELDS[body.formId]) {
      return { ok: false, error: "Invalid form id." };
    }
    if (typeof body.field !== "string" || !FORM_FIELDS[body.formId].has(body.field)) {
      return { ok: false, error: "Invalid form field." };
    }
    if (!sessionId) {
      return { ok: false, error: "Invalid session id." };
    }

    formId = body.formId;
    field = body.field;
    value =
      typeof body.value === "string"
        ? body.value.slice(0, MAX_FORM_VALUE_LENGTH)
        : "";
  }

  let referrer: string | null = null;
  if (typeof body.referrer === "string" && body.referrer.trim()) {
    referrer = body.referrer.trim().slice(0, MAX_REFERRER_LENGTH);
  }

  let pageTitle: string | null = null;
  if (typeof body.pageTitle === "string" && body.pageTitle.trim()) {
    pageTitle = body.pageTitle.trim().slice(0, MAX_PAGE_TITLE_LENGTH);
  }

  return {
    ok: true,
    type,
    path,
    name,
    pageTitle,
    referrer,
    formId,
    field,
    value,
    sessionId,
  };
}

export type GeoFromHeaders = {
  country: string | null;
  city: string | null;
  region: string | null;
};

function sanitizeGeoPart(
  raw: string | null,
  maxLen: number,
): string | null {
  if (!raw?.trim()) return null;
  const value = raw.trim().slice(0, maxLen);
  if (/^(unknown|null|undefined)$/i.test(value)) return null;
  return value;
}

export function geoFromHeaders(headers: Headers): GeoFromHeaders {
  const countryRaw =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code");
  const country =
    countryRaw && countryRaw !== "XX"
      ? countryRaw.slice(0, 2).toUpperCase()
      : null;

  const city =
    sanitizeGeoPart(headers.get("x-vercel-ip-city"), 80) ||
    sanitizeGeoPart(headers.get("cf-ipcity"), 80);

  const region =
    sanitizeGeoPart(headers.get("x-vercel-ip-country-region"), 32) ||
    sanitizeGeoPart(headers.get("cf-region"), 32);

  return { country, city, region };
}

export function countryFromHeaders(headers: Headers): string | null {
  return geoFromHeaders(headers).country;
}

export function userAgentFromHeaders(headers: Headers): string | null {
  const ua = headers.get("user-agent");
  if (!ua) return null;
  return ua.slice(0, 256);
}
