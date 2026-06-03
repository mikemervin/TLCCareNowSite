import type { AnalyticsEvent, FormEntrySnapshot } from "@/lib/analytics/types";

const FORM_LABELS: Record<string, string> = {
  contact: "Contact form",
  enterprise: "Enterprise demo popup",
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  state: "State / location",
  subject: "Subject",
  message: "Message",
};

export function buildFormEntrySnapshots(
  events: AnalyticsEvent[],
  limit = 20,
): FormEntrySnapshot[] {
  const inputs = events.filter(
    (e) =>
      e.type === "form_input" &&
      e.formId &&
      e.field &&
      e.sessionId &&
      e.value !== null,
  );

  const bySession = new Map<
    string,
    {
      formId: string;
      path: string;
      country: string | null;
      updatedAt: string;
      fields: Map<string, string>;
    }
  >();

  for (const event of inputs) {
    const sessionId = event.sessionId!;
    const existing = bySession.get(sessionId) ?? {
      formId: event.formId!,
      path: event.path,
      country: event.country,
      updatedAt: event.timestamp,
      fields: new Map<string, string>(),
    };

    if (event.timestamp > existing.updatedAt) {
      existing.updatedAt = event.timestamp;
      existing.path = event.path;
      existing.country = event.country;
    }

    existing.fields.set(event.field!, event.value ?? "");
    bySession.set(sessionId, existing);
  }

  return [...bySession.entries()]
    .map(([sessionId, data]) => ({
      sessionId,
      formId: data.formId,
      formLabel: FORM_LABELS[data.formId] ?? data.formId,
      path: data.path,
      country: data.country,
      updatedAt: data.updatedAt,
      fields: [...data.fields.entries()]
        .map(([field, value]) => ({
          field,
          label: FIELD_LABELS[field] ?? field,
          value,
        }))
        .filter((f) => f.value.length > 0)
        .sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .filter((entry) => entry.fields.length > 0)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}
