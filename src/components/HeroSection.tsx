import Image from "next/image";
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

        <div className="hero-prose">
          <p className="hero-lead">
            Care built for independent living—schedule the visits you need,
            when you need them, without a full-day agency minimum.
          </p>
          <p className="hero-body">
            Book same-day or short-term help through the TLC CareNow app. Our
            team is <strong>on site 24/7</strong> to support residents and
            families.
          </p>
        </div>

        <div className="hero-community">
          <p className="hero-community-question">CareNow in your community?</p>
          <p className="hero-community-sub">
            Have questions? We&apos;re here to help.
          </p>
          <a href={`mailto:${site.email}`} className="hero-community-email">
            {site.email}
          </a>
        </div>
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
