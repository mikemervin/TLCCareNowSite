export const site = {
  name: "TLC CareNow",
  tagline: "Book and manage care services",
  description:
    "TLC CareNow empowers residents of independent living communities to schedule same-day care and short-term assistance—without traditional agency minimums.",
  teamLifeUrl: "https://www.teamlifecares.com",
  teamLifeWebsite: "www.teamlifecares.com",
  /** Live PWA / booking app (matches tlc-care-now production). */
  appUrl: "https://app.tlccarenow.com",
  appLoginUrl: "https://app.tlccarenow.com/login",
  adminLoginUrl: "https://app.tlccarenow.com/admin/login",
  email: "info@teamlifecares.com",
  phoneHeader: "312-428-1188",
  phoneContact: "872-335-9191",
  copyright: "©2021 by TLC CareNow",
  poweredBy: "Powered by TeamLife Health Group",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/enterprise", label: "Enterprise Solutions" },
  { href: "/campus-care", label: "Campus Care" },
  { href: "/book-carenow", label: "Book CareNow" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
] as const;

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/teamlifecares/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/teamlifehealthgroup/",
    icon: "facebook",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@teamlifecares",
    icon: "tiktok",
  },
] as const;
