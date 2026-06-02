import { FeatureIcon } from "@/components/FeatureIcon";
import { FeaturesCarousel } from "@/components/FeaturesCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { residentFeatures } from "@/lib/product";

export function FeaturesSection() {
  return (
    <section className="features-section tlc-section" id="features">
      <div className="tlc-container">
        <SectionHeading
          align="center"
          className="features-header"
          subtitle="Book care, pay securely, and stay connected—all in the TLC CareNow app."
        >
          Features
        </SectionHeading>

        <FeaturesCarousel />

        <div className="features-tools-block">
          <SectionHeading
            align="center"
            className="features-tools-header"
            subtitle="Scheduling, payments, visits, and community updates in one place."
          >
            Day-to-day tools
          </SectionHeading>

          <div className="features-quick-panel">
          <ul className="features-quick-grid">
            {residentFeatures.map((feature) => (
              <li key={feature.title}>
                <article className="features-quick-card">
                  <span className="features-quick-icon" aria-hidden>
                    <FeatureIcon icon={feature.icon} />
                  </span>
                  <div className="features-quick-body">
                    <h4 className="features-quick-title">{feature.title}</h4>
                    <p className="features-quick-text">{feature.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
