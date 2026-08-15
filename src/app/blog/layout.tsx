import type { ReactNode } from "react";
import { BlogAdSense } from "@/components/BlogAdSense";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogAdSense />
      {children}
    </>
  );
}
