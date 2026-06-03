import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type PageShellProps = {
  children: React.ReactNode;
  /** Full-width white background behind header + page content (analytics admin). */
  variant?: "default" | "analytics-panel";
};

export function PageShell({ children, variant = "default" }: PageShellProps) {
  if (variant === "analytics-panel") {
    return (
      <div className="analytics-site-outer">
        <div className="analytics-site-panel">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
