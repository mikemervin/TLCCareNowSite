import Image from "next/image";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="hero-split tlc-animate-in overflow-hidden border-b border-tlc-border/60">
      <div className="hero-copy">
        <h1 className="hero-title">
          <span className="hero-headline-primary">Compassionate Care,</span>
          <span className="hero-headline-accent">Conveniently On-Demand</span>
        </h1>

        <span className="tlc-accent-line hero-accent" aria-hidden />

        <p className="hero-lead">
          Care built for independent living—book the visits you need, when you
          need them, without a full-day agency minimum.
        </p>

        <div className="hero-actions">
          <TrackedOutboundLink
            href={site.appLoginUrl}
            clickId="book_carenow_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action hero-action--primary"
          >
            Book CareNow
          </TrackedOutboundLink>
          <ButtonLink
            href="/contact"
            variant="secondary"
            size="md"
            className="hero-action hero-action--secondary"
          >
            Contact us
          </ButtonLink>
        </div>

        <p className="hero-support">
          Our team is on site 24/7 to support residents and families at
          communities across America.
        </p>
      </div>

      <div className="hero-media">
        <Image
          src={images.hero}
          alt="Caregiver helping a senior resident in an independent living community"
          fill
          priority
          className="object-cover object-[center_25%] sm:object-[65%_30%] lg:object-[72%_28%]"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div className="hero-media-overlay" aria-hidden />
      </div>
    </section>
  );
}
