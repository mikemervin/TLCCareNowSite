import Link from "next/link";
import { CommunityFeatureIcon } from "@/components/CommunityFeatureIcon";
import { ButtonLink } from "@/components/ui/Button";
import { communityFeatures } from "@/lib/product";

export function ForCommunitiesSection() {
  return (
    <section className="communities-section tlc-section" id="for-communities">
      <div className="communities-section-glow" aria-hidden />
      <div className="tlc-container communities-inner">
        <header className="communities-hero">
          <p className="communities-eyebrow">For operators &amp; care teams</p>
          <h2 className="communities-title">
            One app for the teams who run care
          </h2>
          <span className="tlc-accent-line communities-accent" aria-hidden />
          <p className="communities-intro">
            Bookings, schedules, messaging, and reporting live in one place—so
            operators, supervisors, and care staff are not juggling separate
            tools.
          </p>
          <ul className="communities-audience" aria-label="Who this is for">
            <li>Operators</li>
            <li>Supervisors</li>
            <li>Care staff</li>
          </ul>
        </header>

        <aside className="communities-enterprise-band">
          <div className="communities-enterprise-copy">
            <p className="communities-enterprise-label">Multiple communities</p>
            <h3 className="communities-enterprise-title">Enterprise Solutions</h3>
            <p className="communities-enterprise-text">
              Screenshots, dashboards, and how to{" "}
              <Link href="/enterprise" className="communities-enterprise-link">
                request a demo
              </Link>
              .
            </p>
          </div>
          <ButtonLink
            href="/enterprise"
            size="md"
            className="communities-cta-btn"
          >
            View Enterprise Solutions
          </ButtonLink>
        </aside>

        <div className="communities-capabilities">
          <h3 className="communities-capabilities-heading">
            What your team can do
          </h3>
          <p className="communities-capabilities-lead">
            Four core tools—each built for day-to-day operations.
          </p>
          <ul className="communities-grid">
            {communityFeatures.map((feature) => (
              <li key={feature.title}>
                <article className="communities-card">
                  <span className="communities-card-icon" aria-hidden>
                    <CommunityFeatureIcon icon={feature.icon} />
                  </span>
                  <h4 className="communities-card-title">{feature.title}</h4>
                  <p className="communities-card-text">{feature.summary}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
