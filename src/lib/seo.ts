import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

/** Turn a site path or absolute URL into an absolute https URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
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
      canonical: path,
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
