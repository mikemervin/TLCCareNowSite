import Image from "next/image";
import { HowStepIcon } from "@/components/HowStepIcon";
import { howItWorksSteps } from "@/lib/product";

export function HowItWorks() {
  return (
    <section className="how-it-works tlc-section" id="how-it-works">
      <div className="tlc-container">
        <header className="how-it-works-header">
          <p className="tlc-audience-eyebrow">For residents &amp; families</p>
          <h2 className="how-it-works-title">How it works</h2>
          <span className="tlc-accent-line mx-auto" aria-hidden />
          <p className="how-it-works-intro">
            TLC CareNow is the app residents and families use to book on-demand
            care at their independent living community. Sign in on your phone or
            computer, choose the visits you need, pay securely, and track
            everything in one place—in a few simple steps.
          </p>
        </header>

        <ol className="how-it-works-steps">
          {howItWorksSteps.map((item, index) => (
            <li
              key={item.step}
              className={`how-step${item.image ? " how-step--visual" : ""}`}
            >
              {item.image ? (
                <>
                  <div className="how-step-visual-top">
                    <figure className="how-step-visual-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ""}
                        fill
                        className="how-step-visual-img"
                        sizes="(max-width: 899px) 100vw, 25vw"
                        priority={item.step === "1"}
                      />
                    </figure>
                    <span className="how-step-badge" aria-hidden>
                      {item.step}
                    </span>
                  </div>
                  <div className="how-step-visual-copy">
                    <h3 className="how-step-title">{item.title}</h3>
                    <p className="how-step-text">{item.description}</p>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
