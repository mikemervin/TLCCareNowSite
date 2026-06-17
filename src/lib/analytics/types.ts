export type AnalyticsEventType =
  | "pageview"
  | "event"
  | "form_input"
  | "heartbeat";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  path: string;
  name: string | null;
  pageTitle: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  userAgent: string | null;
  /** Set for form_input — contact | enterprise */
  formId: string | null;
  field: string | null;
  value: string | null;
  sessionId: string | null;
  timestamp: string;
};

export type FormEntrySnapshot = {
  sessionId: string;
  formId: string;
  formLabel: string;
  path: string;
  country: string | null;
  city: string | null;
  region: string | null;
  updatedAt: string;
  fields: { field: string; label: string; value: string }[];
};

export type AnalyticsIngestPayload = {
  type?: unknown;
  path?: unknown;
  name?: unknown;
  pageTitle?: unknown;
  referrer?: unknown;
  formId?: unknown;
  field?: unknown;
  value?: unknown;
  sessionId?: unknown;
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

export type SessionStats = {
  sessions: number;
  bounceRatePct: number;
  avgPagesPerVisit: number;
};

export type LeadStats = {
  draftCount: number;
  sentCount: number;
  likelySpamDrafts: number;
  likelySpamSends: number;
  realSends: number;
};

export type TodayStats = {
  dateKey: string;
  dateLabel: string;
  pageviews: number;
  /** Unique browser sessions today (best estimate). */
  visitors: number;
  formActions: number;
  totalEvents: number;
  /** Unique sessions today grouped by best-known city/region/country. */
  visitorsByLocation: CountRow[];
  topPages: CountRow[];
  blogPages: CountRow[];
  deviceBreakdown: CountRow[];
  peakHours: CountRow[];
  sessionStats: SessionStats;
  utmCampaigns: CountRow[];
  appClicks: number;
};

export type ActiveNowStats = {
  count: number;
  windowMinutes: number;
  asOf: string;
};

export type AnalyticsSummary = {
  storage: "blob" | "file" | "postgres";
  excludedAdminViews: number;
  activeNow: ActiveNowStats;
  today: TodayStats;
  totalEvents: number;
  pageviews: number;
  customEvents: number;
  uniquePaths: number;
  topPaths: { path: string; count: number }[];
  /** Junk URLs, bot scans, and other non-marketing paths. */
  noisePaths: { path: string; count: number }[];
  topReferrers: CountRow[];
  topLocations: CountRow[];
  blogRankings: CountRow[];
  deviceBreakdown: CountRow[];
  peakHours: CountRow[];
  sessionStats: SessionStats;
  utmCampaigns: CountRow[];
  outboundClicks: ActionCount[];
  leadStats: LeadStats;
  formFunnels: FormFunnelSummary[];
  topActions: ActionCount[];
  eventsByDay: { date: string; count: number }[];
  recent: AnalyticsEvent[];
  recentFormEvents: AnalyticsEvent[];
  formEntries: FormEntrySnapshot[];
  recentFieldUpdates: AnalyticsEvent[];
};
