import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { BookIcon } from "@/components/OutlineCtaLink";
import { site } from "@/lib/site";

type HeaderPillLinkProps = {
  href: string;
  shortLabel: string;
  fullLabel: string;
  className?: string;
};

function HeaderPillLink({
  href,
  shortLabel,
  fullLabel,
  className = "",
}: HeaderPillLinkProps) {
  return (
    <Link href={href} className={`header-pill-item ${className}`.trim()}>
      <span className="header-pill-item__short">{shortLabel}</span>
      <span className="header-pill-item__full">{fullLabel}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full border-b border-tlc-border/80 bg-white/90 shadow-[0_1px_0_rgb(45_45_45/4%),0_4px_24px_rgb(45_45_45/4%)] backdrop-blur-lg backdrop-saturate-150">
        <div className="tlc-header-container h-[68px] sm:h-[76px]">
          <BrandMark compact className="tlc-header-brand" />

          <nav className="tlc-header-actions" aria-label="Primary actions">
            <div className="header-pill-bar">
              <HeaderPillLink
                href="/"
                shortLabel="CareNow"
                fullLabel={site.name}
                className="header-home-link"
              />
              <HeaderPillLink
                href="/campus-care"
                shortLabel="Campus Care"
                fullLabel="TeamLife Campus Care"
                className="header-campus-link"
              />
              <HeaderPillLink
                href="/enterprise"
                shortLabel="Enterprise"
                fullLabel="Enterprise Solutions"
                className="header-enterprise-link"
              />
              <a
                href={site.appLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header-pill-item header-pill-item--book"
                aria-label="Book CareNow"
              >
                <span className="header-pill-book-icon" aria-hidden>
                  <BookIcon />
                </span>
                <span className="header-pill-book-label-short">Book CareNow</span>
                <span className="header-pill-book-label-full">Book CareNow</span>
              </a>
            </div>

            <HeaderMobileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}
