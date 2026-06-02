import type { AnalyticsSummary } from "@/lib/analytics/types";

type AnalyticsDashboardProps = {
  summary: AnalyticsSummary;
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

export function AnalyticsDashboard({ summary }: AnalyticsDashboardProps) {
  const maxPathCount = summary.topPaths[0]?.count ?? 1;
  const maxDayCount = Math.max(
    ...summary.eventsByDay.map((d) => d.count),
    1,
  );

  return (
    <div className="analytics-dashboard">
      <header className="analytics-dashboard-header">
        <p className="analytics-dashboard-eyebrow">First-party analytics</p>
        <h1 className="analytics-dashboard-title">Site traffic</h1>
        <span className="tlc-accent-line analytics-dashboard-accent" aria-hidden />
        <p className="analytics-dashboard-lead">
          Page views and events collected on this marketing site.
        </p>
        <p className="analytics-dashboard-meta">
          Storage: <strong>{summary.storage}</strong>
        </p>
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
          <p className="analytics-stat-label">Custom events</p>
          <p className="analytics-stat-value">{summary.customEvents}</p>
        </article>
        <article className="analytics-stat-card">
          <p className="analytics-stat-label">Total events</p>
          <p className="analytics-stat-value">{summary.totalEvents}</p>
        </article>
      </div>

      <div className="analytics-dashboard-grid">
        <section className="analytics-panel">
          <h2 className="analytics-panel-title">Top pages</h2>
          {summary.topPaths.length === 0 ? (
            <p className="analytics-panel-empty">
              No page views yet. Browse the live site, then refresh.
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

      <section className="analytics-panel analytics-panel--wide">
        <h2 className="analytics-panel-title">Recent activity</h2>
        {summary.recent.length === 0 ? (
          <p className="analytics-panel-empty">No events recorded yet.</p>
        ) : (
          <div className="analytics-recent-wrap">
            <table className="analytics-recent-table">
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Type</th>
                  <th scope="col">Page</th>
                  <th scope="col">Detail</th>
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
                    <td className="analytics-recent-detail">
                      {event.name ?? event.country ?? "—"}
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
