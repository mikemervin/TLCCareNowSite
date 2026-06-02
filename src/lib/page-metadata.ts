import type { Metadata } from "next";

/** Page-level title, description, and canonical path (relative to metadataBase). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  return {
    ...(title !== undefined ? { title } : {}),
    ...(description !== undefined ? { description } : {}),
    alternates: {
      canonical: path,
    },
  };
}
