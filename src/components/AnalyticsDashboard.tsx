import type { ReactNode } from "react";
import { AnalyticsActiveNow } from "@/components/AnalyticsActiveNow";
import { logoutAnalytics } from "@/app/admin/analytics/actions";
import { eventDisplayName } from "@/lib/analytics/event-catalog";
import {
  analyticsPageDisplay,
  pathTrafficCategory,
} from "@/lib/analytics/page-labels";
import {
  formatSiteDateKeyLabel,
  formatSiteWhen,
} from "@/lib/analytics/today";
import { siteTimezoneDisplayLabel } from "@/lib/analytics/timezone";
import {
  formatBrowser,
  formatLocation,
  formatReferrer,
} from "@/lib/analytics/format";
import { isLikelySpamText } from "@/lib/analytics/spam";
import { submissionSourceLabel } from "@/lib/analytics/submissions-types";
import type { FormSubmission } from "@/lib/analytics/submissions-types";
import type {
  AnalyticsEvent,
  AnalyticsSummary,
  CountRow,
  FormEntrySnapshot,
  FormFunnelSummary,
  LeadStats,
} from "@/lib/analytics/types";

type AnalyticsDashboardProps = {
  summary: AnalyticsSummary;
  submissions: FormSubmission[];
  showProductionHints?: boolean;
};

function formatPagePath(path: string): string {
  return analyticsPageDisplay(path).label;
}

function activityMetaLine(event: AnalyticsEvent): string {
  const parts: string[] = [];
  if (event.type === "pageview") {
    const detail = analyticsPageDisplay(event.path).detail;
    if (detail) parts.push(detail);
  } else {
    parts.push(formatPagePath(event.path));
  }
  const location = formatLocation(
    event.country,
    event.city ?? null,
    event.region ?? null,
  );
  if (location && location !== "—") parts.push(location);
  parts.push(formatBrowser(event.userAgent));
  return parts.join(" · ");
}

function describeActivity(event: AnalyticsEvent): string {
  if (event.type === "pageview") {
    const display = analyticsPageDisplay(event.path);
    if (display.category !== "known") return display.label;
    return `Viewed ${display.label}`;
  }
  if (event.type === "event" && event.name) {
    return eventDisplayName(event.name);
  }
  return "Site activity";
}

function formatFormId(formId: string | null): string {
  if (formId === "enterprise") return "Enterprise demo";
  if (formId === "contact") return "Contact form";
  return formId ?? "—";
}

type AggregatedPathRow = {
  key: string;
  label: string;
  count: number;
  detail: string | null;
};

function aggregatePathRows(
  paths: { path: string; count: number }[],
): AggregatedPathRow[] {
  const map = new Map<string, AggregatedPathRow>();

  for (const item of paths) {
    const display = analyticsPageDisplay(item.path);
    const existing = map.get(display.label);
    if (existing) {
      existing.count += item.count;
      if (display.detail) {
        const parts = new Set(
          `${existing.detail ?? ""},${display.detail}`
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean),
        );
        existing.detail = [...parts].join(", ");
      }
    } else {
      map.set(display.label, {
        key: display.label,
        label: display.label,
        count: item.count,
        detail: display.detail,
      });
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

function truncateText(text: string, max = 220): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function activityBadgeLabel(event: AnalyticsEvent): string | null {
  if (event.type === "pageview") {
    const category = pathTrafficCategory(event.path);
    if (category === "bot") return "Bot";
    if (category === "unknown") return "404";
    return "Page";
  }
  if (event.type === "event") {
    if (event.name?.startsWith("outbound_")) return "App";
    return "Form";
  }
  return null;
}

function SectionGroup({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="analytics-section-group">
      <header className="analytics-section-group-head">
        <h2 className="analytics-section-group-title">{title}</h2>
        {lead ? <p className="analytics-section-group-lead">{lead}</p> : null}
      </header>
      {children}
    </section>
  );
}

function MiniStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <article className="analytics-mini-stat">
      <p className="analytics-mini-stat-label">{label}</p>
      <p className="analytics-mini-stat-value tabular-nums">{value}</p>
      {hint ? <p className="analytics-mini-stat-hint">{hint}</p> : null}
    </article>
  );
}

function Panel({
  title,
  subtitle,
  children,
  badge,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <div className="analytics-panel">
      <header className="analytics-panel-head-row">
        <div>
          {badge ? <span className="analytics-panel-badge">{badge}</span> : null}
          <h3 className="analytics-panel-title">{title}</h3>
          {subtitle ? (
            <p className="analytics-panel-subtitle">{subtitle}</p>
          ) : null}
        </div>
      </header>
      {children}
    </div>
  );
}

function CountList({
  items,
  emptyLabel,
  maxCount,
}: {
  items: CountRow[];
  emptyLabel: string;
  maxCount: number;
}) {
  if (items.length === 0) {
    return <p className="analytics-panel-empty">{emptyLabel}</p>;
  }

  return (
    <ul className="analytics-path-list">
      {items.map((item) => (
        <li key={item.label} className="analytics-path-row">
          <div className="analytics-path-row-head">
            <span className="analytics-path-name">{item.label}</span>
            <span className="analytics-path-count tabular-nums">{item.count}</span>
          </div>
          <span className="analytics-path-bar-track" aria-hidden>
            <span
              className="analytics-path-bar-fill"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

function PathCountList({
  items,
  emptyLabel,
  maxCount,
}: {
  items: AggregatedPathRow[];
  emptyLabel: string;
  maxCount: number;
}) {
  if (items.length === 0) {
    return <p className="analytics-panel-empty">{emptyLabel}</p>;
  }

  return (
    <ul className="analytics-path-list">
      {items.map((item, index) => (
        <li key={item.key} className="analytics-path-row">
          <div className="analytics-path-row-head">
            <span className="analytics-path-rank tabular-nums" aria-hidden>
              {index + 1}
            </span>
            <div className="analytics-path-copy">
              <span className="analytics-path-name">{item.label}</span>
              {item.detail ? (
                <span className="analytics-path-detail">{item.detail}</span>
              ) : null}
            </div>
            <span className="analytics-path-count tabular-nums">{item.count}</span>
          </div>
          <span className="analytics-path-bar-track" aria-hidden>
            <span
              className="analytics-path-bar-fill"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

function NoisePathList({
  items,
  emptyLabel,
  maxCount,
}: {
  items: { path: string; count: number }[];
  emptyLabel: string;
  maxCount: number;
}) {
  if (items.length === 0) {
    return <p className="analytics-panel-empty">{emptyLabel}</p>;
  }

  return (
    <ul className="analytics-path-list">
      {items.map((item) => {
        const display = analyticsPageDisplay(item.path);
        return (
          <li key={item.path} className="analytics-path-row">
            <div className="analytics-path-row-head">
              <span className="analytics-path-name">{display.label}</span>
              <span className="analytics-path-count tabular-nums">
                {item.count}
              </span>
            </div>
            {display.detail ? (
              <p className="analytics-path-detail">{display.detail}</p>
            ) : null}
            <span className="analytics-path-bar-track" aria-hidden>
              <span
                className="analytics-path-bar-fill analytics-path-bar-fill--noise"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function DraftEntryCard({ entry }: { entry: FormEntrySnapshot }) {
  const location = formatLocation(entry.country, entry.city, entry.region);
  const message = entry.fields.find((field) => field.field === "message");
  const otherFields = entry.fields.filter((field) => field.field !== "message");

  return (
    <article className="analytics-entry-card analytics-entry-card--draft">
      <header className="analytics-entry-head">
        <div>
          <div className="analytics-entry-badges">
            <span className="analytics-entry-status analytics-entry-status--draft">
              Draft
            </span>
            <span className="analytics-entry-form-tag">{entry.formLabel}</span>
          </div>
          <p className="analytics-entry-meta">
            {formatPagePath(entry.path)}
            {location !== "—" ? ` · ${location}` : ""}
          </p>
        </div>
        <time className="analytics-entry-time tabular-nums">
          {formatSiteWhen(entry.updatedAt)}
        </time>
      </header>
      {otherFields.length > 0 ? (
        <dl className="analytics-entry-fields analytics-entry-fields--compact">
          {otherFields.map((field) => (
            <div key={field.field} className="analytics-entry-field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {message ? (
        <blockquote className="analytics-entry-message">
          {truncateText(message.value, 280)}
        </blockquote>
      ) : null}
    </article>
  );
}

function SentEntryCard({ sub }: { sub: FormSubmission }) {
  const location = formatLocation(sub.country, sub.city ?? null, sub.region ?? null);

  return (
    <article className="analytics-entry-card analytics-entry-card--sent">
      <header className="analytics-entry-head">
        <div>
          <div className="analytics-entry-badges">
            <span className="analytics-entry-status analytics-entry-status--sent">
              Sent
            </span>
            <span className="analytics-entry-form-tag">
              {submissionSourceLabel(sub.source)}
            </span>
          </div>
          <p className="analytics-entry-meta">
            {formatPagePath(sub.path)}
            {location !== "—" ? ` · ${location}` : ""}
          </p>
        </div>
        <time className="analytics-entry-time tabular-nums">
          {formatSiteWhen(sub.timestamp)}
        </time>
      </header>
      <dl className="analytics-entry-fields analytics-entry-fields--compact">
        <div className="analytics-entry-field">
          <dt>Name</dt>
          <dd>{sub.name}</dd>
        </div>
        <div className="analytics-entry-field">
          <dt>Email</dt>
          <dd>{sub.email}</dd>
        </div>
        {sub.phone ? (
          <div className="analytics-entry-field">
            <dt>Phone</dt>
            <dd>{sub.phone}</dd>
          </div>
        ) : null}
        {sub.state ? (
          <div className="analytics-entry-field">
            <dt>Location</dt>
            <dd>{sub.state}</dd>
          </div>
        ) : null}
        {sub.subject ? (
          <div className="analytics-entry-field">
            <dt>Subject</dt>
            <dd>{sub.subject}</dd>
          </div>
        ) : null}
      </dl>
      {sub.message ? (
        <blockquote className="analytics-entry-message">
          {truncateText(sub.message, 280)}
        </blockquote>
      ) : null}
    </article>
  );
}

function SpamEntriesDrawer({
  count,
  label,
  children,
}: {
  count: number;
  label: string;
  children: ReactNode;
}) {
  if (count === 0) return null;

  return (
    <details className="analytics-spam-drawer">
      <summary className="analytics-spam-drawer-summary">
        <span className="analytics-spam-drawer-label">{label}</span>
        <span className="analytics-spam-drawer-count tabular-nums">{count}</span>
      </summary>
      <div className="analytics-spam-drawer-body">{children}</div>
    </details>
  );
}

function FormEntriesPanel({ entries }: { entries: FormEntrySnapshot[] }) {
  if (entries.length === 0) {
    return (
      <p className="analytics-panel-empty">
        No drafts yet. Partial entries appear here when someone types but does
        not click Send.
      </p>
    );
  }

  const realEntries = entries.filter(
    (entry) => !isLikelySpamText(...entry.fields.map((field) => field.value)),
  );
  const spamEntries = entries.filter((entry) =>
    isLikelySpamText(...entry.fields.map((field) => field.value)),
  );

  return (
    <div className="analytics-entry-stack">
      {realEntries.length > 0 ? (
        <div className="analytics-entry-list">
          {realEntries.map((entry) => (
            <DraftEntryCard key={entry.sessionId} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="analytics-panel-empty analytics-panel-empty--inline">
          No real drafts—only filtered spam below.
        </p>
      )}
      <SpamEntriesDrawer count={spamEntries.length} label="Filtered spam drafts">
        <div className="analytics-entry-list">
          {spamEntries.map((entry) => (
            <div key={entry.sessionId} className="analytics-entry-card--spam-wrap">
              <DraftEntryCard entry={entry} />
            </div>
          ))}
        </div>
      </SpamEntriesDrawer>
    </div>
  );
}

function SubmittedFormsPanel({ submissions }: { submissions: FormSubmission[] }) {
  if (submissions.length === 0) {
    return (
      <p className="analytics-panel-empty">
        No completed sends yet. When someone clicks Send, a copy appears here and
        you still get email.
      </p>
    );
  }

  const realSubmissions = submissions.filter(
    (sub) =>
      !isLikelySpamText(sub.name, sub.email, sub.subject, sub.message, sub.phone),
  );
  const spamSubmissions = submissions.filter((sub) =>
    isLikelySpamText(sub.name, sub.email, sub.subject, sub.message, sub.phone),
  );

  return (
    <div className="analytics-entry-stack">
      {realSubmissions.length > 0 ? (
        <div className="analytics-entry-list">
          {realSubmissions.map((sub) => (
            <SentEntryCard key={sub.id} sub={sub} />
          ))}
        </div>
      ) : (
        <p className="analytics-panel-empty analytics-panel-empty--inline">
          No real sends yet—only filtered spam below.
        </p>
      )}
      <SpamEntriesDrawer count={spamSubmissions.length} label="Filtered spam sends">
        <div className="analytics-entry-list">
          {spamSubmissions.map((sub) => (
            <div key={sub.id} className="analytics-entry-card--spam-wrap">
              <SentEntryCard sub={sub} />
            </div>
          ))}
        </div>
      </SpamEntriesDrawer>
    </div>
  );
}

function LeadsSummaryStrip({ leadStats }: { leadStats: LeadStats }) {
  const spamTotal = leadStats.likelySpamDrafts + leadStats.likelySpamSends;

  return (
    <div className="analytics-leads-hero">
      <article className="analytics-lead-metric analytics-lead-metric--primary">
        <p className="analytics-lead-metric-label">Real sends</p>
        <p className="analytics-lead-metric-value tabular-nums">
          {leadStats.realSends}
        </p>
        <p className="analytics-lead-metric-note">Legitimate completed forms</p>
      </article>
      <article className="analytics-lead-metric">
        <p className="analytics-lead-metric-label">Drafts</p>
        <p className="analytics-lead-metric-value tabular-nums">
          {leadStats.draftCount}
        </p>
        <p className="analytics-lead-metric-note">Typed but not sent</p>
      </article>
      <article className="analytics-lead-metric">
        <p className="analytics-lead-metric-label">Total sent</p>
        <p className="analytics-lead-metric-value tabular-nums">
          {leadStats.sentCount}
        </p>
        <p className="analytics-lead-metric-note">All completed forms</p>
      </article>
      <article className="analytics-lead-metric analytics-lead-metric--muted">
        <p className="analytics-lead-metric-label">Spam filtered</p>
        <p className="analytics-lead-metric-value tabular-nums">{spamTotal}</p>
        <p className="analytics-lead-metric-note">
          {leadStats.likelySpamSends} sent · {leadStats.likelySpamDrafts} drafts
        </p>
      </article>
    </div>
  );
}

function FormFunnelsPanel({ funnels }: { funnels: FormFunnelSummary[] }) {
  const hasAny = funnels.some((f) => f.steps.some((s) => s.count > 0));

  if (!hasAny) {
    return (
      <p className="analytics-panel-empty">
        No form activity yet. Try the contact form or the enterprise demo popup
        on the live site.
      </p>
    );
  }

  return (
    <div className="analytics-funnel-grid">
      {funnels.map((funnel) => {
        const lastStep = funnel.steps[funnel.steps.length - 1];
        const firstStep = funnel.steps[0];
        const conversionPct =
          firstStep && lastStep && firstStep.count > 0
            ? Math.round((lastStep.count / firstStep.count) * 100)
            : null;
        const completed = (lastStep?.count ?? 0) > 0;

        return (
          <article
            key={funnel.id}
            className={`analytics-funnel-card${completed ? " analytics-funnel-card--complete" : ""}`}
          >
            <header className="analytics-funnel-head">
              <div>
                <h4 className="analytics-funnel-title">{funnel.title}</h4>
                <p className="analytics-funnel-desc">{funnel.description}</p>
              </div>
              {conversionPct !== null && completed ? (
                <span className="analytics-funnel-badge tabular-nums">
                  {conversionPct}%
                </span>
              ) : (
                <span className="analytics-funnel-badge analytics-funnel-badge--idle">
                  —
                </span>
              )}
            </header>
            <div className="analytics-funnel-pipeline">
              {funnel.steps.map((step, index) => (
                <div key={step.label} className="analytics-funnel-pipeline-item">
                  {index > 0 ? (
                    <span className="analytics-funnel-arrow" aria-hidden>
                      →
                    </span>
                  ) : null}
                  <div className="analytics-funnel-node">
                    <span className="analytics-funnel-node-count tabular-nums">
                      {step.count}
                    </span>
                    <span className="analytics-funnel-node-label">
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ActivityFeed({ events }: { events: AnalyticsEvent[] }) {
  if (events.length === 0) {
    return <p className="analytics-panel-empty">No activity recorded yet.</p>;
  }

  return (
    <ol className="analytics-activity-feed">
      {events.slice(0, 25).map((event) => {
        const badge = activityBadgeLabel(event);
        const noise =
          event.type === "pageview" &&
          pathTrafficCategory(event.path) !== "known";

        return (
          <li
            key={event.id}
            className={`analytics-activity-item${
              noise ? " analytics-activity-item--noise" : ""
            }`}
          >
            <div className="analytics-activity-main">
              <div className="analytics-activity-head">
                {badge ? (
                  <span
                    className={`analytics-activity-badge analytics-activity-badge--${badge.toLowerCase()}`}
                  >
                    {badge}
                  </span>
                ) : null}
                <p className="analytics-activity-what">{describeActivity(event)}</p>
              </div>
              <p className="analytics-activity-meta">{activityMetaLine(event)}</p>
            </div>
            <time className="analytics-activity-time tabular-nums">
              {formatSiteWhen(event.timestamp)}
            </time>
          </li>
        );
      })}
    </ol>
  );
}

export function AnalyticsDashboard({
  summary,
  submissions,
  showProductionHints = false,
}: AnalyticsDashboardProps) {
  const isEmpty = summary.pageviews === 0 && summary.customEvents === 0;
  const onlyAdminViews =
    summary.pageviews === 0 && summary.excludedAdminViews > 0;
  const maxNoisePathCount = summary.noisePaths[0]?.count ?? 1;
  const maxReferrerCount = summary.topReferrers[0]?.count ?? 1;
  const maxLocationCount = summary.topLocations[0]?.count ?? 1;
  const maxTodayLocationCount =
    summary.today.visitorsByLocation[0]?.count ?? 1;
  const maxTodayPagesCount = summary.today.topPages[0]?.count ?? 1;
  const maxTodayBlogCount = summary.today.blogPages[0]?.count ?? 1;
  const maxTodayDeviceCount = summary.today.deviceBreakdown[0]?.count ?? 1;
  const maxTodayPeakCount = summary.today.peakHours[0]?.count ?? 1;
  const maxTodayUtmCount = summary.today.utmCampaigns[0]?.count ?? 1;
  const maxDeviceCount = summary.deviceBreakdown[0]?.count ?? 1;
  const maxPeakCount = summary.peakHours[0]?.count ?? 1;
  const maxBlogCount = summary.blogRankings[0]?.count ?? 1;
  const maxOutboundCount = summary.outboundClicks[0]?.count ?? 1;
  const maxUtmCount = summary.utmCampaigns[0]?.count ?? 1;
  const maxDayCount = Math.max(
    ...summary.eventsByDay.map((d) => d.count),
    1,
  );

  const topPaths = aggregatePathRows(summary.topPaths);
  const maxAggregatedPathCount = topPaths[0]?.count ?? 1;
  const { leadStats } = summary;

  return (
    <div className="analytics-dashboard">
      <header className="analytics-dashboard-hero">
        <div className="analytics-dashboard-hero-bar">
          <p className="analytics-dashboard-eyebrow">
            <span className="analytics-dashboard-badge">Private</span>
            <span className="analytics-dashboard-domain">www.tlccarenow.com</span>
            <span className="analytics-dashboard-refresh-note">
              Marketing site only · reload for latest stats
            </span>
          </p>
          <form action={logoutAnalytics} className="analytics-dashboard-signout-form">
            <button type="submit" className="analytics-dashboard-signout">
              Sign out
            </button>
          </form>
        </div>
        <div className="analytics-dashboard-hero-main">
          <h1 className="analytics-dashboard-title">Site analytics</h1>
          <span
            className="tlc-accent-line analytics-dashboard-accent"
            aria-hidden
          />
          <p className="analytics-dashboard-lead">
            A readable snapshot of who visited today, which pages they opened,
            and what they typed into your forms.
          </p>
        </div>
      </header>

      <details className="analytics-guide">
        <summary className="analytics-guide-summary">
          How to read this dashboard
        </summary>
        <dl className="analytics-guide-grid">
          <div>
            <dt>Online now</dt>
            <dd>Browsers with a pageview or form activity in the last few minutes.</dd>
          </div>
          <div>
            <dt>People</dt>
            <dd>Unique visitors today—one browser session each.</dd>
          </div>
          <div>
            <dt>Pages opened</dt>
            <dd>Every page load; refreshing counts again.</dd>
          </div>
          <div>
            <dt>Leads</dt>
            <dd>Form drafts and completed sends from Contact and Enterprise.</dd>
          </div>
          <div>
            <dt>App clicks</dt>
            <dd>Book CareNow and other links to app.tlccarenow.com.</dd>
          </div>
          <div>
            <dt>Bounce rate</dt>
            <dd>Sessions that viewed only one page before leaving.</dd>
          </div>
          <div>
            <dt>Campaigns</dt>
            <dd>UTM tags in the URL (utm_source, utm_medium, utm_campaign).</dd>
          </div>
        </dl>
      </details>

      {onlyAdminViews ? (
        <div className="analytics-dashboard-hint" role="status">
          <p>
            <strong>Only your admin visits so far.</strong> Open the{" "}
            <a href="/" className="analytics-dashboard-link">
              homepage
            </a>
            ,{" "}
            <a href="/enterprise" className="analytics-dashboard-link">
              Enterprise
            </a>
            , or{" "}
            <a href="/contact" className="analytics-dashboard-link">
              Contact
            </a>{" "}
            in another tab, then refresh.
          </p>
        </div>
      ) : null}

      {isEmpty && showProductionHints && !onlyAdminViews ? (
        <div className="analytics-dashboard-hint" role="status">
          <p>
            <strong>No public traffic yet.</strong> Browse the live site, then
            refresh this page.
          </p>
        </div>
      ) : null}

      {isEmpty && !showProductionHints && !onlyAdminViews ? (
        <div className="analytics-dashboard-hint" role="status">
          <p>
            Browse <strong>http://localhost:3000</strong> in another tab (not
            this admin page), then refresh.
          </p>
        </div>
      ) : null}

      <section className="analytics-today-block analytics-surface">
        <header className="analytics-surface-head">
          <h2 className="analytics-today-heading">
            <span className="analytics-today-label">Today</span>
            <span className="analytics-today-date">{summary.today.dateLabel}</span>
          </h2>
          <p className="analytics-surface-note">
            Times in {siteTimezoneDisplayLabel()} · online count updates every 30s
          </p>
        </header>
        <div className="analytics-dashboard-stats analytics-dashboard-stats--today">
          <AnalyticsActiveNow initial={summary.activeNow} />
          <article className="analytics-stat-card analytics-stat-card--today">
            <p className="analytics-stat-label">People</p>
            <p className="analytics-stat-value">{summary.today.visitors}</p>
            <p className="analytics-stat-hint">Unique sessions today</p>
          </article>
          <article className="analytics-stat-card analytics-stat-card--today">
            <p className="analytics-stat-label">Pages opened</p>
            <p className="analytics-stat-value">{summary.today.pageviews}</p>
          </article>
          <article className="analytics-stat-card analytics-stat-card--today">
            <p className="analytics-stat-label">Form steps</p>
            <p className="analytics-stat-value">{summary.today.formActions}</p>
            <p className="analytics-stat-hint">Opened, typed, or sent</p>
          </article>
        </div>
        <div className="analytics-mini-stats">
          <MiniStat
            label="App clicks today"
            value={summary.today.appClicks}
            hint="Book CareNow & app links"
          />
          <MiniStat
            label="Bounce rate"
            value={`${summary.today.sessionStats.bounceRatePct}%`}
            hint="Left after one page"
          />
          <MiniStat
            label="Pages / visit"
            value={summary.today.sessionStats.avgPagesPerVisit}
            hint="Today’s sessions"
          />
        </div>
        <div className="analytics-dashboard-grid analytics-dashboard-grid--today">
          <Panel title="Today's top pages" subtitle="Marketing pages opened today.">
            <CountList
              items={summary.today.topPages}
              emptyLabel="No page views yet today."
              maxCount={maxTodayPagesCount}
            />
          </Panel>
          <Panel title="Today's guides" subtitle="Blog articles read today.">
            <CountList
              items={summary.today.blogPages}
              emptyLabel="No blog reads yet today."
              maxCount={maxTodayBlogCount}
            />
          </Panel>
          <Panel title="Devices today" subtitle="One device label per visitor session.">
            <CountList
              items={summary.today.deviceBreakdown}
              emptyLabel="No device data yet today."
              maxCount={maxTodayDeviceCount}
            />
          </Panel>
          <Panel title="Busiest hours today" subtitle="When today's page views happened.">
            <CountList
              items={summary.today.peakHours}
              emptyLabel="No traffic yet today."
              maxCount={maxTodayPeakCount}
            />
          </Panel>
        </div>
        {summary.today.utmCampaigns.length > 0 ? (
          <Panel
            title="Campaigns today"
            subtitle="From utm_source / utm_medium / utm_campaign in the URL."
          >
            <CountList
              items={summary.today.utmCampaigns}
              emptyLabel="No campaign tags today."
              maxCount={maxTodayUtmCount}
            />
          </Panel>
        ) : null}
        <Panel
          title="People today by location"
          subtitle="Unique visitors today—not page views. City on the live site (Vercel); country only on localhost."
        >
          <CountList
            items={summary.today.visitorsByLocation}
            emptyLabel="No visitors with location data yet today."
            maxCount={maxTodayLocationCount}
          />
        </Panel>
      </section>

      <SectionGroup
        title="Traffic"
        lead="Real pages first. Bots, typos, and junk URLs are separated below."
      >
        <div className="analytics-dashboard-grid analytics-dashboard-grid--triple">
          <Panel
            title="Top pages"
            subtitle="Marketing site pages people actually opened."
          >
            <PathCountList
              items={topPaths}
              emptyLabel="No page views yet."
              maxCount={maxAggregatedPathCount}
            />
          </Panel>
          <Panel
            title="How they arrived"
            subtitle="Referring site or direct visit."
          >
            <CountList
              items={summary.topReferrers}
              emptyLabel="Everyone came directly (typed the URL or a bookmark)."
              maxCount={maxReferrerCount}
            />
          </Panel>
          <Panel
            title="All-time views by area"
            subtitle="Total page loads per location—not unique people."
          >
            <CountList
              items={summary.topLocations}
              emptyLabel="No location data yet."
              maxCount={maxLocationCount}
            />
          </Panel>
        </div>
        <div className="analytics-dashboard-grid analytics-dashboard-grid--double">
          <Panel
            title="Book CareNow / app clicks"
            subtitle="Clicks to app.tlccarenow.com from header, footer, and book page."
          >
            {summary.outboundClicks.length === 0 ? (
              <p className="analytics-panel-empty">
                No app clicks recorded yet. Click Book CareNow on the live site to
                test.
              </p>
            ) : (
              <ul className="analytics-path-list">
                {summary.outboundClicks.map((item) => (
                  <li key={item.name} className="analytics-path-row">
                    <div className="analytics-path-row-head">
                      <span className="analytics-path-name">{item.label}</span>
                      <span className="analytics-path-count tabular-nums">
                        {item.count}
                      </span>
                    </div>
                    <span className="analytics-path-bar-track" aria-hidden>
                      <span
                        className="analytics-path-bar-fill"
                        style={{
                          width: `${(item.count / maxOutboundCount) * 100}%`,
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Guide rankings (all time)" subtitle="Blog articles by total views.">
            <CountList
              items={summary.blogRankings}
              emptyLabel="No blog reads recorded yet."
              maxCount={maxBlogCount}
            />
          </Panel>
          <Panel title="Devices (all time)" subtitle="Mobile, desktop, and tablet sessions.">
            <CountList
              items={summary.deviceBreakdown}
              emptyLabel="No device data yet."
              maxCount={maxDeviceCount}
            />
          </Panel>
          <Panel title="Busiest hours (all time)" subtitle="Peak traffic times in Eastern.">
            <CountList
              items={summary.peakHours}
              emptyLabel="No hourly data yet."
              maxCount={maxPeakCount}
            />
          </Panel>
        </div>
        <div className="analytics-mini-stats analytics-mini-stats--traffic">
          <MiniStat
            label="Bounce rate (all time)"
            value={`${summary.sessionStats.bounceRatePct}%`}
            hint={`${summary.sessionStats.sessions} sessions`}
          />
          <MiniStat
            label="Pages / visit (all time)"
            value={summary.sessionStats.avgPagesPerVisit}
            hint="Average depth per session"
          />
        </div>
        {summary.utmCampaigns.length > 0 ? (
          <Panel
            title="Campaigns (all time)"
            subtitle="Traffic with UTM tags in the URL."
          >
            <CountList
              items={summary.utmCampaigns}
              emptyLabel="No campaign-tagged visits yet."
              maxCount={maxUtmCount}
            />
          </Panel>
        ) : null}
        <Panel
          title="Bots & junk URLs"
          subtitle="Not real pages—scanners, spam links, and mistyped URLs. Visitors see a 404."
        >
          <NoisePathList
            items={summary.noisePaths}
            emptyLabel="No bot or junk URL traffic recorded."
            maxCount={maxNoisePathCount}
          />
        </Panel>
      </SectionGroup>

      <SectionGroup
        title="Recent activity"
        lead="Newest first. Bot and 404 hits are muted."
      >
        <Panel title="Timeline">
          <ActivityFeed events={summary.recent} />
        </Panel>
      </SectionGroup>

      <SectionGroup
        title="Leads"
        lead="Real inquiries up top—spam is collapsed so it does not clutter the view."
      >
        <div className="analytics-leads-surface">
          <LeadsSummaryStrip leadStats={leadStats} />
          <Panel
            title="Form progress"
            subtitle="How many people started each form and finished the last step."
          >
            <FormFunnelsPanel funnels={summary.formFunnels} />
          </Panel>
          <div className="analytics-leads-grid">
            <Panel title="Drafts" subtitle="Real drafts first. Spam is tucked away below.">
              <FormEntriesPanel entries={summary.formEntries} />
            </Panel>
            <Panel
              title="Completed sends"
              subtitle="Legitimate sends first—you still get email for all of them."
            >
              <SubmittedFormsPanel submissions={submissions} />
            </Panel>
          </div>
        </div>
      </SectionGroup>

      <details className="analytics-advanced">
        <summary className="analytics-advanced-summary">
          All-time numbers &amp; technical details
        </summary>
        <div className="analytics-advanced-body">
          <div className="analytics-dashboard-stats">
            <article className="analytics-stat-card">
              <p className="analytics-stat-label">All pages opened</p>
              <p className="analytics-stat-value">{summary.pageviews}</p>
            </article>
            <article className="analytics-stat-card">
              <p className="analytics-stat-label">Different pages</p>
              <p className="analytics-stat-value">{summary.uniquePaths}</p>
            </article>
            <article className="analytics-stat-card">
              <p className="analytics-stat-label">Form steps (total)</p>
              <p className="analytics-stat-value">{summary.customEvents}</p>
            </article>
            <article className="analytics-stat-card">
              <p className="analytics-stat-label">All events</p>
              <p className="analytics-stat-value">{summary.totalEvents}</p>
            </article>
          </div>

          <Panel title="Last 14 days">
            {summary.eventsByDay.length === 0 ? (
              <p className="analytics-panel-empty">No daily data yet.</p>
            ) : (
              <ul className="analytics-day-list">
                {summary.eventsByDay.map((item) => (
                  <li key={item.date} className="analytics-day-row">
                    <span className="analytics-day-label">
                      {formatSiteDateKeyLabel(item.date)}
                    </span>
                    <span className="analytics-day-bar-track" aria-hidden>
                      <span
                        className="analytics-day-bar-fill"
                        style={{
                          width: `${(item.count / maxDayCount) * 100}%`,
                        }}
                      />
                    </span>
                    <span className="analytics-day-count tabular-nums">
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {summary.recentFieldUpdates.length > 0 ? (
            <Panel
              title="Keystroke log"
              subtitle="Every field change—usually only needed for debugging."
            >
              <div className="analytics-recent-wrap">
                <table className="analytics-recent-table analytics-recent-table--compact">
                  <thead>
                    <tr>
                      <th scope="col">When</th>
                      <th scope="col">Form</th>
                      <th scope="col">Field</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentFieldUpdates.map((event) => (
                      <tr key={event.id}>
                        <td className="analytics-recent-when tabular-nums">
                          {formatSiteWhen(event.timestamp)}
                        </td>
                        <td className="analytics-recent-muted">
                          {formatFormId(event.formId)}
                        </td>
                        <td className="analytics-recent-muted">
                          {event.field === "name"
                            ? "Name"
                            : event.field === "email"
                              ? "Email"
                              : event.field === "phone"
                                ? "Phone"
                                : event.field === "state"
                                  ? "Location"
                                  : event.field === "subject"
                                    ? "Subject"
                                    : event.field === "message"
                                      ? "Message"
                                      : event.field}
                        </td>
                        <td className="analytics-entry-value-cell">
                          {event.value || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          ) : null}

          <p className="analytics-advanced-foot">
            Data stored in {summary.storage === "postgres" ? "Neon Postgres" : summary.storage === "blob" ? "Vercel Blob" : "local JSONL"} ({summary.storage}). Admin pages are not
            tracked.
          </p>
        </div>
      </details>
    </div>
  );
}
