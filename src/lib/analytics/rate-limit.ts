import { ANALYTICS_RATE_LIMIT_PER_MINUTE } from "@/lib/analytics/config";

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count += 1;
  return entry.count > ANALYTICS_RATE_LIMIT_PER_MINUTE;
}
