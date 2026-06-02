"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function HeaderHomePillLink() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link href="/" className="header-pill-item header-home-link">
      <span className="header-pill-item__short">CareNow</span>
      <span className="header-pill-item__full">{site.name}</span>
    </Link>
  );
}
