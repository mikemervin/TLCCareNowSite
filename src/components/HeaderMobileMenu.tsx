"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`header-menu-icon${open ? " header-menu-icon--open" : ""}`}
      aria-hidden
    >
      <span className="header-menu-icon__line" />
      <span className="header-menu-icon__line" />
      <span className="header-menu-icon__line" />
    </span>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      role="menuitem"
      className={`header-menu-link${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  return (
    <div ref={rootRef} className="header-mobile-menu sm:hidden">
      <button
        type="button"
        className="header-menu-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="header-menu-panel"
          aria-label="Site menu"
        >
          <MenuLink href="/" onClick={close}>
            TLC CareNow
          </MenuLink>
          <MenuLink href="/blog" onClick={close}>
            TLC Blog
          </MenuLink>
          <MenuLink href="/campus-care" onClick={close}>
            TeamLife Campus Care
          </MenuLink>
          <MenuLink href="/enterprise" onClick={close}>
            Enterprise Solutions
          </MenuLink>
        </div>
      ) : null}
    </div>
  );
}
