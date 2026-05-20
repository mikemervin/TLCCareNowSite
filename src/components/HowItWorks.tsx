import { HowStepIcon } from "@/components/HowStepIcon";
import { howItWorksSteps } from "@/lib/product";

export function HowItWorks() {
  return (
    <section className="how-it-works tlc-section" id="how-it-works">
      <div className="tlc-container">
        <header className="how-it-works-header">
          <h2 className="how-it-works-title">How it works</h2>
          <span className="tlc-accent-line mx-auto" aria-hidden />
          <p className="how-it-works-intro">
            Use TLC CareNow on your phone or computer—sign in, book care, and pay
            in a few simple steps.
          </p>
        </header>

        <ol className="how-it-works-steps">
          {howItWorksSteps.map((item, index) => (
            <li key={item.step} className="how-step">
              <div className="how-step-marker" aria-hidden>
                <span className="how-step-number">{item.step}</span>
                <span className="how-step-icon">
                  <HowStepIcon icon={item.icon} />
                </span>
                {index < howItWorksSteps.length - 1 ? (
                  <span className="how-step-connector" />
                ) : null}
              </div>
              <div className="how-step-body">
                <h3 className="how-step-title">{item.title}</h3>
                <p className="how-step-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
