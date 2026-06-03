import { logoutAnalytics } from "@/app/admin/analytics/actions";
import { eventDisplayName } from "@/lib/analytics/event-catalog";
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

function pageLabel(event: AnalyticsEvent): string {
  if (event.type === "event" && event.name) {
    return eventDisplayName(event.name);
  }
  return event.pageTitle ?? "—";
}

function fieldLabel(event: AnalyticsEvent): string {
  if (!event.field) return "—";
  const labels: Record<string, string> = {
    name: "Name",
    email: "Email",
    phone: "Phone",
    state: "State / location",
    subject: "Subject",
    message: "Message",
  };
  return labels[event.field] ?? event.field;
}

function FormEntriesPanel({ entries }: { entries: FormEntrySnapshot[] }) {
  if (entries.length === 0) {
    return (
      <p className="analytics-panel-empty">
        No typed form content yet. When someone types in a field (even without
        submitting), entries appear here after about a second.
      </p>
    );
  }

  return (
    <div className="analytics-entry-grid">
      {entries.map((entry) => (
        <article key={entry.sessionId} className="analytics-entry-card">
          <header className="analytics-entry-head">
            <div>
              <h3 className="analytics-entry-title">{entry.formLabel}</h3>
              <p className="analytics-entry-meta">
                {entry.path}
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
        No completed submissions stored yet. Sent forms are saved here in
        addition to email.
      </p>
    );
  }

  return (
    <div className="analytics-entry-grid">
      {submissions.map((sub) => (
        <article key={sub.id} className="analytics-entry-card analytics-entry-card--sent">
          <header className="analytics-entry-head">
            <div>
              <h3 className="analytics-entry-title">
                {submissionSourceLabel(sub.source)}
              </h3>
              <p className="analytics-entry-meta">
                {sub.path}
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
                <dt>State / location</dt>
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
        No form activity yet. On the live site, open the contact form or
        enterprise demo popup and start typing—field contents are never stored.
      </p>
    );
  }

  return (
    <div className="analytics-funnel-grid">
      {funnels.map((funnel) => {
        const maxStep = Math.max(...funnel.steps.map((s) => s.count), 1);

        return (
          <article key={funnel.id} className="analytics-funnel-card">
            <header className="analytics-funnel-head">
              <h3 className="analytics-funnel-title">{funnel.title}</h3>
              <p className="analytics-funnel-desc">{funnel.description}</p>
              {funnel.conversionPct !== null ? (
                <p className="analytics-funnel-rate tabular-nums">
                  <strong>{funnel.conversionPct}%</strong> end-to-end
                </p>
              ) : null}
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

  return (
    <div className="analytics-dashboard">
      <div className="analytics-dashboard-toolbar">
        <form action={logoutAnalytics}>
          <button type="submit" className="analytics-dashboard-signout">
            Sign out
          </button>
        </form>
      </div>

      <header className="analytics-dashboard-header">
        <p className="analytics-dashboard-eyebrow">First-party analytics</p>
        <h1 className="analytics-dashboard-title">Marketing site insights</h1>
        <span className="tlc-accent-line analytics-dashboard-accent" aria-hidden />
        <p className="analytics-dashboard-lead">
          Public page views and form funnels for tlccarenow.com. Each row is a
          page load or action—not live “who is on the site right now.”
        </p>
        <ul className="analytics-meta-pills" aria-label="Dashboard notes">
          <li>
            <span
              className={`analytics-pill analytics-pill--storage analytics-pill--storage-${summary.storage}`}
            >
              Storage: {summary.storage}
            </span>
          </li>
          <li>
            <span className="analytics-pill">Admin excluded</span>
          </li>
          <li>
            <span className="analytics-pill">Form typing (admin only)</span>
          </li>
        </ul>

        {onlyAdminViews ? (
          <div className="analytics-dashboard-hint" role="status">
            <p>
              <strong>Only dashboard visits so far</strong> ({summary.excludedAdminViews}{" "}
              admin view{summary.excludedAdminViews === 1 ? "" : "s"} hidden).
              Open the{" "}
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
              in another tab, then refresh this page.
            </p>
          </div>
        ) : null}

        {isEmpty && showProductionHints && !onlyAdminViews ? (
          <div className="analytics-dashboard-hint" role="status">
            <p>
              <strong>No marketing traffic yet.</strong> Browse the live site,
              then refresh. Blob storage is connected (
              <strong>{summary.storage}</strong>).
            </p>
          </div>
        ) : null}

        {isEmpty && !showProductionHints && !onlyAdminViews ? (
          <div className="analytics-dashboard-hint" role="status">
            <p>
              Browse <strong>http://localhost:3000</strong> (not this admin URL)
              in another tab, then refresh.
            </p>
          </div>
        ) : null}
      </header>

      <div className="analytics-dashboard-stats">
        <article className="analytics-stat-card">
          <p className="analytics-stat-label">Page views</p>
          <p className="analytics-stat-value">{summary.pageviews}</p>
        </article>
        <article className="analytics-stat-card">
          <p className="analytics-stat-label">Unique pages</p>
          <p className="analytics-stat-value">{summary.uniquePaths}</p>
        </article>
        <article className="analytics-stat-card">
          <p className="analytics-stat-label">Form actions</p>
          <p className="analytics-stat-value">{summary.customEvents}</p>
        </article>
        <article className="analytics-stat-card">
          <p className="analytics-stat-label">Total events</p>
          <p className="analytics-stat-value">{summary.totalEvents}</p>
        </article>
      </div>

      <section className="analytics-panel analytics-panel--wide analytics-panel--entries">
        <div className="analytics-panel-head-row">
          <div>
            <h2 className="analytics-panel-title">What people typed</h2>
            <p className="analytics-panel-subtitle">
              Latest value per field, including drafts that were never submitted.
              Updates about a second after they stop typing.
            </p>
          </div>
        </div>
        <FormEntriesPanel entries={summary.formEntries} />
      </section>

      <section className="analytics-panel analytics-panel--wide">
        <div className="analytics-panel-head-row">
          <div>
            <h2 className="analytics-panel-title">Submitted forms</h2>
            <p className="analytics-panel-subtitle">
              Full messages after someone clicks send (also emailed to your
              inbox).
            </p>
          </div>
        </div>
        <SubmittedFormsPanel submissions={submissions} />
      </section>

      {summary.recentFieldUpdates.length > 0 ? (
        <section className="analytics-panel analytics-panel--wide">
          <h2 className="analytics-panel-title">Field-by-field log</h2>
          <div className="analytics-recent-wrap">
            <table className="analytics-recent-table analytics-recent-table--compact">
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Form</th>
                  <th scope="col">Field</th>
                  <th scope="col">Value</th>
                  <th scope="col">Page</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentFieldUpdates.map((event) => (
                  <tr key={event.id}>
                    <td className="analytics-recent-when tabular-nums">
                      {formatWhen(event.timestamp)}
                    </td>
                    <td className="analytics-recent-muted">
                      {event.formId ?? "—"}
                    </td>
                    <td className="analytics-recent-muted">
                      {fieldLabel(event)}
                    </td>
                    <td className="analytics-entry-value-cell">
                      {event.value || "—"}
                    </td>
                    <td className="analytics-recent-path">{event.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <div className="analytics-dashboard-grid analytics-dashboard-grid--triple">
        <section className="analytics-panel">
          <h2 className="analytics-panel-title">Top pages</h2>
          {summary.topPaths.length === 0 ? (
            <p className="analytics-panel-empty">
              No public page views yet.
            </p>
          ) : (
            <ul className="analytics-path-list">
              {summary.topPaths.map((item) => (
                <li key={item.path} className="analytics-path-row">
                  <div className="analytics-path-row-head">
                    <span className="analytics-path-name">{item.path}</span>
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
        </section>

        <section className="analytics-panel">
          <h2 className="analytics-panel-title">Top referrers</h2>
          <CountList
            items={summary.topReferrers}
            emptyLabel="No referrer data yet (Direct = typed URL or bookmark)."
            maxCount={maxReferrerCount}
          />
        </section>

        <section className="analytics-panel">
          <h2 className="analytics-panel-title">Countries</h2>
          <CountList
            items={summary.topCountries}
            emptyLabel="No location data yet."
            maxCount={maxCountryCount}
          />
        </section>
      </div>

      <div className="analytics-dashboard-grid">
        <section className="analytics-panel">
          <h2 className="analytics-panel-title">Last 14 days</h2>
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
        </section>
      </div>

      <section className="analytics-panel analytics-panel--wide analytics-panel--forms">
        <div className="analytics-panel-head-row">
          <div>
            <h2 className="analytics-panel-title">Forms &amp; conversions</h2>
            <p className="analytics-panel-subtitle">
              Contact and enterprise demo—started vs submitted only.
            </p>
          </div>
        </div>
        <FormFunnelsPanel funnels={summary.formFunnels} />
      </section>

      {summary.topActions.length > 0 ? (
        <section className="analytics-panel analytics-panel--wide">
          <h2 className="analytics-panel-title">All actions</h2>
          <ul className="analytics-action-list">
            {summary.topActions.map((action) => (
              <li key={action.name} className="analytics-action-row">
                <span className="analytics-action-label">{action.label}</span>
                <span className="analytics-action-count tabular-nums">
                  {action.count}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {summary.recentFormEvents.length > 0 ? (
        <section className="analytics-panel analytics-panel--wide">
          <h2 className="analytics-panel-title">Recent form activity</h2>
          <div className="analytics-recent-wrap">
            <table className="analytics-recent-table analytics-recent-table--compact">
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Action</th>
                  <th scope="col">Page</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentFormEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="analytics-recent-when tabular-nums">
                      {formatWhen(event.timestamp)}
                    </td>
                    <td>
                      <span className="analytics-type-pill analytics-type-pill--event">
                        {event.name ? eventDisplayName(event.name) : "event"}
                      </span>
                    </td>
                    <td className="analytics-recent-path">{event.path}</td>
                    <td className="analytics-recent-muted">
                      {formatCountry(event.country)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="analytics-panel analytics-panel--wide">
        <h2 className="analytics-panel-title">Recent visits</h2>
        {summary.recent.length === 0 ? (
          <p className="analytics-panel-empty">
            No public visits recorded yet.
          </p>
        ) : (
          <div className="analytics-recent-wrap">
            <table className="analytics-recent-table">
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Type</th>
                  <th scope="col">Page</th>
                  <th scope="col">Title</th>
                  <th scope="col">Referrer</th>
                  <th scope="col">Country</th>
                  <th scope="col">Browser</th>
                </tr>
              </thead>
              <tbody>
                {summary.recent.map((event) => (
                  <tr key={event.id}>
                    <td className="analytics-recent-when tabular-nums">
                      {formatWhen(event.timestamp)}
                    </td>
                    <td>
                      <span
                        className={`analytics-type-pill analytics-type-pill--${event.type}`}
                      >
                        {event.type}
                      </span>
                    </td>
                    <td className="analytics-recent-path">{event.path}</td>
                    <td className="analytics-recent-title">{pageLabel(event)}</td>
                    <td className="analytics-recent-muted">
                      {formatReferrer(event.referrer)}
                    </td>
                    <td className="analytics-recent-muted">
                      {formatCountry(event.country)}
                    </td>
                    <td className="analytics-recent-muted">
                      {formatBrowser(event.userAgent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
