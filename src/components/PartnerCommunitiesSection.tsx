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
          <span className="tlc-accent-line partner-communities-accent" aria-hidden />
          <h2 id="partner-communities-title" className="partner-communities-title">
            Serving communities nationwide
          </h2>
          <p className="partner-communities-intro">
            TLC CareNow partners with independent living communities across the
            country. Residents at participating locations—including these Solstice
            communities—can book on-demand care through the app.
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
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
                    className="partner-communities-img"
                  />
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

        <p className="partner-communities-footnote">
          Don&apos;t see your community?{" "}
          <Link href="/contact" className="partner-communities-link">
            Contact us
          </Link>{" "}
          about bringing CareNow to your campus anywhere in the U.S.
        </p>
      </div>
    </section>
  );
}
