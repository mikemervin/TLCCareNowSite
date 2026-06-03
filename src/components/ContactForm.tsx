"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/client";
import { useFormFieldAnalytics } from "@/lib/analytics/use-form-field-analytics";
import { useFormStartedAnalytics } from "@/lib/analytics/use-form-analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text" as const,
    required: true,
    placeholder: "Jane Smith",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    required: true,
    placeholder: "jane@community.org",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: false,
    placeholder: "(555) 123-4567",
    autoComplete: "tel",
    optional: true,
  },
  {
    name: "state",
    label: "State",
    type: "text" as const,
    required: false,
    placeholder: "IL",
    autoComplete: "address-level1",
    optional: true,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text" as const,
    required: false,
    placeholder: "Campus partnership, pricing, support…",
    autoComplete: "off",
    fullWidth: true,
    optional: true,
  },
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const onFormStarted = useFormStartedAnalytics("contact_form_started", pathname);
  const trackField = useFormFieldAnalytics("contact", pathname);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          result.error ||
            `Something went wrong. Please email us at ${site.email}.`,
        );
        return;
      }

      setStatus("success");
      trackEvent("contact_form_submitted", { path: pathname });
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        `Something went wrong. Please email us at ${site.email}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-status contact-form-status--success" role="status">
        <p className="contact-form-status-title">Message sent</p>
        <p className="contact-form-status-text">
          Thanks for reaching out. Our team will get back to you as soon as we
          can.
        </p>
        <button
          type="button"
          className="contact-form-status-reset"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      onFocusCapture={onFormStarted}
      noValidate
    >
      <div className="contact-form-grid">
        {fields.map((field) => {
          const inputId = `contact-${field.name}`;

          return (
            <label
              key={field.name}
              htmlFor={inputId}
              className={`contact-form-field${"fullWidth" in field && field.fullWidth ? " contact-form-field--full" : ""}`}
            >
              <span className="contact-form-label">
                {field.label}
                {field.required ? (
                  <span className="contact-form-required" aria-hidden>
                    *
                  </span>
                ) : null}
                {"optional" in field && field.optional ? (
                  <span className="contact-form-optional">optional</span>
                ) : null}
              </span>
              <input
                id={inputId}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="contact-form-input"
                disabled={status === "submitting"}
                onChange={(event) =>
                  trackField(field.name, event.currentTarget.value)
                }
              />
            </label>
          );
        })}
      </div>

      <label htmlFor="contact-message" className="contact-form-field">
        <span className="contact-form-label">
          Message
          <span className="contact-form-optional">optional</span>
        </span>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us how we can help—community name, timeline, or questions."
          className="contact-form-input contact-form-input--textarea"
          disabled={status === "submitting"}
          onChange={(event) => trackField("message", event.currentTarget.value)}
        />
      </label>

      <input type="hidden" name="form_source" value="contact" />
      <input type="hidden" name="form_path" value={pathname} />

      <div className="contact-form-honeypot" aria-hidden="true">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p className="contact-form-status contact-form-status--error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="contact-form-footer">
        <Button
          type="submit"
          size="lg"
          className="contact-form-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="contact-form-alt">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="contact-form-alt-link">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
