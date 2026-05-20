import { GetInTouchSection } from "@/components/GetInTouchSection";
import { PageShell } from "@/components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageShell>
      <GetInTouchSection />
    </PageShell>
  );
}
