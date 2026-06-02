"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AnalyticsUnlockForm({ error }: { error?: boolean }) {
  const router = useRouter();
  const [key, setKey] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) return;
    router.push(`/admin/analytics?key=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="analytics-unlock">
      <p className="analytics-unlock-eyebrow">Private</p>
      <h1 className="analytics-unlock-title">Analytics dashboard</h1>
      <span className="tlc-accent-line analytics-unlock-accent" aria-hidden />
      <p className="analytics-unlock-text">
        Enter your admin secret to view first-party traffic for this site.
      </p>
      {error ? (
        <p className="analytics-unlock-error" role="alert">
          That key didn&apos;t work. Check{" "}
          <code className="analytics-unlock-code">ANALYTICS_ADMIN_SECRET</code>{" "}
          in your env settings.
        </p>
      ) : null}
      <form className="analytics-unlock-form" onSubmit={handleSubmit}>
        <label htmlFor="analytics-key" className="analytics-unlock-label">
          Admin secret
        </label>
        <input
          id="analytics-key"
          type="password"
          name="key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="analytics-unlock-input"
          placeholder="Paste your secret"
          autoComplete="off"
          required
        />
        <Button type="submit" size="md" className="analytics-unlock-submit">
          View dashboard
        </Button>
      </form>
    </div>
  );
}
