import Link from "next/link";

export type BlogBreadcrumbItem = {
  label: string;
  href?: string;
};

type BlogBreadcrumbsProps = {
  items: BlogBreadcrumbItem[];
};

export function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol className="blog-breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="blog-breadcrumbs-item">
              {index > 0 ? (
                <span className="blog-breadcrumbs-sep" aria-hidden>
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="blog-breadcrumbs-link">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="blog-breadcrumbs-current"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
