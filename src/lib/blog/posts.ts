import { images } from "@/lib/images";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  excerpt: string;
  author: string;
  /** Display date, e.g. "Jun 3, 2026". */
  date: string;
  /** ISO date for sitemap. */
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: "Communities" | "Families";
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "schedule-extra-care-without-agency-minimums",
    title:
      "How Independent Living Communities Schedule Extra Care Without Agency Minimums",
    description:
      "Why hour minimums block flexible care in independent living—and how communities schedule on-demand visits staff can actually run.",
    excerpt:
      "Traditional home-care minimums do not fit independent living. Here is how operators schedule extra help by the visit instead of by the half-day block.",
    author: "TLC CareNow",
    date: "Jun 3, 2026",
    publishedAt: "2026-06-03",
    readTime: "6 min read",
    image: images.blogGuides.communities,
    imageAlt:
      "Staff reviewing care schedules on a tablet in a senior living community",
    category: "Communities",
    body: [
      {
        type: "p",
        text: "Independent living communities are built for active residents who want choice—not a full home-health contract every time someone needs an extra hand. Yet many operators still rely on outside agencies that require two- or four-hour minimums. That mismatch creates gaps: residents delay asking for help, families get frustrated, and staff end up coordinating care in texts and spreadsheets.",
      },
      {
        type: "h2",
        text: "Why agency minimums clash with independent living",
      },
      {
        type: "p",
        text: "Agency minimums made sense when care was delivered almost entirely in private homes. In a senior living community, needs are often shorter and more frequent: a shower assist before an outing, medication reminders, companionship after a procedure, or help unpacking after a move. Charging for four hours when someone needs forty-five minutes erodes trust and pushes work to informal favors instead of documented care.",
      },
      {
        type: "ul",
        items: [
          "Residents wait until needs pile up instead of booking early.",
          "Supervisors cannot see demand until someone complains.",
          "Billing and scheduling live in different systems—or in email.",
        ],
      },
      {
        type: "h2",
        text: "What “by the visit” scheduling looks like on the ground",
      },
      {
        type: "p",
        text: "Communities that move away from minimums usually standardize three things: clear visit types, staff who can book on behalf of residents, and a shared calendar the whole team trusts. Supervisors book or rebook in minutes; care professionals see the day on one screen; leadership gets visibility without another complicated platform.",
      },
      {
        type: "p",
        text: "TLC CareNow is built for that operating model—transparent scheduling, role-based dashboards, and the ability to stack visits across a day or week without treating every request like a home-health admission. Operators keep control; residents and families use the same platform to book and stay informed.",
      },
      {
        type: "h2",
        text: "Practical steps your community can take",
      },
      {
        type: "ul",
        items: [
          "List your most common non-clinical visit types and typical durations.",
          "Train front desk and nursing leadership to book on behalf of residents when needed.",
          "Publish how families request same-day or short-term help—one path, not five.",
          "Review weekly demand so staffing matches real patterns, not guesswork.",
        ],
      },
      {
        type: "p",
        text: "You do not have to rip out every vendor on day one. Start with one building or one service line, measure fill rates and resident satisfaction, then expand. The goal is predictable operations for your team and flexible care for residents—without paying for unused hours.",
      },
      {
        type: "p",
        text: "If you operate multiple sites or want a walkthrough of dashboards and booking workflows, see Enterprise Solutions or request a demo through our contact page.",
      },
    ],
  },
  {
    slug: "on-demand-care-for-families-in-senior-living",
    title:
      "What Families Should Know About On-Demand Care in Senior Living",
    description:
      "How families book extra care in independent living and senior living—what to expect, how scheduling works, and questions to ask your community.",
    excerpt:
      "On-demand care is not the same as moving to assisted living. Here is how families request help inside a senior living community and what good communication looks like.",
    author: "TLC CareNow",
    date: "Jun 3, 2026",
    publishedAt: "2026-06-03",
    readTime: "5 min read",
    image: images.blogGuides.families,
    imageAlt:
      "Family member spending time with a loved one in a senior living setting",
    category: "Families",
    body: [
      {
        type: "p",
        text: "When a parent lives in independent living or another senior living setting, families often assume the community provides every hour of hands-on help. In reality, many communities offer a lifestyle-focused bundle—meals, activities, safety—and partner with on-demand care so residents can add personal support when needs change. Understanding that split prevents surprises and helps you advocate clearly.",
      },
      {
        type: "h2",
        text: "On-demand care vs. a higher level of care",
      },
      {
        type: "p",
        text: "On-demand care usually covers non-medical support: bathing, dressing, transfers, companionship, light housekeeping, escorts to appointments, and similar tasks booked by the visit or by the hour without a large agency minimum. It is not a substitute for skilled nursing or assisted living unless your community’s clinical team says otherwise. If needs are escalating every week, schedule a care conference with the community—not only more visits.",
      },
      {
        type: "h2",
        text: "How booking typically works",
      },
      {
        type: "p",
        text: "In communities that use TLC CareNow, residents or families book through the CareNow app; staff can also book on a resident’s behalf. You should see confirmation, timing, and who is assigned—not a vague promise that “someone will stop by.” Same-day requests may depend on staffing; asking earlier in the day improves the odds.",
      },
      {
        type: "ul",
        items: [
          "Confirm whether your community uses one scheduling system or several vendors.",
          "Ask who to call if a visit is late or canceled.",
          "Keep emergency and after-hours numbers separate from routine booking lines.",
        ],
      },
      {
        type: "h2",
        text: "Questions worth asking before you need help",
      },
      {
        type: "ul",
        items: [
          "What visit lengths are available, and are there minimum hours?",
          "How are care professionals vetted and trained for this property?",
          "How do charges appear—on a community bill, a separate invoice, or both?",
          "Can out-of-town family members get updates without calling the desk repeatedly?",
        ],
      },
      {
        type: "h2",
        text: "Tips for adult children and spouses",
      },
      {
        type: "p",
        text: "Share the login or booking process with one other family member so no single person becomes the bottleneck. After a hospital stay or illness, book a short pattern of visits (for example, morning and evening for one week) instead of assuming one long block will cover recovery. Note what went well in a short email to the supervisor—positive feedback helps communities staff the right skill mix.",
      },
      {
        type: "p",
        text: "If your community offers CareNow, you can sign in at app.tlccarenow.com to book care. For general questions about whether CareNow serves your building, contact the community office or reach TeamLife through our contact page.",
      },
    ],
  },
  {
    slug: "depression-in-elderly-people",
    title:
      "Depression in Elderly People: Tips for Helping Your Aging Loved One",
    description:
      "Recognizing depression in older adults and practical ways families can support an aging loved one.",
    excerpt:
      "Changes in mood, appetite, or isolation can signal depression in older adults. Here is what families can watch for and when to seek help.",
    author: "Stephanie Stewart",
    date: "Mar 31, 2021",
    publishedAt: "2021-03-31",
    readTime: "3 min read",
    image: images.blogGuides.caregiving,
    imageAlt: "Caregiver supporting an older adult at home",
    category: "Families",
    body: [
      {
        type: "p",
        text: "Melissa* could tell that her father was suffering. He'd dropped several pounds in the last few months, was reluctant to bathe and kept to himself more than usual.",
      },
      {
        type: "p",
        text: "Depression in older adults is common and often overlooked. Changes in health, mobility, or social connection can contribute to feelings of sadness or withdrawal.",
      },
      {
        type: "p",
        text: "If you notice persistent changes in mood, appetite, sleep, or interest in activities, talk with their physician. Professional support, social engagement, and compassionate daily care can make a meaningful difference.",
      },
    ],
  },
];

const postsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Newest first for the index page. */
export function getBlogPostsForIndex(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
