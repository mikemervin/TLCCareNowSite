/** IANA timezone for analytics dates and times (default: Eastern — TeamLife / FL). */
export function getSiteTimezone(): string {
  const configured = process.env.SITE_TIMEZONE?.trim();
  if (configured) return configured;
  return "America/New_York";
}

/** Short label for the dashboard, e.g. "EDT" or "EST". */
export function siteTimezoneShortLabel(when = new Date()): string {
  try {
    const part = new Intl.DateTimeFormat("en-US", {
      timeZone: getSiteTimezone(),
      timeZoneName: "short",
    })
      .formatToParts(when)
      .find((p) => p.type === "timeZoneName");
    return part?.value ?? "local";
  } catch {
    return "local";
  }
}

export function siteTimezoneDisplayLabel(): string {
  const tz = getSiteTimezone();
  if (tz === "America/New_York") return "Eastern (ET)";
  if (tz === "America/Chicago") return "Central (CT)";
  if (tz === "America/Denver") return "Mountain (MT)";
  if (tz === "America/Los_Angeles") return "Pacific (PT)";
  return siteTimezoneShortLabel();
}
