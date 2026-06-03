import type { ReactNode } from "react";
import { AnalyticsActiveNow } from "@/components/AnalyticsActiveNow";
import { logoutAnalytics } from "@/app/admin/analytics/actions";
import { eventDisplayName } from "@/lib/analytics/event-catalog";
import { analyticsPageLabel } from "@/lib/analytics/page-labels";
import {
  formatBrowser,
  formatCountry,
  formatReferrer,
} from "@/lib/analytics/format";
import { submissionSourceLabel } from "@/lib/analytics/submissions-types";
import type { FormSubmission } from "@/lib/analytics/submissions-types";
import type {
  AnalyticsEvent,
  AnalyticsSummary,
  CountRow,
  FormEntrySnapshot,
  FormFunnelSummary,
} from "@/lib/analytics/types";

type AnalyticsDashboardProps = {
  summary: AnalyticsSummary;
  submissions: FormSubmission[];
  showProductionHints?: boolean;
};

function formatPagePath(path: string): string {
  return analyticsPageLabel(path);
}

function activityMetaLine(event: AnalyticsEvent): string {
  const parts: string[] = [];
  if (event.type !== "pageview") {
    parts.push(formatPagePath(event.path));
  }
  const country = formatCountry(event.country);
  if (country && country !== "—") parts.push(country);
  parts.push(formatBrowser(event.userAgent));
  return parts.join(" · ");
}

function formatDay(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatWhen(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function describeActivity(event: AnalyticsEvent): string {
  if (event.type === "pageview") {
    return `Viewed ${formatPagePath(event.path)}`;
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

function FormEntriesPanel({ entries }: { entries: FormEntrySnapshot[] }) {
  if (entries.length === 0) {
    return (
      <p className="analytics-panel-empty">
        No one has typed into a form yet. Partial entries show up here even if
        they never click Send.
      </p>
    );
  }

  return (
    <div className="analytics-entry-grid">
      {entries.map((entry) => (
        <article key={entry.sessionId} className="analytics-entry-card">
          <span className="analytics-entry-status analytics-entry-status--draft">
            Draft — not sent
          </span>
          <header className="analytics-entry-head">
            <div>
              <h4 className="analytics-entry-title">{entry.formLabel}</h4>
              <p className="analytics-entry-meta">
                {formatPagePath(entry.path)}
                {entry.country ? ` · ${formatCountry(entry.country)}` : ""}
              </p>
            </div>
            <time className="analytics-entry-time tabular-nums">
              {formatWhen(entry.updatedAt)}
            </time>
          </header>
          <dl className="analytics-entry-fields">
            {entry.fields.map((field) => (
              <div key={field.field} className="analytics-entry-field">
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function SubmittedFormsPanel({ submissions }: { submissions: FormSubmission[] }) {
  if (submissions.length === 0) {
    return (
      <p className="analytics-panel-empty">
        No stored submissions yet. When someone clicks Send, a copy appears here
        and you still get email via Resend.
      </p>
    );
  }

  return (
    <div className="analytics-entry-grid">
      {submissions.map((sub) => (
        <article
          key={sub.id}
          className="analytics-entry-card analytics-entry-card--sent"
        >
          <span className="analytics-entry-status analytics-entry-status--sent">
            Sent
          </span>
          <header className="analytics-entry-head">
            <div>
              <h4 className="analytics-entry-title">
                {submissionSourceLabel(sub.source)}
              </h4>
              <p className="analytics-entry-meta">
                {formatPagePath(sub.path)}
                {sub.country ? ` · ${formatCountry(sub.country)}` : ""}
              </p>
            </div>
            <time className="analytics-entry-time tabular-nums">
              {formatWhen(sub.timestamp)}
            </time>
          </header>
          <dl className="analytics-entry-fields">
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
            {sub.message ? (
              <div className="analytics-entry-field">
                <dt>Message</dt>
                <dd>{sub.message}</dd>
              </div>
            ) : null}
          </dl>
        </article>
      ))}
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
        const maxStep = Math.max(...funnel.steps.map((s) => s.count), 1);
        const lastStep = funnel.steps[funnel.steps.length - 1];
        const firstStep = funnel.steps[0];
        const conversionPct =
          firstStep && lastStep && firstStep.count > 0
            ? Math.round((lastStep.count / firstStep.count) * 100)
            : null;

        return (
          <article key={funnel.id} className="analytics-funnel-card">
            <header className="analytics-funnel-head">
              <h4 className="analytics-funnel-title">{funnel.title}</h4>
              {conversionPct !== null && lastStep.count > 0 ? (
                <p className="analytics-funnel-rate">
                  <strong>{conversionPct}%</strong> finished the last step
                </p>
              ) : (
                <p className="analytics-funnel-rate analytics-funnel-rate--muted">
                  No completed sends yet
                </p>
              )}
            </header>
            <ol className="analytics-funnel-steps">
              {funnel.steps.map((step, index) => (
                <li key={step.label} className="analytics-funnel-step">
                  <div className="analytics-funnel-step-head">
                    <span className="analytics-funnel-step-index">
                      {index + 1}
                    </span>
                    <span className="analytics-funnel-step-label">
                      {step.label}
                    </span>
                    <span className="analytics-funnel-step-count tabular-nums">
                      {step.count}
                    </span>
                  </div>
                  <span className="analytics-path-bar-track" aria-hidden>
                    <span
                      className="analytics-path-bar-fill analytics-path-bar-fill--funnel"
                      style={{
                        width: `${(step.count / maxStep) * 100}%`,
                      }}
                    />
                  </span>
                </li>
              ))}
            </ol>
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
      {events.slice(0, 25).map((event) => (
        <li key={event.id} className="analytics-activity-item">
          <div className="analytics-activity-main">
            <p className="analytics-activity-what">{describeActivity(event)}</p>
            <p className="analytics-activity-meta">{activityMetaLine(event)}</p>
          </div>
          <time className="analytics-activity-time tabular-nums">
            {formatWhen(event.timestamp)}
          </time>
        </li>
      ))}
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
  const maxPathCount = summary.topPaths[0]?.count ?? 1;
  const maxReferrerCount = summary.topReferrers[0]?.count ?? 1;
  const maxCountryCount = summary.topCountries[0]?.count ?? 1;
  const maxDayCount = Math.max(
    ...summary.eventsByDay.map((d) => d.count),
    1,
  );

  const topPaths = summary.topPaths.map((item) => ({
    label: formatPagePath(item.path),
    count: item.count,
  }));

  return (
    <div className="analytics-dashboard">
      <header className="analytics-dashboard-hero">
        <div className="analytics-dashboard-hero-bar">
          <p className="analytics-dashboard-eyebrow">
            <span className="analytics-dashboard-badge">Private</span>
            <span className="analytics-dashboard-domain">tlccarenow.com</span>
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
            Visitors, form drafts, and submissions for your marketing site.
            <span className="analytics-dashboard-lead-note">
              Online now refreshes every 30 seconds. Other stats update when
              someone opens a page or uses a form.
            </span>
          </p>
        </div>
      </header>

      <aside className="analytics-guide" aria-label="How to read this page">
        <h2 className="analytics-guide-title">Quick guide</h2>
        <ul className="analytics-guide-list">
          <li>
            <strong>Online now</strong> — browsers active on the site in the last
            few minutes (not exact headcount).
          </li>
          <li>
            <strong>People</strong> — best guess at unique visitors (one browser
            session).
          </li>
          <li>
            <strong>Pages opened</strong> — each time a page loads (refresh =
            another view).
          </li>
          <li>
            <strong>Leads</strong> — what they typed (drafts) and what they sent.
          </li>
        </ul>
      </aside>

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

      <section className="analytics-today-block">
        <h2 className="analytics-today-heading">
          <span className="analytics-today-label">Today</span>
          <span className="analytics-today-date">{summary.today.dateLabel}</span>
          <span className="analytics-today-tz">Central time</span>
        </h2>
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
      </section>

      <SectionGroup
        title="Leads"
        lead="Form content from the contact form and enterprise demo popup."
      >
        <Panel
          title="Drafts (typed but not sent)"
          subtitle="Updates about one second after someone stops typing in a field."
        >
          <FormEntriesPanel entries={summary.formEntries} />
        </Panel>
        <Panel
          title="Completed sends"
          subtitle="Saved when Send succeeds—you also receive email."
        >
          <SubmittedFormsPanel submissions={submissions} />
        </Panel>
        <Panel title="Form progress summary">
          <FormFunnelsPanel funnels={summary.formFunnels} />
        </Panel>
      </SectionGroup>

      <SectionGroup
        title="Traffic"
        lead="Which pages people opened and where they came from."
      >
        <div className="analytics-dashboard-grid analytics-dashboard-grid--triple">
          <Panel title="Pages visited">
            {topPaths.length === 0 ? (
              <p className="analytics-panel-empty">No page views yet.</p>
            ) : (
              <ul className="analytics-path-list">
                {topPaths.map((item) => (
                  <li key={item.label} className="analytics-path-row">
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
                          width: `${(item.count / maxPathCount) * 100}%`,
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="How they arrived">
            <CountList
              items={summary.topReferrers}
              emptyLabel="Everyone came directly (typed the URL or a bookmark)."
              maxCount={maxReferrerCount}
            />
          </Panel>
          <Panel title="Country">
            <CountList
              items={summary.topCountries}
              emptyLabel="No location data yet."
              maxCount={maxCountryCount}
            />
          </Panel>
        </div>
      </SectionGroup>

      <SectionGroup title="Recent activity" lead="Latest actions, newest first.">
        <Panel title="Timeline">
          <ActivityFeed events={summary.recent} />
        </Panel>
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
                      {formatDay(item.date)}
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
                          {formatWhen(event.timestamp)}
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
            Data stored in Vercel Blob ({summary.storage}). Admin pages are not
            tracked.
          </p>
        </div>
      </details>
    </div>
  );
}
