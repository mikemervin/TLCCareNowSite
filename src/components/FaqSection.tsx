import type { FaqItem } from "@/lib/faq";

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
};

function FaqChevron() {
  return (
    <svg
      className="faq-chevron"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Common questions",
  subtitle = "Straight answers about booking visits, who can schedule, and how CareNow fits independent living.",
  id = "faq",
  className = "",
}: FaqSectionProps) {
  return (
    <section id={id} className={`faq-section tlc-section ${className}`.trim()}>
      <div className="tlc-container faq-section-inner">
        <header className="faq-section-header">
          <p className="tlc-audience-eyebrow tlc-audience-eyebrow--center">
            {eyebrow}
          </p>
          <h2 className="faq-section-title">{title}</h2>
          <span className="tlc-accent-line mx-auto" aria-hidden />
          <p className="faq-section-intro">{subtitle}</p>
        </header>

        <div className="faq-list">
          {items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-summary">
                <span className="faq-summary-text">{item.question}</span>
                <FaqChevron />
              </summary>
              <div className="faq-answer-wrap">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
