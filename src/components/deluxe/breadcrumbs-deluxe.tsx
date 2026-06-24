import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

/**
 * BreadcrumbsDeluxe — Breadcrumbs visibles + Schema BreadcrumbList.
 *
 * SEO: genera JSON-LD BreadcrumbList para Google Rich Results.
 * UX: navegación visual con links indexables.
 */
export function BreadcrumbsDeluxe({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop"}${item.href}`
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[12px] text-[#86868B] flex-wrap mb-4">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-[#1D1D1F] transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-[#1D1D1F] font-medium">{item.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3 w-3" strokeWidth={1.5} />}
          </span>
        ))}
      </nav>
    </>
  );
}
