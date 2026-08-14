/**
 * Enterprise page screenshot gallery.
 *
 * To add an example:
 * 1. Place a PNG or JPG in /public/enterprise/
 * 2. Append an entry below with src, alt, caption, width, and height.
 * 3. Optional: add a 2× asset (e.g. payroll-summary@2x.png at 2048px wide) and set
 *    src2x + width2x + height2x for a sharper hover preview on Retina displays.
 */
export type EnterpriseScreenshot = {
  src: string;
  /** Higher-resolution file for the hover preview (typically 2× width/height). */
  src2x?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  width2x?: number;
  height2x?: number;
};

export const enterpriseScreenshots: readonly EnterpriseScreenshot[] = [
  {
    src: "/enterprise/workbasket.png",
    alt: "Workbasket schedule with client visits, care notes, and visit status",
    caption: "Workbasket",
    width: 1024,
    height: 558,
  },
  {
    src: "/enterprise/admin-dashboard.png",
    alt: "Admin dashboard with staff online, metrics, bookings, and revenue",
    caption: "Admin dashboard",
    width: 1024,
    height: 576,
  },
  {
    src: "/enterprise/stripe-transactions.png",
    alt: "Transactions view with payment totals and transaction list",
    caption: "Transactions",
    width: 1024,
    height: 883,
  },
  {
    src: "/enterprise/client-search.png",
    alt: "Client search page with community filter and client cards",
    caption: "Client search",
    width: 1024,
    height: 576,
  },
  {
    src: "/enterprise/client-details.png",
    alt: "Client details modal with contact, care plan, and medical information",
    caption: "Client details",
    width: 1024,
    height: 576,
  },
  {
    src: "/enterprise/staff-scheduling.png",
    alt: "Staff scheduling grid with weekly shifts, punch times, and earnings",
    caption: "Staff scheduling",
    width: 1024,
    height: 782,
  },
  {
    src: "/enterprise/payroll-summary.png",
    alt: "Printable payroll summary by community with scheduled and worked hours",
    caption: "Payroll summary",
    width: 1024,
    height: 904,
  },
  {
    src: "/enterprise/carepro-login.png",
    alt: "CarePro log in page with phone number and email sign-in",
    caption: "CarePro login",
    width: 1024,
    height: 576,
  },
];
