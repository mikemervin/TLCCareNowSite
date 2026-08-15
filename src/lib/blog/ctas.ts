import type { BlogPost } from "@/lib/blog/posts";

export type BlogArticleCta = {
  href: string;
  label: string;
  primary?: boolean;
};

const wellnessSlugs = new Set([
  "physical-activity-for-seniors-in-independent-living",
  "healthy-eating-for-seniors-in-independent-living",
]);

/** Intent-aware footer CTAs so posts reinforce owner pages instead of only Contact. */
export function getBlogArticleCtas(post: BlogPost): BlogArticleCta[] {
  if (wellnessSlugs.has(post.slug)) {
    return [
      { href: "/", label: "Explore CareNow", primary: true },
      { href: "/campus-care", label: "Campus Care wellness" },
      { href: "/contact", label: "Contact" },
    ];
  }

  if (post.slug === "schedule-extra-care-without-agency-minimums") {
    return [
      { href: "/", label: "Book CareNow for your campus", primary: true },
      { href: "/enterprise", label: "See Enterprise tools" },
      { href: "/contact", label: "Talk with our team" },
    ];
  }

  if (post.category === "Communities") {
    return [
      { href: "/enterprise", label: "See Enterprise solutions", primary: true },
      { href: "/", label: "How CareNow works" },
      { href: "/contact", label: "Request a demo" },
    ];
  }

  return [
    { href: "/", label: "Explore CareNow", primary: true },
    { href: "/contact", label: "Get in touch" },
  ];
}

export function getBlogArticleCtaLead(post: BlogPost): string {
  if (wellnessSlugs.has(post.slug)) {
    return "Want flexible care visits—or campus wellness programs? Here’s where to go next.";
  }
  if (post.category === "Communities") {
    return "See how operators use CareNow on campus—or talk with our team about a partnership.";
  }
  return "Questions about CareNow for your loved one or community? Explore how it works, or get in touch.";
}
