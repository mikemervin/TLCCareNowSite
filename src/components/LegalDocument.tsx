import Link from "next/link";
import { legalLastUpdated } from "@/lib/legal";
import { site } from "@/lib/site";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: ReadonlyArray<string>;
  list?: ReadonlyArray<string>;
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  sections: ReadonlyArray<LegalSection>;
  sibling?: { href: string; label: string };
};

export function LegalDocument({
  title,
  intro,
  sections,
  sibling,
}: LegalDocumentProps) {
  return (
    <article className="legal-document">
      <header className="legal-document-header">
        <p className="legal-document-updated">Last updated {legalLastUpdated}</p>
        <h1 className="legal-document-title">{title}</h1>
        <p className="legal-document-intro">{intro}</p>
      </header>

      <div className="legal-document-body">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="legal-document-section"
          >
            <h2 className="legal-document-section-title">{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={`${section.id}-p-${i}`}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul className="legal-document-list">
                {section.list.map((item, i) => (
                  <li key={`${section.id}-li-${i}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <footer className="legal-document-footer">
        {sibling ? (
          <p className="legal-document-sibling">
            See also{" "}
            <Link href={sibling.href} className="legal-document-link">
              {sibling.label}
            </Link>
          </p>
        ) : null}
        <p>
          <Link href="/contact" className="legal-document-link">
            Contact us
          </Link>{" "}
          ·{" "}
          <a
            href={`mailto:${site.email}`}
            className="legal-document-link"
          >
            {site.email}
          </a>
        </p>
      </footer>
    </article>
  );
}
