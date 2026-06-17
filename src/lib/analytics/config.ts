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

export function analyticsSubmissionsPath(): string {
  return (
    process.env.ANALYTICS_SUBMISSIONS_PATH?.trim() ||
    `${process.cwd()}/data/analytics-submissions.jsonl`
  );
}

export type AnalyticsStorageBackend = "file" | "blob" | "postgres";

export function usePostgresAnalyticsStore(): boolean {
  return Boolean(
    process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim(),
  );
}

/** Use Vercel Blob when a read-write token or a connected store (OIDC on Vercel) is present. */
export function useBlobAnalyticsStore(): boolean {
  if (process.env.ANALYTICS_USE_BLOB === "false") return false;
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) return true;
  if (process.env.VERCEL === "1" && process.env.BLOB_STORE_ID?.trim()) {
    return true;
  }
  return false;
}

/** Postgres when configured; otherwise Blob; otherwise local JSONL (dev only). */
export function analyticsStorageBackend(): AnalyticsStorageBackend {
  if (usePostgresAnalyticsStore()) return "postgres";
  if (useBlobAnalyticsStore()) return "blob";
  return "file";
}

export function analyticsAdminSecret(): string | undefined {
  const secret = process.env.ANALYTICS_ADMIN_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : undefined;
}

export const ANALYTICS_MAX_BODY_BYTES = 2048;
export const ANALYTICS_MAX_EVENTS_FILE_BYTES = 5 * 1024 * 1024;
/** Vercel server uploads cap at 4.5 MB — stay below that for read-modify-write blob puts. */
export const ANALYTICS_MAX_BLOB_BYTES = 3.5 * 1024 * 1024;
export const ANALYTICS_RATE_LIMIT_PER_MINUTE = 120;
