import { FeatureIcon } from "@/components/FeatureIcon";
import { FeaturesCarousel } from "@/components/FeaturesCarousel";
import { residentFeatures } from "@/lib/product";

export function FeaturesSection() {
  return (
    <section className="features-section tlc-section" id="features">
      <div className="tlc-container">
        <header className="features-header">
          <h2 className="features-title">Features</h2>
          <span className="tlc-accent-line mx-auto" aria-hidden />
          <p className="features-intro">
            Book care, pay securely, and stay connected—all in the TLC CareNow
            app.
          </p>
        </header>

        <FeaturesCarousel />

        <div className="features-quick-panel">
          <ul className="features-quick-grid">
            {residentFeatures.map((feature) => (
              <li key={feature.title} className="features-quick-card">
                <span className="features-quick-icon" aria-hidden>
                  <FeatureIcon icon={feature.icon} />
                </span>
                <h3 className="features-quick-title">{feature.title}</h3>
                <p className="features-quick-text">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
