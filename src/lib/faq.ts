export type FaqItem = {
  question: string;
  answer: string;
};

/** Homepage FAQ — owns on-demand / same-day / booking intents. */
export const homeFaqs: FaqItem[] = [
  {
    question: "What is on-demand care in independent living?",
    answer:
      "It’s short, timed CareNow visits you can book when help is needed—same day or ahead—without locking into long agency blocks. Visits are confirmed in the app, so everyone knows who is coming and when.",
  },
  {
    question: "Can residents book same-day care?",
    answer:
      "Yes. In partner communities, residents, families, or staff can book for the same day when coverage is available. You pick the service and time; the visit is scheduled and confirmed—no vague callback.",
  },
  {
    question: "How is CareNow different from traditional agencies?",
    answer:
      "Agencies often require multi-hour minimums and long lead times. CareNow is built for independent living: visit-length support, flexible booking, and staff who can book on a resident’s behalf—so extra help fits the day instead of forcing a half-day block.",
  },
  {
    question: "Who can book—residents, families, or staff?",
    answer:
      "All three, depending on how your community partners with us. Residents book for themselves, families can book remotely, and supervisors or front-desk teams can book on behalf when someone needs help arranging support.",
  },
  {
    question: "Is CareNow available in my community?",
    answer:
      "CareNow is offered in partner communities nationwide. Ask your community office if they use CareNow, or contact our team—we’ll help you find the next step for your campus.",
  },
];

/** Enterprise FAQ — owns operator / software intents. */
export const enterpriseFaqs: FaqItem[] = [
  {
    question: "What is TLC CareNow enterprise software for?",
    answer:
      "It’s care scheduling and operations software for independent living and senior living operators—so teams can book visits, assign care professionals, and see what’s happening across the community without juggling agencies and spreadsheets.",
  },
  {
    question: "Can we schedule care by the visit instead of long blocks?",
    answer:
      "Yes. Enterprise CareNow is built around visit-based scheduling: book short or stacked visits, rebook quickly, and fill a day or week as residents need—without traditional agency minimums driving the calendar.",
  },
  {
    question: "What roles and dashboards are included?",
    answer:
      "Residents, care professionals, supervisors, admins, and owners each get a role-based dashboard with the tools they need—booking, assignments, punch in/out, services and pricing, and operational visibility—without cluttering every screen for every user.",
  },
  {
    question: "How does payroll and staffing visibility work?",
    answer:
      "Care professionals punch in and out against assigned visits, and supervisors and admins can see schedules and coverage in one place. That gives leadership clearer payroll and staffing visibility tied to real visits—not guesswork across disconnected tools.",
  },
  {
    question: "How do demos and pricing work?",
    answer:
      "We start with a complimentary demo for leadership and supervisors focused on day-to-day operations. Pricing is custom for single sites and multi-site groups—request a demo and we’ll tailor next steps to your campuses.",
  },
];
