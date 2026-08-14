"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className={`header-subnav-link${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      TLC CareNow
    </Link>
  );
}
