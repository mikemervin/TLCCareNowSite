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
  },
  {
    name: "subject",
    label: "Subject",
    type: "text" as const,
    required: false,
    placeholder: "How can we help?",
    autoComplete: "off",
    fullWidth: true,
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
        {fields.map((field) => (
          <label
            key={field.name}
            className={`contact-form-field${"fullWidth" in field && field.fullWidth ? " contact-form-field--full" : ""}`}
          >
            <span className="contact-form-label">{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              className="tlc-input"
            />
          </label>
        ))}
      </div>

      <label className="contact-form-field contact-form-field--full">
        <span className="contact-form-label">Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Type your message here..."
          className="tlc-input tlc-input--textarea"
        />
      </label>

      <div className="contact-form-actions">
        <Button type="submit" size="md">
          Submit
        </Button>
      </div>
    </form>
  );
}
