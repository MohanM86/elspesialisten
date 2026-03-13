import { NextRequest, NextResponse } from "next/server";
import type { LeadFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const data: LeadFormData = await req.json();
    if (!data.navn || !data.telefon || !data.postnummer || !data.oppdragType || !data.samtykke) {
      return NextResponse.json({ success: false, error: "Manglende påkrevde felter." }, { status: 400 });
    }
    if (!/^\d{4}$/.test(data.postnummer)) {
      return NextResponse.json({ success: false, error: "Ugyldig postnummer." }, { status: 400 });
    }
    if (process.env.NODE_ENV === "development") { console.log("[LEAD]", JSON.stringify(data, null, 2)); }
    return NextResponse.json({ success: true, id: `lead_${Date.now()}` }, { status: 201 });
  } catch (err) {
    console.error("[LEAD API ERROR]", err);
    return NextResponse.json({ success: false, error: "Intern serverfeil. Prøv igjen." }, { status: 500 });
  }
}
