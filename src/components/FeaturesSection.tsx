import { FeatureIcon } from "@/components/FeatureIcon";
import { FeaturesCarousel } from "@/components/FeaturesCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { residentFeatures } from "@/lib/product";

export function FeaturesSection() {
  return (
    <>
      <section className="features-section tlc-section" id="features">
        <div className="tlc-container">
          <p className="tlc-audience-eyebrow tlc-audience-eyebrow--center">
            For residents &amp; families
          </p>
          <SectionHeading
            align="center"
            className="features-header"
            subtitle="Everything residents and families need to book visits, pay, and stay in the loop—right in TLC CareNow."
          >
            What you can do in the app
          </SectionHeading>

          <FeaturesCarousel />
        </div>
      </section>

      <section className="features-tools-section tlc-section" aria-labelledby="day-to-day-tools-heading">
        <div className="tlc-container">
          <SectionHeading
            align="center"
            className="features-tools-header"
            as="h2"
            subtitle="The everyday pieces that make booking and following care simple—from the first visit to the next one."
          >
            <span id="day-to-day-tools-heading">Day-to-day tools</span>
          </SectionHeading>

          <ul className="features-quick-grid">
            {residentFeatures.map((feature) => (
              <li key={feature.title}>
                <article className="features-quick-card">
                  <span className="features-quick-icon" aria-hidden>
                    <FeatureIcon icon={feature.icon} />
                  </span>
                  <div className="features-quick-body">
                    <h3 className="features-quick-title">{feature.title}</h3>
                    <p className="features-quick-text">{feature.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
