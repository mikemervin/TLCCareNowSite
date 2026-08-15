import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found-page tlc-section">
        <div className="tlc-container not-found-inner">
          <p className="not-found-eyebrow">404</p>
          <h1 className="not-found-title">Page not found</h1>
          <span className="tlc-accent-line mx-auto" aria-hidden />
          <p className="not-found-lead">
            That link doesn’t match a page on TLC CareNow. Try one of these
            instead.
          </p>
          <nav className="not-found-links" aria-label="Helpful links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="not-found-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
