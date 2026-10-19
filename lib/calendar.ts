export interface CalendarConfig {
  title: string;
  reminderTime: string; // e.g. "16:00"
  durationMinutes: number; // e.g. 30
  startDate: string; // e.g. "2026-10-15"
  endDate: string; // e.g. "2027-04-15"
  workDays: ('MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA')[];
  includeSaturday: boolean;
  alertLeadMinutes: number; // e.g. 15
  secondAlertMinutes?: number; // e.g. 0
  includeBalaiBahasa: boolean;
  customNotes?: string;
}

export const MONEV_URL = "https://monev.maganghub.kemnaker.go.id/";
export const BALAI_BAHASA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSecc8VWurCDuqarEYn0IKoM4iQAWH5P_uIJm7Uai0PqzE4Uhg/viewform";

export const DEFAULT_CONFIG: CalendarConfig = {
  title: "📝 Absen & Logbook Harian (Balai Bahasa & Kemnaker)",
  reminderTime: "16:00",
  durationMinutes: 30,
  startDate: "2026-09-20",
  endDate: "2027-03-20",
  workDays: ['MO', 'TU', 'WE', 'TH', 'FR'],
  includeSaturday: false,
  alertLeadMinutes: 15,
  secondAlertMinutes: 0,
  includeBalaiBahasa: true,
  customNotes: "Segera isi kedua link sebelum beres-beres pulang jam 4 sore.",
};

export function buildEventDescription(notes?: string, includeBalaiBahasa: boolean = true): string {
  const lines: string[] = [
    "🔔 PENGINGAT HARIAN MAGANG (2 ABSENSI WAJIB)",
    "=========================================",
    "⚠️ Jangan lupa ada 2 presensi yang wajib diisi sore ini sebelum pulang:",
    "",
  ];

  if (includeBalaiBahasa) {
    lines.push(
      "1️⃣ ABSENSI BALAI BAHASA JATIM (Internal Wajib):",
      `🔗 Link GForm: ${BALAI_BAHASA_FORM_URL}`,
      "📌 Aturan Balai Bahasa Jatim:",
      "• Hanya 1 KALI kesempatan pengisian.",
      "• Jika ada kendala (ban bocor, darurat, dll), konfirmasi di Grup Besar ke Bu Retno & Bu Ina.",
      "• Simpan screenshot bukti submit jika dibutuhkan verifikasi.",
      ""
    );
  }

  lines.push(
    "2️⃣ LOGBOOK & PRESENSI MONEV KEMNAKER (Pusat Wajib):",
    `🔗 Link Portal: ${MONEV_URL}`,
    "📌 Format Catatan Logbook:",
    "• Kegiatan: Aktivitas pekerjaan hari ini",
    "• Output: Hasil fisik/digital/dokumen yang selesai",
    "• Kendala: Masalah & solusi tindak lanjut",
    "• Jangan lupa klik tombol presensi keluar/pulang",
    ""
  );

  if (notes) {
    lines.push(`📌 Catatan Tambahan:\n${notes}\n`);
  }

  lines.push(
    "=========================================",
    "MonevHub Companion - Balai Bahasa Jatim x Kemnaker"
  );

  return lines.join("\n");
}

function formatGoogleDate(dateStr: string, timeStr: string): string {
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

  const untilFormatted = config.endDate.replace(/-/g, "") + "T235959Z";
  const rrule = `RRULE:FREQ=WEEKLY;BYDAY=${activeDays.join(",")};UNTIL=${untilFormatted}`;

  const description = buildEventDescription(config.customNotes, config.includeBalaiBahasa);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: config.title,
    dates: `${startDt}/${endDt}`,
    details: description,
    location: config.includeBalaiBahasa
      ? `${BALAI_BAHASA_FORM_URL} | ${MONEV_URL}`
      : MONEV_URL,
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

  const descriptionEscaped = buildEventDescription(config.customNotes, config.includeBalaiBahasa)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

  const summaryEscaped = config.title
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

  const locationEscaped = (config.includeBalaiBahasa
    ? `${BALAI_BAHASA_FORM_URL} | ${MONEV_URL}`
    : MONEV_URL
  ).replace(/,/g, "\\,");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MagangHub Balai Bahasa Jatim//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Absen Balai Bahasa Jatim & Kemnaker",
    "X-WR-TIMEZONE:Asia/Jakarta",
    "BEGIN:VEVENT",
    `UID:maganghub-alarm-${Date.now()}@maganghub-reminder`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `RRULE:${rrule}`,
    `SUMMARY:${summaryEscaped}`,
    `DESCRIPTION:${descriptionEscaped}`,
    `LOCATION:${locationEscaped}`,
    "STATUS:CONFIRMED",
  ];

  if (config.alertLeadMinutes > 0) {
    lines.push(
      "BEGIN:VALARM",
      `TRIGGER:-PT${config.alertLeadMinutes}M`,
      "ACTION:DISPLAY",
      "DESCRIPTION:Waktunya isi Absen Balai Bahasa & Logbook Kemnaker!",
      "END:VALARM"
    );
  }

  if (config.secondAlertMinutes !== undefined) {
    lines.push(
      "BEGIN:VALARM",
      "TRIGGER:-PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Jam 4 Pulang! Jangan lupa submit kedua presensi sekarang.",
      "END:VALARM"
    );
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\r\n");
}
