import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const DEFAULT_OG_IMAGE = "/apple-icon.png";

function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/" || path === "") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  openGraphType?: "website" | "article";
  /** ISO date for article pages. */
  publishedTime?: string;
};

/** Page-level SEO: title, description, canonical, Open Graph, and Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const desc = description ?? site.description;
  const ogTitle = title ?? site.name;
  const url = absoluteUrl(path);

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: openGraphType,
    url,
    title: ogTitle,
    description: desc,
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 180,
        height: 180,
        alt: site.name,
      },
    ],
    ...(openGraphType === "article" && publishedTime
      ? { publishedTime }
      : {}),
  };

  return {
    ...(title !== undefined ? { title } : {}),
    description: desc,
    alternates: {
      canonical: path,
    },
    openGraph,
    twitter: {
      card: "summary",
      title: ogTitle,
      description: desc,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    logo: `${url}/logo.svg`,
    email: site.email,
    telephone: site.phoneHeader,
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
    name: site.name,
    url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  image?: string;
}) {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: site.name,
      url,
    },
    publisher: {
      "@type": "Organization",
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
    ...(post.image ? { image: [post.image] } : {}),
  };
}
