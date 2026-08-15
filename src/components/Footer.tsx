import Link from "next/link";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { APP_BRAND_POWERED_BY } from "@/lib/app-brand";
import { SocialLinks } from "@/components/SocialLinks";
import { footerLegalLinks } from "@/lib/legal";
import { site } from "@/lib/site";

const contactItems = [
  {
    label: "Book care",
    value: "app.tlccarenow.com",
    href: site.appUrl,
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Phone",
    value: site.phoneHeader,
    href: `tel:${site.phoneHeader.replace(/-/g, "")}`,
    tabular: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer-inner">
        <nav className="site-footer-panel" aria-label="Contact and social">
          {contactItems.map((item) => (
            <div key={item.label} className="site-footer-col">
              <span className="site-footer-label">{item.label}</span>
              {"external" in item && item.external ? (
                <TrackedOutboundLink
                  href={item.href}
                  clickId="book_carenow_footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-value"
                >
                  {item.value}
                </TrackedOutboundLink>
              ) : (
                <a
                  href={item.href}
                  className={`site-footer-value${"tabular" in item && item.tabular ? " tabular-nums" : ""}`}
                >
                  {item.value}
                </a>
              )}
            </div>
          ))}

          <div className="site-footer-col site-footer-col-follow">
            <span className="site-footer-label">Follow</span>
            <SocialLinks className="site-footer-social" size="compact" />
          </div>
        </nav>

        <div className="site-footer-bottom">
          <nav className="site-footer-legal" aria-label="Legal">
            {footerLegalLinks.map((link, index) => (
              <span key={link.href} className="site-footer-legal-item">
                {index > 0 ? (
                  <span className="site-footer-legal-sep" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={link.href} className="site-footer-legal-link">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <p className="site-footer-copyright">{site.copyright}</p>

          <a
            href={site.teamLifeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-powered"
          >
            {APP_BRAND_POWERED_BY}
          </a>
        </div>
      </div>
    </footer>
  );
}
