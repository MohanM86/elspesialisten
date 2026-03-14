/*
  /kommune/oslo/page.tsx
  
  This page is needed because the /kommune/oslo/ directory exists (for bydel sub-routes).
  Next.js static directories take priority over [slug] dynamic routes, so without this
  file, /kommune/oslo would 404.
  
  We import and render the same KommuneSide component from [slug], passing slug="oslo".
*/

import type { Metadata } from "next";
import KommuneSide from "@/app/kommune/[slug]/page";
import { getKommune } from "@/data/kommuner";
import { ELEKTRIKER_PER_KOMMUNE } from "@/data/elektrikere-stats";

export async function generateMetadata(): Promise<Metadata> {
  const kommune = getKommune("oslo")!;
  const ant = ELEKTRIKER_PER_KOMMUNE["oslo"] || 0;
  const title = `Elektriker Oslo | ${ant} bedrifter | Elspesialisten`;
  const desc = `Elektriker i Oslo. ${ant} registrerte bedrifter. Få hjelp med sikringsskap, elbillader, feilsøking og akutt strømproblemer.`;
  return {
    title,
    description: desc,
    alternates: { canonical: "https://elspesialisten.no/kommune/oslo" },
    openGraph: { title, description: desc, url: "https://elspesialisten.no/kommune/oslo", type: "website", siteName: "Elspesialisten", locale: "nb_NO" },
  };
}

export default function OsloPage() {
  return KommuneSide({ params: Promise.resolve({ slug: "oslo" }) });
}
