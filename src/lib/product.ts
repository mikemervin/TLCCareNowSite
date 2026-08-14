/** Product capabilities aligned with TLC/tlc-care-now. */

export type HowItWorksIcon = "signin" | "book" | "pay" | "updates";

export const howItWorksSteps: ReadonlyArray<{
  step: string;
  title: string;
  description: string;
  icon: HowItWorksIcon;
  image?: string;
  imageAlt?: string;
}> = [
  {
    step: "1",
    icon: "signin",
    title: "Sign in",
    description:
      "Log in with your phone and a one-time code—no password needed. New users add a short profile and choose their community.",
    image: "/how-it-works-sign-in.png",
    imageAlt: "TLC CareNow sign-in screen showing phone number login",
  },
  {
    step: "2",
    icon: "book",
    title: "Book a visit",
    description:
      "Choose the care you need—like a wellness check or companionship—pick a time, and add visits to your cart.",
    image: "/how-it-works-book.png",
    imageAlt:
      "TLC CareNow services screen showing wellness and care service options",
  },
  {
    step: "3",
    icon: "updates",
    title: "Stay updated",
    description:
      "See upcoming and past visits on your home screen, so residents and families always know what’s next.",
    image: "/how-it-works-updates.png",
    imageAlt:
      "TLC CareNow home screen showing upcoming services and visit schedule",
  },
  {
    step: "4",
    icon: "pay",
    title: "Pay securely",
    description:
      "Check out in the app and save a payment method for faster rebooking next time.",
    image: "/how-it-works-pay.png",
    imageAlt: "TLC CareNow secure card checkout screen powered by Stripe",
  },
];

export type ResidentFeatureIcon =
  | "calendar"
  | "community"
  | "cart"
  | "history"
  | "news"
  | "team";

export type FeatureHighlightIcon =
  | "ondemand"
  | "plans"
  | "family"
  | "communication";

export type FeatureIconType = ResidentFeatureIcon | FeatureHighlightIcon;

/** Marketing highlights for the Features carousel. */
export const featureHighlights: ReadonlyArray<{
  title: string;
  shortLabel: string;
  description: string;
  icon: FeatureHighlightIcon;
}> = [
  {
    icon: "ondemand",
    title: "On-demand care when you need it",
    shortLabel: "On-demand care",
    description:
      "Book 15-, 30-, or 60-minute visits—plus escorts, pickups, and custom-length services—available 24/7. Get the help you need without a full-day agency minimum.",
  },
  {
    icon: "plans",
    title: "Care plans built around each resident",
    shortLabel: "Care plans",
    description:
      "Set up a care plan for each resident and keep it updated as needs change. Staff stay informed, and residents get the independent, personalized support that fits them.",
  },
  {
    icon: "family",
    title: "Peace of mind for families",
    shortLabel: "Family updates",
    description:
      "See what’s booked, what’s completed, and what’s coming next—so families stay in the loop without phone tag, even from far away.",
  },
  {
    icon: "communication",
    title: "Clear communication with the care team",
    shortLabel: "Communication",
    description:
      "Ask questions, share preferences, and pass along updates in the app—so residents, families, and staff stay aligned when something changes.",
  },
];

export const residentFeatures: ReadonlyArray<{
  title: string;
  description: string;
  icon: ResidentFeatureIcon;
}> = [
  {
    icon: "calendar",
    title: "Same-day scheduling",
    description:
      "Book short visits when you need them—15, 30, 60 minutes, or custom lengths, without a full-day agency minimum.",
  },
  {
    icon: "community",
    title: "Clear service choices",
    description:
      "Wellness checks, readiness help, companionship, escorts, pickups, and more—see what’s included before you book.",
  },
  {
    icon: "cart",
    title: "Cart & secure payments",
    description:
      "Add visits to your cart, pay securely in one checkout, and save a card for faster booking next time.",
  },
  {
    icon: "history",
    title: "Visit history",
    description:
      "Upcoming and completed visits stay on your home screen, so residents and families always know what’s next.",
  },
  {
    icon: "news",
    title: "News & events",
    description:
      "Community news and announcements in the app, so campus updates are easy to find.",
  },
  {
    icon: "team",
    title: "Your care team",
    description:
      "See who’s supporting each visit and how to reach the team when you need help.",
  },
];

export type CommunityFeatureIcon =
  | "workbasket"
  | "schedule"
  | "messages"
  | "insights";

export const communityFeatures: ReadonlyArray<{
  title: string;
  summary: string;
  icon: CommunityFeatureIcon;
}> = [
  {
    icon: "workbasket",
    title: "Workbasket & assignments",
    summary:
      "New bookings land in one live queue. Assign care pros and update visits in the app—not in spreadsheets.",
  },
  {
    icon: "schedule",
    title: "Schedules & punch",
    summary:
      "Shared calendars and shift planning. Punch in/out with location checks so you know who's on site.",
  },
  {
    icon: "messages",
    title: "Messages & reminders",
    summary:
      "Team messaging plus visit and handoff reminders—so follow-ups don't get lost between shifts.",
  },
  {
    icon: "insights",
    title: "Reports & insights",
    summary:
      "Dashboards and snapshots show how care is running. Payroll and pricing stay clear across locations.",
  },
];
