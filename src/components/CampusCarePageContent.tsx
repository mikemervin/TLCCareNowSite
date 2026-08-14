import Image from "next/image";
import Link from "next/link";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { ButtonLink } from "@/components/ui/Button";
import { TeamLifeWebsiteLink } from "@/components/TeamLifeWebsiteLink";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const highlights = [
  {
    title: "Wellness on site",
    description:
      "Engagement and wellbeing support designed for independent living campuses—alongside daily life, not clinical care.",
  },
  {
    title: "Built for your campus",
    description:
      "We partner with operators so programs fit how your community already runs day to day.",
  },
  {
    title: "Separate from CareNow",
    description:
      "Campus Care is its own wellness offering. Residents still book and pay for visits in the TLC CareNow app.",
  },
] as const;

export function CampusCarePageContent() {
  return (
    <article className="campus-care-page">
      {/* 1. Hero */}
      <section className="campus-care-hero">
        <div className="campus-care-hero-copy">
          <p className="campus-care-eyebrow">TeamLife Health Group</p>
          <h1 className="campus-care-title">TeamLife Campus Care</h1>
          <span className="tlc-accent-line campus-care-accent" aria-hidden />
          <p className="campus-care-lead">
            On-site wellness for senior living campuses—supporting residents
            every day, alongside TLC CareNow booking.
          </p>
          <div className="campus-care-hero-actions">
            <ButtonLink
              href="/contact"
              size="md"
              className="campus-care-contact-btn"
            >
              Talk with our team
            </ButtonLink>
            <Link href="/" className="campus-care-hero-link">
              Explore TLC CareNow
            </Link>
          </div>
          <p className="campus-care-support">
            Campus Care focuses on engagement, wellbeing, and a consistent team
            presence. Visit booking stays in the CareNow app.
          </p>
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

      {/* 2. Highlights */}
      <section className="campus-care-main tlc-section">
        <div className="tlc-container campus-care-main-inner">
          <header className="campus-care-section-header">
            <p className="campus-care-section-eyebrow">What Campus Care offers</p>
            <h2 className="campus-care-section-title">Built for campus life</h2>
            <span
              className="tlc-accent-line campus-care-section-accent"
              aria-hidden
            />
          </header>

          <ul className="campus-care-highlights">
            {highlights.map((item) => (
              <li key={item.title} className="campus-care-highlight-card">
                <h3 className="campus-care-highlight-title">{item.title}</h3>
                <p className="campus-care-highlight-text">{item.description}</p>
              </li>
            ))}
          </ul>

          {/* 3. Compare */}
          <div className="campus-care-compare">
            <div className="campus-care-compare-col">
              <p className="campus-care-compare-eyebrow">Program</p>
              <h3 className="campus-care-compare-label">TeamLife Campus Care</h3>
              <p className="campus-care-compare-text">
                Campus wellness partnership—on-site support and programs tailored
                to your community.
              </p>
            </div>
            <div className="campus-care-compare-divider" aria-hidden />
            <div className="campus-care-compare-col">
              <p className="campus-care-compare-eyebrow">App</p>
              <h3 className="campus-care-compare-label">TLC CareNow</h3>
              <p className="campus-care-compare-text">
                Residents book visits, pay securely, and track care at{" "}
                <TrackedOutboundLink
                  href={site.appUrl}
                  clickId="app_campus_care_inline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="campus-care-inline-link"
                >
                  app.tlccarenow.com
                </TrackedOutboundLink>
                .
              </p>
            </div>
          </div>

          {/* 4. CTA */}
          <div className="campus-care-cta">
            <h2 className="campus-care-cta-title">Bring Campus Care to your community</h2>
            <p className="campus-care-cta-text">
              Questions about Campus Care or CareNow? We&apos;ll walk you through
              both programs.
            </p>
            <div className="campus-care-cta-actions">
              <ButtonLink href="/contact" size="md" className="campus-care-contact-btn">
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
              More about{" "}
              <TeamLifeWebsiteLink showExternalIcon={false} /> ·{" "}
              <Link href="/" className="campus-care-inline-link">
                TLC CareNow home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
