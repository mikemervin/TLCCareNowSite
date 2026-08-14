import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function ForCommunitiesSection() {
  return (
    <section className="communities-section tlc-section" id="for-communities">
      <div className="communities-section-glow" aria-hidden />
      <div className="tlc-container communities-inner communities-inner--band">
        <header className="communities-hero">
          <p className="communities-eyebrow">For communities</p>
          <h2 className="communities-title">
            Partner with CareNow on your campus
          </h2>
          <span className="tlc-accent-line communities-accent" aria-hidden />
          <p className="communities-intro">
            Offer residents and families flexible, on-demand care—while our team
            manages visits, schedules, and staffing in one place. A modern
            alternative to outside agencies and scattered spreadsheets.
          </p>
        </header>

        <div className="communities-band-actions">
          <ButtonLink
            href="/contact"
            size="md"
            className="communities-cta-btn"
          >
            Talk with our team
          </ButtonLink>
          <Link href="/enterprise" className="communities-band-link">
            See Enterprise Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
