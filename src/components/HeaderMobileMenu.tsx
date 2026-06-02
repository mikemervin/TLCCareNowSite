"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type HeaderMobileMenuProps = {
  linkClassName: string;
};

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M4 6h12M4 10h12M4 14h12" strokeLinecap="round" />
    </svg>
  );
}

export function HeaderMobileMenu({ linkClassName }: HeaderMobileMenuProps) {
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
        <span className="header-menu-trigger-icon" aria-hidden>
          <MenuIcon open={open} />
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="header-menu-panel"
          aria-label="Site menu"
        >
          <Link
            href="/enterprise"
            role="menuitem"
            className={`${linkClassName} header-menu-link`}
            onClick={close}
          >
            Enterprise Solutions
          </Link>
          <Link
            href="/campus-care"
            role="menuitem"
            className={`${linkClassName} header-menu-link`}
            onClick={close}
          >
            TeamLife Campus Care
          </Link>
        </div>
      ) : null}
    </div>
  );
}
