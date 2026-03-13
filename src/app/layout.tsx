import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { buildLocalBusinessSchema } from "@/lib/utils";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elspesialisten.no"),
  title: {
    default: "Elspesialisten – Finn sertifisert elektriker i din kommune",
    template: "%s | Elspesialisten",
  },
  description: "Norges ledende plattform for elektriker og elektrotjenester. Finn sertifiserte elektrikere til elbillader, sikringsskap, smarthus og mer. Gratis og uforpliktende tilbud i hele Norge.",
  keywords: ["elektriker", "elektriker nærmest meg", "elbillader installasjon", "bytte sikringsskap", "smarthus elektriker", "akutt elektriker", "elektriker pris", "el kontroll", "varmekabler", "elektriker tilbud"],
  authors: [{ name: "Elspesialisten", url: "https://elspesialisten.no" }],
  creator: "Elspesialisten",
  publisher: "Elspesialisten",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", locale: "nb_NO", url: "https://elspesialisten.no", siteName: "Elspesialisten", title: "Elspesialisten – Finn sertifisert elektriker i din kommune", description: "Norges ledende plattform for elektriker og elektrotjenester. Gratis tilbud fra sertifiserte elektrikere i hele Norge.", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Elspesialisten – Norges elektrikerplattform" }] },
  twitter: { card: "summary_large_image", title: "Elspesialisten – Finn sertifisert elektriker i din kommune", description: "Norges ledende plattform for elektriker og elektrotjenester.", images: ["/og-image.jpg"] },
  alternates: { canonical: "https://elspesialisten.no" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = buildLocalBusinessSchema();

  return (
    <html lang="nb" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="min-h-screen bg-surface-base font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn-primary">Hopp til innhold</a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
