import type { Metadata } from "next";
import { site, socialLinks } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

/** Turn a site path or absolute URL into an absolute https URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  if (path === "/" || path === "") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`;
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  openGraphType?: "website" | "article";
  /** ISO date for article pages. */
  publishedTime?: string;
  /** Relative path or absolute URL for OG / Twitter / social previews. */
  image?: string;
  /** Article authors (names). */
  authors?: string[];
};

/** Page-level SEO: title, description, canonical, Open Graph, and Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
  publishedTime,
  image,
  authors,
}: PageMetadataOptions): Metadata {
  const desc = description ?? site.description;
  const ogTitle = title ?? site.name;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : undefined;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: openGraphType,
    url,
    title: ogTitle,
    description: desc,
    siteName: site.name,
    locale: "en_US",
    ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    ...(openGraphType === "article"
      ? {
          ...(publishedTime ? { publishedTime } : {}),
          ...(authors?.length ? { authors } : {}),
        }
      : {}),
  };

  return {
    ...(title !== undefined ? { title } : {}),
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: site.name,
    url,
    logo: `${url}/logo.svg`,
    email: site.email,
    telephone: site.phoneHeader,
    sameAs: socialLinks.map((link) => link.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneHeader,
        email: site.email,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "TeamLife Health Group",
      url: site.teamLifeUrl,
    },
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: site.name,
    url,
    description: site.description,
    inLanguage: "en-US",
    publisher: {
      "@id": organizationId(),
    },
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function contactPageJsonLd() {
  const url = absoluteUrl("/contact");
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contactpage`,
    name: `Contact ${site.name}`,
    description:
      "Contact TeamLife for TLC CareNow demos, community partnerships, and questions about care scheduling for independent living.",
    url,
    isPartOf: {
      "@id": `${getSiteUrl()}/#website`,
    },
    about: {
      "@id": organizationId(),
    },
  };
}

export function softwareApplicationJsonLd() {
  const url = absoluteUrl("/enterprise");
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${site.name} Enterprise`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Care scheduling and operations software for independent living and senior living operators—visit-based booking, role-based dashboards, and payroll visibility.",
    url,
    provider: {
      "@id": organizationId(),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Custom pricing — request a demo",
      url: absoluteUrl("/contact"),
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  image?: string;
  author?: string;
}) {
  const url = getSiteUrl();
  const imageUrl = post.image ? absoluteUrl(post.image) : undefined;
  const authorName = post.author?.trim() || site.name;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: authorName,
      url,
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationId(),
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`,
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };
}
