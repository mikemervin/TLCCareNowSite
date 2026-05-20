import { AppLink } from "@/components/AppLink";
import { PageShell } from "@/components/PageShell";
import { TeamLifeWebsiteLink } from "@/components/TeamLifeWebsiteLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="tlc-section bg-tlc-cream">
        <div className="tlc-container mx-auto max-w-2xl">
          <SectionHeading subtitle={site.tagline}>About</SectionHeading>
          <div className="tlc-prose mt-10 space-y-5 text-tlc-text-muted">
            <p>
              <strong className="font-semibold text-tlc-text">{site.name}</strong>{" "}
              is a web application for residents of independent living communities
              to book and manage on-demand care—without the 4-hour daily minimums
              common with traditional agencies.
            </p>
            <p>
              Residents sign in with a phone number, choose services configured for
              their community, pay through secure checkout, and track upcoming and
              past visits in one place. Care teams and operators use the same
              platform for assignments, schedules, messaging, and reporting.
            </p>
            <p>
              {site.name} is {site.poweredBy.toLowerCase()}. Visit{" "}
              <TeamLifeWebsiteLink showExternalIcon={false} /> to learn more about
              our organization.
            </p>
            <div className="pt-4">
              <AppLink size="md">Open TLC CareNow</AppLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
