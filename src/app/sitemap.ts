import type { MetadataRoute } from "next";
import { KOMMUNER, FYLKER } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";
import { OSLO_BYDELER } from "@/data/oslo-bydeler";
import { BERGEN_BYDELER } from "@/data/bergen-bydeler";
import { TRONDHEIM_BYDELER } from "@/data/trondheim-bydeler";

const BASE_URL = "https://elspesialisten.no";
const GUIDE_SLUGS = ["hva-koster-elektriker","elbillader-pris","bytte-sikringsskap","installere-elbillader-selv","smarthus-installasjon","varmekabler-bad","jordfeil-og-sikringer","elkontroll-bolig","elektriker-akutt","nyttanlegg-pris"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/elektriker`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/priser`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kalkulator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guider`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/om-oss`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/kalkulator/elbillader`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kalkulator/sikringsskap`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kalkulator/elektriker`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
  const kommunePages: MetadataRoute.Sitemap = KOMMUNER.map((k) => ({ url: `${BASE_URL}/kommune/${k.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const fylkePages: MetadataRoute.Sitemap = FYLKER.map((f) => ({ url: `${BASE_URL}/fylke/${f.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const tjenesterPages: MetadataRoute.Sitemap = TJENESTER.map((t) => ({ url: `${BASE_URL}/tjenester/${t.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({ url: `${BASE_URL}/guider/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 }));
  const bydelPages: MetadataRoute.Sitemap = [
    ...OSLO_BYDELER.map((b) => ({ url: `${BASE_URL}/kommune/oslo/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...BERGEN_BYDELER.map((b) => ({ url: `${BASE_URL}/kommune/bergen/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...TRONDHEIM_BYDELER.map((b) => ({ url: `${BASE_URL}/kommune/trondheim/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
  return [...staticPages, ...tjenesterPages, ...fylkePages, ...kommunePages, ...bydelPages, ...guidePages];
}
