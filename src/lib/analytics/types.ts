export type AnalyticsEventType = "pageview" | "event";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  path: string;
  name: string | null;
  referrer: string | null;
  country: string | null;
  userAgent: string | null;
  timestamp: string;
};

export type AnalyticsIngestPayload = {
  type?: unknown;
  path?: unknown;
  name?: unknown;
  referrer?: unknown;
};

export type AnalyticsSummary = {
  totalEvents: number;
  pageviews: number;
  customEvents: number;
  uniquePaths: number;
  topPaths: { path: string; count: number }[];
  eventsByDay: { date: string; count: number }[];
  recent: AnalyticsEvent[];
};
