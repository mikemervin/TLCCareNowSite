"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderHomePillLink } from "@/components/HeaderHomePillLink";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import {
  APP_BRAND_DISPLAY_NAME,
  APP_BRAND_POWERED_BY,
} from "@/lib/app-brand";
import { site } from "@/lib/site";

type HeaderSubnavLinkProps = {
  href: string;
  label: string;
  className?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderSubnavLink({
  href,
  label,
  className = "",
}: HeaderSubnavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      className={`header-subnav-link${active ? " is-active" : ""} ${className}`.trim()}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="tlc-header-shell">
        <div className="tlc-header-main">
          <div className="tlc-header-container tlc-header-main-inner">
            <Link
              href="/"
              className="tlc-header-logo"
              aria-label={APP_BRAND_DISPLAY_NAME}
            >
              <Image
                src="/logo.svg"
                alt=""
                width={44}
                height={44}
                priority
                className="tlc-header-logo-img"
              />
            </Link>

            <div className="tlc-header-brand-text">
              <Link href="/" className="tlc-header-brand-title">
                {APP_BRAND_DISPLAY_NAME}
              </Link>
              <p className="tlc-header-brand-tagline">{APP_BRAND_POWERED_BY}</p>
            </div>

            <nav className="tlc-header-actions" aria-label="Primary actions">
              <TrackedOutboundLink
                href={site.appLoginUrl}
                clickId="book_carenow_header"
                target="_blank"
                rel="noopener noreferrer"
                className="header-book-cta"
              >
                <span className="header-book-cta-label header-book-cta-label--full">
                  Book CareNow
                </span>
                <span className="header-book-cta-label header-book-cta-label--short">
                  Book
                </span>
              </TrackedOutboundLink>
            </nav>
          </div>
        </div>

        <nav className="tlc-header-subnav" aria-label="Primary">
          <div className="tlc-header-container tlc-header-subnav-inner">
            <HeaderHomePillLink />
            <HeaderSubnavLink href="/blog" label="TLC Blog" />
            <HeaderSubnavLink href="/campus-care" label="Campus Care" />
            <HeaderSubnavLink href="/enterprise" label="Enterprise" />
          </div>
        </nav>
      </div>
    </header>
  );
}
