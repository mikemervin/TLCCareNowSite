"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text" as const,
    required: true,
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    required: true,
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: false,
    placeholder: "Optional",
    autoComplete: "tel",
    optional: true,
  },
  {
    name: "state",
    label: "State",
    type: "text" as const,
    required: false,
    placeholder: "e.g. IL",
    autoComplete: "address-level1",
    optional: true,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text" as const,
    required: false,
    placeholder: "How can we help?",
    autoComplete: "off",
    fullWidth: true,
    optional: true,
  },
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                  <span className="contact-form-optional">Optional</span>
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
              />
            </label>
          );
        })}
      </div>

      <label htmlFor="contact-message" className="contact-form-field">
        <span className="contact-form-label">
          Message
          <span className="contact-form-optional">Optional</span>
        </span>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Type your message here..."
          className="contact-form-input contact-form-input--textarea"
          disabled={status === "submitting"}
        />
      </label>

      {/* Honeypot — hidden from people, not from bots */}
      <label className="contact-form-honeypot" aria-hidden>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {status === "error" ? (
        <p className="contact-form-status contact-form-status--error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="contact-form-footer">
        <p className="get-in-touch-note">
          We look forward to hearing from you!
        </p>
        <div className="contact-form-actions">
          <Button
            type="submit"
            size="md"
            className="contact-form-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
