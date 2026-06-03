export type AnalyticsEventType = "pageview" | "event";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  path: string;
  name: string | null;
  pageTitle: string | null;
  referrer: string | null;
  country: string | null;
  userAgent: string | null;
  timestamp: string;
};

export type AnalyticsIngestPayload = {
  type?: unknown;
  path?: unknown;
  name?: unknown;
  pageTitle?: unknown;
  referrer?: unknown;
};

export type CountRow = { label: string; count: number };

export type FormFunnelStepCount = { label: string; count: number };

export type FormFunnelSummary = {
  id: string;
  title: string;
  description: string;
  steps: FormFunnelStepCount[];
  conversionPct: number | null;
};

export type ActionCount = { name: string; label: string; count: number };

export type AnalyticsSummary = {
  storage: "blob" | "file";
  excludedAdminViews: number;
  totalEvents: number;
  pageviews: number;
  customEvents: number;
  uniquePaths: number;
  topPaths: { path: string; count: number }[];
  topReferrers: CountRow[];
  topCountries: CountRow[];
  formFunnels: FormFunnelSummary[];
  topActions: ActionCount[];
  eventsByDay: { date: string; count: number }[];
  recent: AnalyticsEvent[];
  recentFormEvents: AnalyticsEvent[];
};
