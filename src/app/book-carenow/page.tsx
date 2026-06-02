import { AppLink } from "@/components/AppLink";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Book CareNow",
  description: site.tagline,
  path: "/book-carenow",
});

export default function BookCareNowPage() {
  return (
    <PageShell>
      <section className="tlc-section bg-gradient-to-b from-tlc-cream to-white">
        <div className="tlc-container mx-auto max-w-2xl text-center">
          <SectionHeading align="center">
            Book CareNow
          </SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-tlc-text-muted">
            {site.description} Sign in at{" "}
            <a
              href={site.appUrl}
              className="font-medium text-tlc-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.tlccarenow.com
            </a>{" "}
            to schedule visits, pay securely, and manage your care.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AppLink size="lg">Open TLC CareNow</AppLink>
            <AppLink
              href={site.adminLoginUrl}
              variant="secondary"
              size="md"
            >
              Staff sign in
            </AppLink>
          </div>
          <p className="mt-10 text-[15px] text-tlc-text-muted">
            Not in a participating community yet?{" "}
            <Link href="/contact" className="font-medium text-tlc-primary hover:underline">
              Contact us
            </Link>{" "}
            to learn more.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
