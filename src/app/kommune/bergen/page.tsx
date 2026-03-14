/*
  /kommune/bergen/page.tsx
  Same pattern as oslo/page.tsx — needed because the /kommune/bergen/ directory
  exists for bydel sub-routes.
*/

import type { Metadata } from "next";
import KommuneSide from "@/app/kommune/[slug]/page";
import { getKommune } from "@/data/kommuner";
import { ELEKTRIKER_PER_KOMMUNE } from "@/data/elektrikere-stats";

export async function generateMetadata(): Promise<Metadata> {
  const kommune = getKommune("bergen")!;
  const ant = ELEKTRIKER_PER_KOMMUNE["bergen"] || 0;
  const title = `Elektriker Bergen | ${ant} bedrifter | Elspesialisten`;
  const desc = `Elektriker i Bergen. ${ant} registrerte bedrifter. Få hjelp med sikringsskap, elbillader, feilsøking og akutt strømproblemer.`;
  return {
    title,
    description: desc,
    alternates: { canonical: "https://elspesialisten.no/kommune/bergen" },
    openGraph: { title, description: desc, url: "https://elspesialisten.no/kommune/bergen", type: "website", siteName: "Elspesialisten", locale: "nb_NO" },
  };
}

export default function BergenPage() {
  return KommuneSide({ params: Promise.resolve({ slug: "bergen" }) });
}
