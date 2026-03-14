import type { Metadata } from "next";
import KommuneSide from "@/app/kommune/[slug]/page";
import { ELEKTRIKER_PER_KOMMUNE } from "@/data/elektrikere-stats";

export async function generateMetadata(): Promise<Metadata> {
  const ant = ELEKTRIKER_PER_KOMMUNE["trondheim"] || 0;
  const title = `Elektriker Trondheim | ${ant} bedrifter | Elspesialisten`;
  const desc = `Elektriker i Trondheim. ${ant} registrerte bedrifter. Få hjelp med sikringsskap, elbillader, smarthus og akutt strømproblemer.`;
  return {
    title, description: desc,
    alternates: { canonical: "https://elspesialisten.no/kommune/trondheim" },
    openGraph: { title, description: desc, url: "https://elspesialisten.no/kommune/trondheim", type: "website", siteName: "Elspesialisten", locale: "nb_NO" },
  };
}

export default function TrondheimPage() {
  return KommuneSide({ params: Promise.resolve({ slug: "trondheim" }) });
}
