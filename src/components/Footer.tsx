import { APP_BRAND_POWERED_BY } from "@/lib/app-brand";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

const contactItems = [
  {
    label: "Book care online",
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
      <div className="tlc-header-container site-footer-inner">
        <nav className="site-footer-grid" aria-label="Contact and social">
          {contactItems.map((item) => (
            <div key={item.label} className="site-footer-col">
              <span className="site-footer-label">{item.label}</span>
              <a
                href={item.href}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`site-footer-value${"tabular" in item && item.tabular ? " tabular-nums" : ""}`}
              >
                {item.value}
              </a>
            </div>
          ))}

          <div className="site-footer-col">
            <span className="site-footer-label">Follow</span>
            <SocialLinks className="site-footer-social" size="compact" />
          </div>
        </nav>

        <div className="site-footer-divider" aria-hidden />

        <a
          href={site.teamLifeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-powered"
        >
          {APP_BRAND_POWERED_BY}
        </a>
      </div>
    </footer>
  );
}
