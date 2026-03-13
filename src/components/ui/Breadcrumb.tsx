import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const allItems = [{ navn: "Hjem", href: "/" }, ...items];
  const schema = buildBreadcrumbSchema(allItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Brødsmulesti" className={className}>
        <ol className="breadcrumb">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {idx === 0 && <Home className="w-3 h-3 text-neutral-400 flex-shrink-0" aria-hidden />}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-primary-600 transition-colors">{item.navn}</Link>
                ) : (
                  <span className={isLast ? "text-secondary-700 font-medium" : ""} aria-current={isLast ? "page" : undefined}>{item.navn}</span>
                )}
                {!isLast && <ChevronRight className="w-3 h-3 text-neutral-300 breadcrumb-sep flex-shrink-0" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
