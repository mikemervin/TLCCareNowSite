"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderHomePillLink() {
  const pathname = usePathname();
  const active = isActivePath(pathname, "/");

  return (
    <Link
      href="/"
      className={`header-pill-item header-home-link${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="header-pill-item__short">CareNow</span>
      <span className="header-pill-item__full">{site.name}</span>
    </Link>
  );
}
