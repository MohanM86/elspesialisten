"use client";

import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StickyMobileCTAProps {
  phoneNumber?: string;
}

export default function StickyMobileCTA({ phoneNumber = "+4780000000" }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setVisible(window.scrollY > 400); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("sticky-cta-bar lg:hidden transition-transform duration-300", visible ? "translate-y-0" : "translate-y-full")} aria-label="Hurtigkontakt">
      <a href={`tel:${phoneNumber}`} className="btn-phone flex-1 justify-center gap-2 text-[0.875rem]">
        <Phone className="w-4 h-4 flex-shrink-0" aria-hidden />Ring nå
      </a>
      <Link href="/kontakt" className="btn-primary flex-1 justify-center gap-2 text-[0.875rem]">
        <FileText className="w-4 h-4 flex-shrink-0" aria-hidden />Gratis tilbud
      </Link>
    </div>
  );
}
