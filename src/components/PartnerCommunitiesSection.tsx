import Image from "next/image";
import Link from "next/link";
import { partnerCommunities } from "@/lib/partner-communities";

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="partner-communities-pin"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M8 1.5a4 4 0 0 0-4 4c0 2.75 4 8.5 4 8.5s4-5.75 4-8.5a4 4 0 0 0-4-4Z"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PartnerCommunitiesSection() {
  return (
    <section
      className="partner-communities-section"
      id="partner-communities"
      aria-labelledby="partner-communities-title"
    >
      <div className="tlc-container partner-communities-inner">
        <header className="partner-communities-header">
          <p className="partner-communities-eyebrow">Partner communities</p>
          <h2
            id="partner-communities-title"
            className="partner-communities-title"
          >
            Serving communities nationwide
          </h2>
          <span
            className="tlc-accent-line partner-communities-accent"
            aria-hidden
          />
          <p className="partner-communities-intro">
            Residents at participating independent living communities—including
            these Solstice campuses—can book on-demand care in the TLC CareNow
            app.
          </p>
        </header>

        <ul className="partner-communities-grid">
          {partnerCommunities.map((community) => (
            <li key={community.slug}>
              <article className="partner-communities-card">
                <div className="partner-communities-media">
                  <Image
                    src={community.image}
                    alt={community.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px"
                    className="partner-communities-img"
                  />
                  <div className="partner-communities-scrim" aria-hidden />
                </div>
                <div className="partner-communities-body">
                  <h3 className="partner-communities-name">{community.name}</h3>
                  <p className="partner-communities-location">
                    <LocationIcon />
                    <span>{community.location}</span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="partner-communities-cta">
          <p className="partner-communities-footnote">
            Your community isn&apos;t listed? We bring CareNow to campuses
            nationwide.
          </p>
          <Link href="/contact" className="partner-communities-cta-link">
            Ask about your campus
          </Link>
        </div>
      </div>
    </section>
  );
}
