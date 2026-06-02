import { NextRequest } from "next/server";
import {
  analyticsAdminSecret,
  ANALYTICS_MAX_BODY_BYTES,
  isAnalyticsIngestEnabled,
  useBlobAnalyticsStore,
} from "@/lib/analytics/config";
import {
  countryFromHeaders,
  parseIngestPayload,
  userAgentFromHeaders,
} from "@/lib/analytics/parse";
import { isRateLimited } from "@/lib/analytics/rate-limit";
import {
  appendAnalyticsEvent,
  buildAnalyticsSummary,
  readAnalyticsEvents,
} from "@/lib/analytics/store";
import type { AnalyticsIngestPayload } from "@/lib/analytics/types";

export const runtime = "nodejs";

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function unauthorized() {
  return Response.json({ error: "Unauthorized." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const secret = analyticsAdminSecret();
  if (!secret) {
    return Response.json(
      { error: "Analytics admin is not configured." },
      { status: 503 },
    );
  }

  const provided =
    request.nextUrl.searchParams.get("key") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== secret) return unauthorized();

  const events = await readAnalyticsEvents();
  const storage = useBlobAnalyticsStore() ? "blob" : "file";
  return Response.json(buildAnalyticsSummary(events, storage));
}

export async function POST(request: NextRequest) {
  if (!isAnalyticsIngestEnabled()) {
    return Response.json({ ok: true, disabled: true });
  }

  if (request.headers.get("dnt") === "1") {
    return Response.json({ ok: true, skipped: "dnt" });
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > ANALYTICS_MAX_BODY_BYTES) {
    return Response.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: AnalyticsIngestPayload;
  try {
    body = (await request.json()) as AnalyticsIngestPayload;
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parseIngestPayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  await appendAnalyticsEvent({
    type: parsed.type,
    path: parsed.path,
    name: parsed.name,
    referrer: parsed.referrer,
    country: countryFromHeaders(request.headers),
    userAgent: userAgentFromHeaders(request.headers),
    timestamp: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
