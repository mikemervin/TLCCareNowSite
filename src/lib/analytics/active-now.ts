import type { AnalyticsEvent, ActiveNowStats } from "@/lib/analytics/types";

/** How recently someone must have been on the site to count as "online". */
export const ACTIVE_NOW_WINDOW_MS = 5 * 60 * 1000;

function isAdminPath(path: string): boolean {
  const base = path.split("?")[0] ?? path;
  return base === "/admin" || base.startsWith("/admin/");
}

function uniqueActiveSessions(events: AnalyticsEvent[]): number {
  const sessions = new Set<string>();
  const fingerprints = new Set<string>();

  for (const event of events) {
    if (isAdminPath(event.path)) continue;

    if (event.sessionId) {
      sessions.add(event.sessionId);
      continue;
    }

    if (event.type === "pageview" || event.type === "heartbeat") {
      const fp = `${event.city ?? ""}|${event.region ?? ""}|${event.country ?? "?"}|${event.userAgent ?? "?"}`;
      fingerprints.add(fp);
    }
  }

  if (sessions.size > 0) return sessions.size;
  return fingerprints.size;
}

export function buildActiveNowStats(events: AnalyticsEvent[]): ActiveNowStats {
  const now = Date.now();
  const cutoff = now - ACTIVE_NOW_WINDOW_MS;
  const windowMinutes = Math.round(ACTIVE_NOW_WINDOW_MS / 60_000);

  const recent = events.filter((event) => {
    if (isAdminPath(event.path)) return false;
    const at = new Date(event.timestamp).getTime();
    if (Number.isNaN(at) || at < cutoff) return false;
    return (
      event.type === "heartbeat" ||
      event.type === "pageview" ||
      event.type === "event" ||
      event.type === "form_input"
    );
  });

  return {
    count: uniqueActiveSessions(recent),
    windowMinutes,
    asOf: new Date(now).toISOString(),
  };
}

export function isPresenceEvent(event: AnalyticsEvent): boolean {
  return event.type === "heartbeat";
}
