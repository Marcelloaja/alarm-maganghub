import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CONFIG, generateIcsContent } from "@/lib/calendar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const time = searchParams.get("time") || DEFAULT_CONFIG.reminderTime;
  const startDate = searchParams.get("start") || DEFAULT_CONFIG.startDate;
  const endDate = searchParams.get("end") || DEFAULT_CONFIG.endDate;
  const includeSat = searchParams.get("sat") === "true";
  const alertLead = Number(searchParams.get("alert")) || 15;

  const icsData = generateIcsContent({
    ...DEFAULT_CONFIG,
    reminderTime: time,
    startDate,
    endDate,
    includeSaturday: includeSat,
    alertLeadMinutes: alertLead,
  });

  return new NextResponse(icsData, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="maganghub-reminder.ics"',
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
