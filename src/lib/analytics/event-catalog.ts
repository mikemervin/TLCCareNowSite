import type { AnalyticsEvent, FormFunnelSummary } from "@/lib/analytics/types";

type FunnelStepDef = {
  key: string;
  label: string;
  aliases?: string[];
};

type FunnelDef = {
  id: string;
  title: string;
  description: string;
  steps: FunnelStepDef[];
};

export const FORM_FUNNELS: FunnelDef[] = [
  {
    id: "contact",
    title: "Contact form",
    description: "Get In Touch on /contact and embedded sections",
    steps: [
      { key: "contact_form_started", label: "Started filling out" },
      { key: "contact_form_submitted", label: "Clicked Send" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise demo popup",
    description: "On the Enterprise page",
    steps: [
      { key: "enterprise_lead_shown", label: "Saw the popup" },
      { key: "enterprise_lead_started", label: "Started filling out" },
      {
        key: "enterprise_lead_submitted",
        label: "Clicked Send",
        aliases: ["enterprise_lead_submit"],
      },
    ],
  },
];

const EVENT_LABELS: Record<string, string> = {
  contact_form_started: "Started contact form",
  contact_form_submitted: "Sent contact form",
  enterprise_lead_shown: "Saw enterprise demo popup",
  enterprise_lead_started: "Started enterprise demo form",
  enterprise_lead_submitted: "Sent enterprise demo form",
  enterprise_lead_submit: "Sent enterprise demo form",
  outbound_book_carenow_header: "Book CareNow (header)",
  outbound_book_carenow_hero: "Book CareNow (hero)",
  outbound_book_carenow_footer: "Book care online (footer)",
  outbound_app_book_page_open: "Open TLC CareNow (book page)",
  outbound_app_book_page_login: "Resident login (book page)",
  outbound_app_book_page_staff: "Staff sign in (book page)",
  outbound_app_book_page_inline: "App link in text (book page)",
  outbound_app_campus_care_inline: "App link (Campus Care page)",
  outbound_app_about: "Open TLC CareNow (about page)",
};

function keysForStep(step: FunnelStepDef): string[] {
  return [step.key, ...(step.aliases ?? [])];
}

export function countNamedEvents(
  events: AnalyticsEvent[],
  keys: string[],
): number {
  const allowed = new Set(keys);
  return events.filter(
    (e) => e.type === "event" && e.name && allowed.has(e.name),
  ).length;
}

export function eventDisplayName(name: string): string {
  if (EVENT_LABELS[name]) return EVENT_LABELS[name];
  if (name.startsWith("outbound_")) {
    return name
      .slice("outbound_".length)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return name.replaceAll("_", " ");
}

export function buildFormFunnels(events: AnalyticsEvent[]): FormFunnelSummary[] {
  const custom = events.filter((e) => e.type === "event");

  return FORM_FUNNELS.map((funnel) => {
    const steps = funnel.steps.map((step) => ({
      label: step.label,
      count: countNamedEvents(custom, keysForStep(step)),
    }));

    const first = steps[0]?.count ?? 0;
    const last = steps[steps.length - 1]?.count ?? 0;

    return {
      id: funnel.id,
      title: funnel.title,
      description: funnel.description,
      steps,
      conversionPct: first > 0 ? Math.round((last / first) * 100) : null,
    };
  });
}

export function buildTopActions(events: AnalyticsEvent[], limit = 12) {
  const counts = new Map<string, number>();
  for (const event of events) {
    if (event.type !== "event" || !event.name) continue;
    counts.set(event.name, (counts.get(event.name) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      label: eventDisplayName(name),
      count,
    }));
}
