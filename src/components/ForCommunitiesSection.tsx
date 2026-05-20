import { CommunityFeatureIcon } from "@/components/CommunityFeatureIcon";
import { communityFeatures } from "@/lib/product";

export function ForCommunitiesSection() {
  return (
    <section className="communities-section tlc-section" id="for-communities">
      <div className="tlc-container">
        <div className="communities-layout">
          <header className="communities-header">
            <p className="communities-eyebrow">For operators &amp; care teams</p>
            <h2 className="communities-title">Built for communities and the teams who run care</h2>
            <span className="tlc-accent-line" aria-hidden />
            <p className="communities-intro">
              TLC CareNow gives community leaders, supervisors, and care professionals
              one place to manage resident bookings, daily workflows, and
              operator reporting—without juggling separate tools.
            </p>

            <ul className="communities-audience" aria-label="Who this is for">
              <li>Community operators</li>
              <li>Supervisors</li>
              <li>Care professionals</li>
            </ul>
          </header>

          <ul className="communities-grid">
            {communityFeatures.map((feature) => (
              <li key={feature.title} className="communities-card">
                <span className="communities-card-icon" aria-hidden>
                  <CommunityFeatureIcon icon={feature.icon} />
                </span>
                <h3 className="communities-card-title">{feature.title}</h3>
                <p className="communities-card-text">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
