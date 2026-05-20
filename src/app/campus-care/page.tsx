import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Care",
};

export default function CampusCarePage() {
  return (
    <PageShell>
      <section className="tlc-section bg-tlc-cream">
        <div className="tlc-container mx-auto max-w-2xl text-center">
          <SectionHeading align="center">
            TeamLife Campus Care
          </SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-tlc-text-muted">
            TeamLife Campus Care is a wellness program for senior living
            campuses—separate from the TLC CareNow booking app. Learn how we
            partner with communities to support residents on site.
          </p>
          <p className="mt-5 text-tlc-text-muted">
            Contact us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-tlc-primary underline underline-offset-2"
            >
              {site.email}
            </a>{" "}
            for more information.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-10">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
