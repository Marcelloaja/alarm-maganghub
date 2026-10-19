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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Left Column: Configuration Form */}
      <div className="space-y-5 sm:space-y-6 lg:col-span-7">
        {/* Intro Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2 sm:p-2.5 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 shrink-0">
              <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Pengingat Masuk Langsung ke HP Anda
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tanpa perlu install aplikasi pihak ketiga. Simpan jadwal ini sekali ke Google Calendar, HP Anda akan otomatis berbunyi dan memunculkan notifikasi setiap sore sebelum jam pulang kerja.
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Settings Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            1. Atur Jadwal & Waktu Pengingat
          </h3>

          <div className="mt-4 sm:mt-5 space-y-5">
            {/* Reminder Time */}
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Jam Alarm Logbook
                </label>
                <span className="self-start rounded-md bg-blue-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  Kantor Pulang Jam 4 Sore (16:00)
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Pilih waktu alarm sebelum beres-beres pulang atau sebelum absensi ditutup.
              </p>

              {/* Quick Presets tailored for 4 Sore (Clean Mobile Grid) */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { label: "15:45 (15 Mnt Sebelum Pulang)", sub: "Rekomendasi Utama", value: "15:45" },
                  { label: "16:00 (Tepat Jam 4 Sore)", sub: "Jam Pulang Kantor", value: "16:00" },
                  { label: "15:30 (30 Mnt Sebelum)", sub: "Persiapan Lebih Awal", value: "15:30" },
                  { label: "16:30 (Sore)", sub: "Batas Akhir Lembur", value: "16:30" },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => updateConfig({ reminderTime: preset.value })}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-all ${
                      config.reminderTime === preset.value
                        ? "bg-blue-600 text-white shadow-xs"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span className="font-semibold">{preset.label}</span>
                    <span
                      className={`text-[10px] ${
                        config.reminderTime === preset.value
                          ? "text-blue-100"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {preset.sub}
                    </span>
                  </button>
                ))}
              </div>

              {/* Helpful Tip for 4 Sore */}
              <div className="mt-2.5 rounded-lg border border-blue-100 bg-blue-50/60 p-2.5 text-[11px] text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-200 leading-relaxed">
                💡 <strong>Rekomendasi Kantor Pulang Jam 4 Sore:</strong> Pilih <strong>15:45</strong> agar alarm HP berbunyi saat Anda masih di meja kerja untuk isi logbook & absen pulang, atau <strong>16:00</strong> tepat saat jam kerja usai.
              </div>

              {/* Manual Time Input */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">Atau pilih jam custom:</span>
                <div className="relative rounded-lg border border-zinc-300 dark:border-zinc-700">
                  <input
                    type="time"
                    value={config.reminderTime}
                    onChange={(e) => updateConfig({ reminderTime: e.target.value })}
                    className="rounded-lg bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
                  />
                </div>
                <span className="text-xs text-zinc-500">WIB</span>
              </div>
            </div>

            {/* Work Days & Saturday Option */}
            <div className="border-t border-zinc-100 pt-4 sm:pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Hari Kerja Magang
              </label>
              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:gap-5">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="workday"
                    checked={!config.includeSaturday}
                    onChange={() => updateConfig({ includeSaturday: false })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Senin – Jumat (5 Hari Kerja)</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="radio"
                    name="workday"
                    checked={config.includeSaturday}
                    onChange={() => updateConfig({ includeSaturday: true })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Termasuk Sabtu (6 Hari Kerja)</span>
                </label>
              </div>
            </div>

            {/* Batch Duration Dates */}
            <div className="border-t border-zinc-100 pt-4 sm:pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Periode Masa Magang
              </label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Alarm berulang akan otomatis aktif sepanjang rentang tanggal ini.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Mulai Magang</label>
                  <input
                    type="date"
                    value={config.startDate}
                    onChange={(e) => updateConfig({ startDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Selesai Magang</label>
                  <input
                    type="date"
                    value={config.endDate}
                    onChange={(e) => updateConfig({ endDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Notification Lead Time */}
            <div className="border-t border-zinc-100 pt-4 sm:pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Peringatan Suara / Pop-up Notifikasi HP
              </label>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  { label: "10 Menit Sebelumnya", value: 10 },
                  { label: "15 Menit (Rekomendasi)", value: 15 },
                  { label: "30 Menit Sebelumnya", value: 30 },
                ].map((alertOpt) => (
                  <button
                    key={alertOpt.value}
                    type="button"
                    onClick={() => updateConfig({ alertLeadMinutes: alertOpt.value })}
                    className={`rounded-lg px-3 py-2 text-center text-xs font-medium transition-colors ${
                      config.alertLeadMinutes === alertOpt.value
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {alertOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-zinc-100 pt-4 sm:pt-5 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Catatan Tambahan di Deskripsi Kalender (Opsional)
              </label>
              <input
                type="text"
                value={config.customNotes || ""}
                onChange={(e) => updateConfig({ customNotes: e.target.value })}
                placeholder="Contoh: Ingat minta review mentor sebelum pulang"
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            2. Eksekusi Pengingat
          </h3>

          <div className="mt-4 space-y-2.5 sm:space-y-3">
            {/* Primary Action: Add to Google Calendar */}
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <CalendarPlus className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Simpan ke Google Calendar (1-Klik)</span>
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-75 shrink-0" />
            </a>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {/* Secondary Action: Download ICS */}
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Download className="h-4 w-4 text-zinc-500 shrink-0" />
                <span>Unduh File .ICS (iPhone/Outlook)</span>
              </button>

              {/* Tertiary Action: Copy Webcal Subscription */}
              <button
                type="button"
                onClick={handleCopyWebcalUrl}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-emerald-600 font-medium">Link Langganan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 text-zinc-500 shrink-0" />
                    <span>Salin Link Langganan WebCal</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Event Preview & Quick Guide */}
      <div className="space-y-5 sm:space-y-6 lg:col-span-5">
        {/* Preview Card */}
        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-4 sm:p-6 dark:border-blue-900/40 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              Notifikasi Google Calendar
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Preview
            </span>
          </div>

          {/* Simulated Google Calendar Card */}
          <div className="mt-3.5 sm:mt-4 rounded-xl border border-zinc-200 bg-white p-3.5 sm:p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
            {/* Title & Badge */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="mt-1 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-blue-600 shrink-0" />
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {config.title}
                </h4>
                <p className="mt-0.5 text-[11px] sm:text-xs text-zinc-500">
                  Setiap {config.includeSaturday ? "Senin – Sabtu" : "Senin – Jumat"}, {config.reminderTime} WIB (30 mnt)
                </p>
              </div>
            </div>

            {/* Notification timing */}
            <div className="mt-3.5 space-y-2 border-t border-zinc-100 pt-3 text-[11px] sm:text-xs text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>
                  Alarm HP: <strong>{config.alertLeadMinutes} mnt sebelum</strong> dan tepat saat acara
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
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
            <div className="mt-3 rounded-lg bg-zinc-50 p-2.5 sm:p-3 text-[11px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Format Rincian Pengisian:
              </p>
              <ul className="mt-1 list-disc pl-4 space-y-0.5">
                <li>Aktivitas utama hari ini</li>
                <li>Output / hasil capaian tugas</li>
                <li>Kendala yang dihadapi (jika ada)</li>
              </ul>
              {config.customNotes && (
                <p className="mt-2 text-zinc-500 italic break-words">
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
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h4 className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            Cara Kerja Tanpa Perlu Buka Web Lagi
          </h4>

          <ol className="mt-3 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px]">
                1
              </span>
              <span>
                Tap tombol biru <strong>&ldquo;Simpan ke Google Calendar&rdquo;</strong>.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px]">
                2
              </span>
              <span>
                Di aplikasi Google Calendar yang terbuka, tap tombol <strong>&ldquo;Simpan / Save&rdquo;</strong> di pojok kanan atas.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px]">
                3
              </span>
              <span>
                Selesai! Jadwal berulang otomatis tersimpan di kalender HP Anda dan berbunyi setiap sore sebelum jam 4 pulang kantor.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
