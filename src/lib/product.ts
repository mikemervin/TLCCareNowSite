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
      "Log in with your phone and a secure code. New users set up a short profile for their community.",
    image: "/how-it-works-sign-in.png",
    imageAlt: "TLC CareNow sign-in screen showing phone number login",
  },
  {
    step: "2",
    icon: "book",
    title: "Book a visit",
    description:
      "Choose the care you need, pick a date and time, and add visits to your cart.",
    image: "/how-it-works-book.png",
    imageAlt:
      "TLC CareNow services screen showing wellness and care service options",
  },
  {
    step: "3",
    icon: "pay",
    title: "Pay securely",
    description:
      "Check out in the app and save a payment method for future visits.",
    image: "/how-it-works-pay.png",
    imageAlt: "TLC CareNow secure card checkout screen powered by Stripe",
  },
  {
    step: "4",
    icon: "updates",
    title: "Stay updated",
    description:
      "See upcoming and past visits on your home screen.",
    image: "/how-it-works-updates.png",
    imageAlt:
      "TLC CareNow home screen showing upcoming services and visit schedule",
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
    title: "On-Demand Care Services at Your Fingertips",
    shortLabel: "On-demand care",
    description:
      "Scheduling care has never been easier. The TLC CareNow app empowers residents and their loved ones to schedule caregiving services effortlessly. Whether it's a quick 15-minute wellness check, a 30-minute morning readiness routine, or a full hour of companionship, care is just a tap away.",
  },
  {
    icon: "plans",
    title: "Personalized Care Plans",
    shortLabel: "Care plans",
    description:
      "Every resident is unique, and TLC CareNow ensures that care services are tailored to each individual, promoting a sense of independence and dignity. The app allows for quick scheduling of immediate care needs, providing residents with the support they need, when they need it most.",
  },
  {
    icon: "family",
    title: "Peace of Mind for Families",
    shortLabel: "Family updates",
    description:
      "Stay connected with loved ones and their care plans. Families can easily monitor scheduled services and receive updates, ensuring everyone stays informed and involved in the care process. With real-time updates and scheduling notifications, they can rest assured knowing that their family members are receiving the attention they need.",
  },
  {
    icon: "communication",
    title: "Seamless Communication",
    shortLabel: "Communication",
    description:
      "The TLC CareNow app facilitates open communication between caregivers and residents, ensuring that any changes in health or preferences are promptly addressed. Share feedback, ask questions, and stay informed about care progress with ease.",
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
    description: "Book short visits when you need them—no 4-hour agency minimums.",
  },
  {
    icon: "community",
    title: "Clear service choices",
    description: "Wellness checks, readiness help, companionship, and more—clear before you book.",
  },
  {
    icon: "cart",
    title: "Cart & secure payments",
    description: "Add visits to your cart, pay once, and review billing anytime.",
  },
  {
    icon: "history",
    title: "Visit history",
    description: "Upcoming and completed visits on your home screen.",
  },
  {
    icon: "news",
    title: "News & events",
    description: "Community news and announcements in the app.",
  },
  {
    icon: "team",
    title: "Your care team",
    description: "See who’s on your visits and how to reach support.",
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
      "New bookings land in one live queue. Supervisors assign care pros and update visits in the app—not in spreadsheets or phone tag.",
  },
  {
    icon: "schedule",
    title: "Schedules & punch",
    summary:
      "Shared calendars and shift planning for your team. Punch in/out with location checks so supervisors know who is on site and when.",
  },
  {
    icon: "messages",
    title: "Messages & reminders",
    summary:
      "Team messaging in the app, plus scheduled reminders for visits and handoffs—so follow-ups do not get lost between shifts.",
  },
  {
    icon: "insights",
    title: "Reports & insights",
    summary:
      "Dashboards and community snapshots show how care is running. Payroll and pricing tools give operators a clear view across locations.",
  },
];
