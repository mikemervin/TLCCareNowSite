import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

type GetInTouchSectionProps = {
  className?: string;
};

function ContactFormIcon() {
  return (
    <svg
      className="get-in-touch-form-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function GetInTouchSection({ className = "" }: GetInTouchSectionProps) {
  return (
    <section id="contact" className={`get-in-touch ${className}`.trim()}>
      <div className="tlc-container get-in-touch-inner">
        <SectionHeading
          align="center"
          className="get-in-touch-heading"
          subtitle="Tell us about your community or ask a question about TLC CareNow—we'll get back to you soon."
        >
          Get In Touch
        </SectionHeading>

        <div className="get-in-touch-card">
          <header className="get-in-touch-card-head">
            <span className="get-in-touch-form-icon" aria-hidden>
              <ContactFormIcon />
            </span>
            <div className="get-in-touch-panel-head">
              <h3 className="get-in-touch-form-title">Send us a message</h3>
              <p className="get-in-touch-form-lead">
                We usually reply within one business day. Name and email are
                required.
              </p>
            </div>
          </header>

          <div className="get-in-touch-panel">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
