"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Bell,
  CheckCircle2,
  CalendarPlus,
  Download,
  Share2,
  Copy,
  ExternalLink,
  Info,
  CalendarDays,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import {
  CalendarConfig,
  DEFAULT_CONFIG,
  generateGoogleCalendarUrl,
  generateIcsContent,
  MONEV_URL,
} from "@/lib/calendar";

export default function CalendarGenerator() {
  const [config, setConfig] = useState<CalendarConfig>(DEFAULT_CONFIG);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [originUrl, setOriginUrl] = useState("");

  useEffect(() => {
    // Load from localStorage if previously configured
    try {
      const saved = localStorage.getItem("maganghub_calendar_config");
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      setOriginUrl(window.location.origin);
    }
  }, []);

  const updateConfig = (newVal: Partial<CalendarConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newVal };
      try {
        localStorage.setItem("maganghub_calendar_config", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDownloadIcs = () => {
    const icsContent = generateIcsContent(config);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pengingat-maganghub.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyWebcalUrl = () => {
    const baseUrl = originUrl || "https://alarm-maganghub.vercel.app";
    const webcalUrl = `${baseUrl}/api/calendar.ics?time=${config.reminderTime}&start=${config.startDate}&end=${config.endDate}&sat=${config.includeSaturday}&alert=${config.alertLeadMinutes}`;
    navigator.clipboard.writeText(webcalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyDescription = () => {
    const text = `Link Portal Monev: ${MONEV_URL}\n\nFormat Pengisian:\n1. Rincian Kegiatan Hari Ini\n2. Output / Hasil\n3. Kendala & Solusi`;
    navigator.clipboard.writeText(text);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const gcalUrl = generateGoogleCalendarUrl(config);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Configuration Form */}
      <div className="space-y-6 lg:col-span-7">
        {/* Intro Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Pengingat Masuk Langsung ke HP Anda
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tanpa perlu install aplikasi aneh atau harus buka website setiap jam. Cukup
                simpan jadwal ini sekali ke Google Calendar, HP Anda akan otomatis berbunyi &
                memunculkan notifikasi setiap sore sebelum jam pulang kerja.
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Settings Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            1. Atur Jadwal & Waktu Pengingat
          </h3>

          <div className="mt-5 space-y-5">
            {/* Reminder Time */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Jam Alarm Logbook
                </label>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  Kantor Pulang Jam 4 Sore (16:00)
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Pilih waktu alarm sebelum beres-beres pulang atau sebelum absensi ditutup.
              </p>

              {/* Quick Presets tailored for 4 Sore */}
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  { label: "15:45 (15 Menit Sebelum Pulang)", value: "15:45" },
                  { label: "16:00 (Tepat Jam Pulang 4 Sore)", value: "16:00" },
                  { label: "15:30 (Setengah Jam Sebelum)", value: "15:30" },
                  { label: "16:30", value: "16:30" },
                  { label: "17:00", value: "17:00" },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => updateConfig({ reminderTime: preset.value })}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      config.reminderTime === preset.value
                        ? "bg-blue-600 text-white shadow-xs"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Helpful Tip for 4 Sore */}
              <div className="mt-2.5 rounded-lg border border-blue-100 bg-blue-50/50 p-2.5 text-[11px] text-blue-800 dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-300">
                💡 <strong>Rekomendasi Kantor Pulang Jam 4 Sore:</strong> Pilih <strong>15:45</strong> agar alarm HP berbunyi saat Anda masih di meja kerja untuk isi logbook & absen pulang, atau <strong>16:00</strong> tepat saat jam kerja usai.
              </div>

              {/* Manual Time Input */}
              <div className="mt-3 flex items-center gap-2">
                <div className="relative rounded-lg border border-zinc-300 dark:border-zinc-700">
                  <input
                    type="time"
                    value={config.reminderTime}
                    onChange={(e) => updateConfig({ reminderTime: e.target.value })}
                    className="rounded-lg bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
                  />
                </div>
                <span className="text-xs text-zinc-500">WIB (Atau sesuaikan menit bebas)</span>
              </div>
            </div>

            {/* Work Days & Saturday Option */}
            <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Hari Kerja Magang
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="workday"
                    checked={!config.includeSaturday}
                    onChange={() => updateConfig({ includeSaturday: false })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Senin – Jumat (5 Hari Kerja)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="workday"
                    checked={config.includeSaturday}
                    onChange={() => updateConfig({ includeSaturday: true })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Termasuk Sabtu (6 Hari)</span>
                </label>
              </div>
            </div>

            {/* Batch Duration Dates */}
            <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Periode Masa Magang
              </label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Alarm berulang akan otomatis aktif sepanjang rentang tanggal ini.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">Mulai Magang</label>
                  <input
                    type="date"
                    value={config.startDate}
                    onChange={(e) => updateConfig({ startDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">Selesai Magang</label>
                  <input
                    type="date"
                    value={config.endDate}
                    onChange={(e) => updateConfig({ endDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Notification Lead Time */}
            <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Peringatan Suara / Pop-up Notifikasi
              </label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  { label: "10 Menit Sebelumnya", value: 10 },
                  { label: "15 Menit Sebelumnya (Rekomendasi)", value: 15 },
                  { label: "30 Menit Sebelumnya", value: 30 },
                ].map((alertOpt) => (
                  <button
                    key={alertOpt.value}
                    type="button"
                    onClick={() => updateConfig({ alertLeadMinutes: alertOpt.value })}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      config.alertLeadMinutes === alertOpt.value
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {alertOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Catatan Tambahan di Deskripsi Kalender (Opsional)
              </label>
              <input
                type="text"
                value={config.customNotes || ""}
                onChange={(e) => updateConfig({ customNotes: e.target.value })}
                placeholder="Contoh: Ingat minta review mentor sebelum pulang"
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            2. Eksekusi Pengingat
          </h3>

          <div className="mt-4 space-y-3">
            {/* Primary Action: Add to Google Calendar */}
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <CalendarPlus className="h-5 w-5" />
              <span>Simpan ke Google Calendar (1-Klik)</span>
              <ExternalLink className="ml-1 h-4 w-4 opacity-75" />
            </a>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {/* Secondary Action: Download ICS */}
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Download className="h-4 w-4 text-zinc-500" />
                <span>Unduh File .ICS (iPhone / Outlook)</span>
              </button>

              {/* Tertiary Action: Copy Webcal Subscription */}
              <button
                type="button"
                onClick={handleCopyWebcalUrl}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Link Berlangganan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 text-zinc-500" />
                    <span>Salin Link Langganan WebCal</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Event Preview & Quick Guide */}
      <div className="space-y-6 lg:col-span-5">
        {/* Preview Card */}
        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-6 dark:border-blue-900/40 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <Calendar className="h-3.5 w-3.5" />
              Tampilan Notifikasi di Google Calendar
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Preview
            </span>
          </div>

          {/* Simulated Google Calendar Card */}
          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {/* Title & Badge */}
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3.5 w-3.5 rounded-full bg-blue-600 shrink-0" />
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {config.title}
                </h4>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Setiap {config.includeSaturday ? "Senin – Sabtu" : "Senin – Jumat"}, {config.reminderTime} WIB (30 menit)
                </p>
              </div>
            </div>

            {/* Notification timing */}
            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-zinc-400" />
                <span>
                  Alarm pop-up HP: <strong>{config.alertLeadMinutes} menit sebelum</strong> dan tepat saat acara
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                <a
                  href={MONEV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {MONEV_URL}
                </a>
              </div>
            </div>

            {/* Description Snippet */}
            <div className="mt-3.5 rounded-lg bg-zinc-50 p-3 text-[11px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Format Rincian Pengisian:
              </p>
              <ul className="mt-1 list-disc pl-4 space-y-0.5">
                <li>Aktivitas utama hari ini</li>
                <li>Output / hasil capaian tugas</li>
                <li>Kendala yang dihadapi (jika ada)</li>
              </ul>
              {config.customNotes && (
                <p className="mt-2 text-zinc-500 italic">
                  Catatan: &ldquo;{config.customNotes}&rdquo;
                </p>
              )}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleCopyDescription}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                {copiedDesc ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span className="text-emerald-600">Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Salin Rincian</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Steps Guide Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Cara Kerja Tanpa Harus Buka Web Lagi
          </h4>

          <ol className="mt-3.5 space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                1
              </span>
              <span>
                Klik tombol biru <strong>&ldquo;Simpan ke Google Calendar&rdquo;</strong> di samping.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                2
              </span>
              <span>
                Di halaman Google Calendar yang terbuka, klik <strong>&ldquo;Simpan / Save&rdquo;</strong> di pojok kanan atas.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                3
              </span>
              <span>
                Selesai! Jadwal berulang otomatis tersinkronisasi ke aplikasi Google Calendar di HP Android / iPhone Anda dan akan berbunyi setiap sore.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
