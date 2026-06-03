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
      { key: "contact_form_started", label: "Started" },
      { key: "contact_form_submitted", label: "Submitted" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise demo popup",
    description: "Scroll-triggered popup on /enterprise",
    steps: [
      { key: "enterprise_lead_shown", label: "Popup opened" },
      { key: "enterprise_lead_started", label: "Started" },
      {
        key: "enterprise_lead_submitted",
        label: "Submitted",
        aliases: ["enterprise_lead_submit"],
      },
    ],
  },
];

const EVENT_LABELS: Record<string, string> = {
  contact_form_started: "Contact — started",
  contact_form_submitted: "Contact — submitted",
  enterprise_lead_shown: "Enterprise popup — opened",
  enterprise_lead_started: "Enterprise popup — started",
  enterprise_lead_submitted: "Enterprise popup — submitted",
  enterprise_lead_submit: "Enterprise popup — submitted",
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
  return EVENT_LABELS[name] ?? name.replaceAll("_", " ");
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
