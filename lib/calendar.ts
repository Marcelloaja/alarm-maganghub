export interface CalendarConfig {
  title: string;
  reminderTime: string; // e.g. "16:30"
  durationMinutes: number; // e.g. 30
  startDate: string; // e.g. "2026-10-20"
  endDate: string; // e.g. "2027-04-20"
  workDays: ('MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA')[];
  includeSaturday: boolean;
  alertLeadMinutes: number; // e.g. 15
  secondAlertMinutes?: number; // e.g. 0 (at event start)
  customNotes?: string;
}

export const DEFAULT_CONFIG: CalendarConfig = {
  title: "📝 Isi Logbook Harian MagangHub Kemnaker",
  reminderTime: "16:00",
  durationMinutes: 30,
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 6 months default
  workDays: ['MO', 'TU', 'WE', 'TH', 'FR'],
  includeSaturday: false,
  alertLeadMinutes: 15,
  secondAlertMinutes: 0,
  customNotes: "Jangan lupa isi aktivitas harian, pencapaian tugas, dan presensi keluar di portal Monev.",
};

export const MONEV_URL = "https://monev.maganghub.kemnaker.go.id/";

export function buildEventDescription(notes?: string): string {
  return [
    "🔔 PENGINGAT HARIAN MAGANGHUB KEMNAKER",
    "-----------------------------------------",
    "Waktunya mengisi logbook dan presensi harian agar laporan magang Anda tetap aman dan disetujui pembimbing.",
    "",
    `🔗 Link Portal Monev: ${MONEV_URL}`,
    "",
    "📋 Panduan Format Pengisian:",
    "1. Rincian Kegiatan: Apa yang dikerjakan hari ini?",
    "2. Hasil / Output: Dokumen/fitur/data yang diselesaikan.",
    "3. Kendala & Solusi: Masalah yang dihadapi (jika ada).",
    "",
    notes ? `📌 Catatan Pribadi:\n${notes}\n` : "",
    "-----------------------------------------",
    "Dibuat via Pengingat MagangHub (Kemnaker) - Siap Vercel",
  ].join("\n");
}

function formatGoogleDate(dateStr: string, timeStr: string): string {
  // Returns YYYYMMDDTHHMMSS
  const [year, month, day] = dateStr.split("-");
  const [hours, minutes] = timeStr.split(":");
  return `${year}${month}${day}T${hours}${minutes}00`;
}

function calculateEndTime(timeStr: string, durationMinutes: number): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor((totalMinutes % 1440) / 60)
    .toString()
    .padStart(2, "0");
  const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${endHours}:${endMinutes}`;
}

export function generateGoogleCalendarUrl(config: CalendarConfig): string {
  const endTimeStr = calculateEndTime(config.reminderTime, config.durationMinutes);
  const startDt = formatGoogleDate(config.startDate, config.reminderTime);
  const endDt = formatGoogleDate(config.startDate, endTimeStr);

  const activeDays = config.includeSaturday
    ? ['MO', 'TU', 'WE', 'TH', 'FR', 'SA']
    : ['MO', 'TU', 'WE', 'TH', 'FR'];

  // Until date in UTC representation: YYYYMMDD
  const untilFormatted = config.endDate.replace(/-/g, "") + "T235959Z";
  const rrule = `RRULE:FREQ=WEEKLY;BYDAY=${activeDays.join(",")};UNTIL=${untilFormatted}`;

  const description = buildEventDescription(config.customNotes);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: config.title,
    dates: `${startDt}/${endDt}`,
    details: description,
    location: MONEV_URL,
    recur: rrule,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateIcsContent(config: CalendarConfig): string {
  const endTimeStr = calculateEndTime(config.reminderTime, config.durationMinutes);
  const startDt = formatGoogleDate(config.startDate, config.reminderTime);
  const endDt = formatGoogleDate(config.startDate, endTimeStr);

  const activeDays = config.includeSaturday
    ? ['MO', 'TU', 'WE', 'TH', 'FR', 'SA']
    : ['MO', 'TU', 'WE', 'TH', 'FR'];

  const untilFormatted = config.endDate.replace(/-/g, "") + "T235959Z";
  const rrule = `FREQ=WEEKLY;BYDAY=${activeDays.join(",")};UNTIL=${untilFormatted}`;

  const descriptionEscaped = buildEventDescription(config.customNotes)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

  const summaryEscaped = config.title
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MagangHub Reminder System//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Logbook MagangHub Kemnaker",
    "X-WR-TIMEZONE:Asia/Jakarta",
    "BEGIN:VEVENT",
    `UID:maganghub-alarm-${Date.now()}@maganghub-reminder`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `RRULE:${rrule}`,
    `SUMMARY:${summaryEscaped}`,
    `DESCRIPTION:${descriptionEscaped}`,
    `LOCATION:${MONEV_URL}`,
    "STATUS:CONFIRMED",
  ];

  // Lead alert (e.g. 15 minutes before)
  if (config.alertLeadMinutes > 0) {
    lines.push(
      "BEGIN:VALARM",
      `TRIGGER:-PT${config.alertLeadMinutes}M`,
      "ACTION:DISPLAY",
      "DESCRIPTION:Pengingat Logbook MagangHub sebentar lagi!",
      "END:VALARM"
    );
  }

  // Exact time alert
  if (config.secondAlertMinutes !== undefined) {
    lines.push(
      "BEGIN:VALARM",
      "TRIGGER:-PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Waktunya mengisi logbook MagangHub sekarang!",
      "END:VALARM"
    );
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\r\n");
}
