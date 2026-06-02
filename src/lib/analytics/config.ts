export function isAnalyticsIngestEnabled(): boolean {
  if (process.env.ANALYTICS_ENABLED === "false") return false;
  if (process.env.ANALYTICS_ENABLED === "true") return true;
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

export function isAnalyticsClientEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

export function analyticsEventsPath(): string {
  return (
    process.env.ANALYTICS_EVENTS_PATH?.trim() ||
    `${process.cwd()}/data/analytics-events.jsonl`
  );
}

export function analyticsAdminSecret(): string | undefined {
  const secret = process.env.ANALYTICS_ADMIN_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : undefined;
}

export const ANALYTICS_MAX_BODY_BYTES = 2048;
export const ANALYTICS_MAX_EVENTS_FILE_BYTES = 5 * 1024 * 1024;
export const ANALYTICS_RATE_LIMIT_PER_MINUTE = 60;
