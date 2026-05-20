"use client";

import { Button } from "@/components/ui/Button";

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

export function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
        />
      </label>

      <div className="contact-form-footer">
        <p className="get-in-touch-note">
          We look forward to hearing from you!
        </p>
        <div className="contact-form-actions">
          <Button type="submit" size="md" className="contact-form-submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
