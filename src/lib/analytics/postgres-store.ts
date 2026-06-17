import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import type { AnalyticsEvent } from "@/lib/analytics/types";
import type { FormSubmission } from "@/lib/analytics/submissions-types";

let schemaReady: Promise<void> | null = null;

function sql() {
  const url =
    process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("Postgres is not configured (POSTGRES_URL or DATABASE_URL).");
  }
  return neon(url);
}

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const query = sql();
      await query`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id TEXT PRIMARY KEY,
          type TEXT NOT NULL,
          path TEXT NOT NULL,
          name TEXT,
          page_title TEXT,
          referrer TEXT,
          country TEXT,
          city TEXT,
          region TEXT,
          user_agent TEXT,
          form_id TEXT,
          field TEXT,
          value TEXT,
          session_id TEXT,
          timestamp TIMESTAMPTZ NOT NULL
        )
      `;
      await query`
        CREATE INDEX IF NOT EXISTS analytics_events_timestamp_idx
        ON analytics_events (timestamp DESC)
      `;
      await query`
        CREATE TABLE IF NOT EXISTS analytics_submissions (
          id TEXT PRIMARY KEY,
          source TEXT NOT NULL,
          path TEXT NOT NULL,
          timestamp TIMESTAMPTZ NOT NULL,
          country TEXT,
          city TEXT,
          region TEXT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          state TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL
        )
      `;
      await query`
        CREATE INDEX IF NOT EXISTS analytics_submissions_timestamp_idx
        ON analytics_submissions (timestamp DESC)
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

function rowToEvent(row: Record<string, unknown>): AnalyticsEvent {
  return {
    id: String(row.id),
    type: row.type as AnalyticsEvent["type"],
    path: String(row.path),
    name: (row.name as string | null) ?? null,
    pageTitle: (row.page_title as string | null) ?? null,
    referrer: (row.referrer as string | null) ?? null,
    country: (row.country as string | null) ?? null,
    city: (row.city as string | null) ?? null,
    region: (row.region as string | null) ?? null,
    userAgent: (row.user_agent as string | null) ?? null,
    formId: (row.form_id as string | null) ?? null,
    field: (row.field as string | null) ?? null,
    value: (row.value as string | null) ?? null,
    sessionId: (row.session_id as string | null) ?? null,
    timestamp: new Date(String(row.timestamp)).toISOString(),
  };
}

function rowToSubmission(row: Record<string, unknown>): FormSubmission {
  return {
    id: String(row.id),
    source: row.source as FormSubmission["source"],
    path: String(row.path),
    timestamp: new Date(String(row.timestamp)).toISOString(),
    country: (row.country as string | null) ?? null,
    city: (row.city as string | null) ?? null,
    region: (row.region as string | null) ?? null,
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone),
    state: String(row.state),
    subject: String(row.subject),
    message: String(row.message),
  };
}

export async function appendAnalyticsEventPostgres(
  event: Omit<AnalyticsEvent, "id">,
): Promise<AnalyticsEvent> {
  await ensureSchema();
  const record: AnalyticsEvent = { id: randomUUID(), ...event };
  const query = sql();

  await query`
    INSERT INTO analytics_events (
      id, type, path, name, page_title, referrer,
      country, city, region, user_agent,
      form_id, field, value, session_id, timestamp
    ) VALUES (
      ${record.id},
      ${record.type},
      ${record.path},
      ${record.name},
      ${record.pageTitle},
      ${record.referrer},
      ${record.country},
      ${record.city},
      ${record.region},
      ${record.userAgent},
      ${record.formId},
      ${record.field},
      ${record.value},
      ${record.sessionId},
      ${record.timestamp}
    )
  `;

  return record;
}

export async function readAnalyticsEventsPostgres(
  limit = 5000,
): Promise<AnalyticsEvent[]> {
  await ensureSchema();
  const query = sql();
  const rows = await query`
    SELECT *
    FROM analytics_events
    ORDER BY timestamp DESC
    LIMIT ${limit}
  `;
  return rows.map((row) => rowToEvent(row as Record<string, unknown>)).reverse();
}

export async function appendFormSubmissionPostgres(
  row: FormSubmission,
): Promise<void> {
  await ensureSchema();
  const query = sql();
  await query`
    INSERT INTO analytics_submissions (
      id, source, path, timestamp,
      country, city, region,
      name, email, phone, state, subject, message
    ) VALUES (
      ${row.id},
      ${row.source},
      ${row.path},
      ${row.timestamp},
      ${row.country},
      ${row.city},
      ${row.region},
      ${row.name},
      ${row.email},
      ${row.phone},
      ${row.state},
      ${row.subject},
      ${row.message}
    )
  `;
}

export async function readFormSubmissionsPostgres(
  limit = 200,
): Promise<FormSubmission[]> {
  await ensureSchema();
  const query = sql();
  const rows = await query`
    SELECT *
    FROM analytics_submissions
    ORDER BY timestamp DESC
    LIMIT ${limit}
  `;
  return rows.map((row) => rowToSubmission(row as Record<string, unknown>));
}
