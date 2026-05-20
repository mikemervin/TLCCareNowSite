import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { TeamLifeWebsiteLink } from "@/components/TeamLifeWebsiteLink";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const highlights = [
  {
    title: "Wellness on site",
    description:
      "Programs and support designed for independent living campuses—not a replacement for clinical care, but a partner in daily wellbeing.",
  },
  {
    title: "Built for your campus",
    description:
      "We work with operators and care teams to align services with how your community already runs day to day.",
  },
  {
    title: "Separate from CareNow booking",
    description:
      "TeamLife Campus Care is its own wellness offering. Residents still use the TLC CareNow app to schedule and pay for visits.",
  },
] as const;

export function CampusCarePageContent() {
  return (
    <article className="campus-care-page">
      <section className="campus-care-hero">
        <div className="campus-care-hero-copy">
          <p className="campus-care-eyebrow">TeamLife Health Group</p>
          <h1 className="campus-care-title">TeamLife Campus Care</h1>
          <span className="tlc-accent-line campus-care-accent" aria-hidden />
          <p className="campus-care-lead">
            A wellness program for senior living campuses—supporting residents
            on site, alongside the TLC CareNow booking experience.
          </p>
          <p className="campus-care-body">
            Campus Care focuses on engagement, wellbeing, and consistent presence
            from our team. It is separate from the CareNow app, where residents
            book and pay for scheduled care visits.
          </p>
          <div className="campus-care-hero-actions">
            <ButtonLink href="/contact" size="md">
              Contact us
            </ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="campus-care-hero-link"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="campus-care-hero-media">
          <Image
            src={images.campusCare}
            alt="Care team member reviewing a tablet with a resident"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="campus-care-hero-overlay" aria-hidden />
        </div>
      </section>

      <section className="campus-care-main tlc-section">
        <div className="tlc-container campus-care-main-inner">
          <ul className="campus-care-highlights">
            {highlights.map((item) => (
              <li key={item.title} className="campus-care-highlight-card">
                <h2 className="campus-care-highlight-title">{item.title}</h2>
                <p className="campus-care-highlight-text">{item.description}</p>
              </li>
            ))}
          </ul>

          <div className="campus-care-compare">
            <div className="campus-care-compare-col">
              <h3 className="campus-care-compare-label">TeamLife Campus Care</h3>
              <p className="campus-care-compare-text">
                Campus wellness partnership, on-site support, and programs tailored
                to your community.
              </p>
            </div>
            <div className="campus-care-compare-divider" aria-hidden />
            <div className="campus-care-compare-col">
              <h3 className="campus-care-compare-label">TLC CareNow app</h3>
              <p className="campus-care-compare-text">
                Residents book visits, pay securely, and track care from their
                phone—visit{" "}
                <a
                  href={site.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="campus-care-inline-link"
                >
                  app.tlccarenow.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="campus-care-cta">
            <h2 className="campus-care-cta-title">Learn more</h2>
            <p className="campus-care-cta-text">
              Questions about bringing Campus Care or CareNow to your community?
              We&apos;re happy to walk you through both programs.
            </p>
            <div className="campus-care-cta-actions">
              <ButtonLink href="/contact" variant="secondary" size="md">
                Get in touch
              </ButtonLink>
              <a
                href={`tel:${site.phoneHeader.replace(/-/g, "")}`}
                className="campus-care-cta-phone tabular-nums"
              >
                {site.phoneHeader}
              </a>
            </div>
            <p className="campus-care-cta-org">
              Visit{" "}
              <TeamLifeWebsiteLink showExternalIcon={false} /> for more about
              TeamLife Health Group, or explore{" "}
              <Link href="/" className="campus-care-inline-link">
                TLC CareNow
              </Link>{" "}
              on this site.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
