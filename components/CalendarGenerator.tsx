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
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Building,
} from "lucide-react";
import {
  CalendarConfig,
  DEFAULT_CONFIG,
  generateGoogleCalendarUrl,
  generateIcsContent,
  MONEV_URL,
  BALAI_BAHASA_FORM_URL,
} from "@/lib/calendar";

export default function CalendarGenerator() {
  const [config, setConfig] = useState<CalendarConfig>(DEFAULT_CONFIG);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGForm, setCopiedGForm] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [originUrl, setOriginUrl] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maganghub_calendar_config_v2");
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
        localStorage.setItem("maganghub_calendar_config_v2", JSON.stringify(updated));
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
    a.download = "pengingat-magang-balai-bahasa-kemnaker.ics";
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

  const handleCopyGFormLink = () => {
    navigator.clipboard.writeText(BALAI_BAHASA_FORM_URL);
    setCopiedGForm(true);
    setTimeout(() => setCopiedGForm(false), 2000);
  };

  const handleCopyDescription = () => {
    const text = `1️⃣ GForm Balai Bahasa Jatim: ${BALAI_BAHASA_FORM_URL}\n2️⃣ Monev Kemnaker: ${MONEV_URL}\n\nKetentuan Balai Bahasa Jatim:\n- 1 kali kesempatan saja.\n- Kendala segera lapor di grup besar ke Bu Retno & Bu Ina.\n- Simpan screenshot bukti submit.`;
    navigator.clipboard.writeText(text);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const gcalUrl = generateGoogleCalendarUrl(config);

  return (
    <div className="space-y-6">
      {/* Dual Obligations Notice Card */}
      <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 sm:p-5 shadow-xs dark:border-amber-900/50 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-100">
                Perhatian: Ada 2 Kewajiban Absensi Wajib Setiap Sore
              </h3>
              <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-semibold text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                Aturan Baru (Mulai 15 Okt 2026)
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Mulai Kamis, 15 Oktober 2026 sampai akhir masa magang, seluruh peserta memiliki <strong>dua presensi wajib</strong> yang harus diselesaikan:
            </p>

            {/* Comparison Grid */}
            <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Balai Bahasa */}
              <div className="rounded-xl border border-emerald-200 bg-white p-3.5 shadow-xs dark:border-emerald-900/60 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Building className="h-3.5 w-3.5 shrink-0" />
                    1. Absen Balai Bahasa Jatim
                  </span>
                  <span className="text-[10px] rounded-md bg-emerald-100 px-1.5 py-0.5 font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Wajib Internal
                  </span>
                </div>
                <ul className="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>• <strong>1 kali kesempatan saja</strong>, manfaatkan dengan baik.</li>
                  <li>• Kendala (ban bocor, sakit, dll): Langsung lapor di <strong>grup besar ke Bu Retno & Bu Ina</strong>.</li>
                  <li>• Jika belum tercatat, segera konfirmasi dengan <strong>screenshot bukti absen</strong>.</li>
                </ul>
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={BALAI_BAHASA_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline dark:text-emerald-400"
                  >
                    <span>Buka Google Form</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <button
                    type="button"
                    onClick={handleCopyGFormLink}
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  >
                    {copiedGForm ? "Tautan Disalin!" : "Salin Link"}
                  </button>
                </div>
              </div>

              {/* Kemnaker Monev */}
              <div className="rounded-xl border border-blue-200 bg-white p-3.5 shadow-xs dark:border-blue-900/60 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 dark:text-blue-300">
                    <FileCheck2 className="h-3.5 w-3.5 shrink-0" />
                    2. Monev MagangHub Kemnaker
                  </span>
                  <span className="text-[10px] rounded-md bg-blue-100 px-1.5 py-0.5 font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Wajib Pusat
                  </span>
                </div>
                <ul className="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>• Wajib isi <strong>Rincian Kegiatan & Output</strong> harian.</li>
                  <li>• Klik tombol <strong>Presensi Masuk & Pulang</strong>.</li>
                  <li>• Menentukan laporan akhir dan validasi pencairan uang saku.</li>
                </ul>
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={MONEV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline dark:text-blue-400"
                  >
                    <span>Buka Portal Monev</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Configuration Form */}
        <div className="space-y-5 sm:space-y-6 lg:col-span-7">
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
                    Jam Alarm Presensi Sore
                  </label>
                  <span className="self-start rounded-md bg-blue-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    Kantor Pulang Jam 4 Sore (16:00)
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Pilih waktu alarm sebelum jam kerja berakhir agar sempat mengisi kedua link presensi.
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

              {/* Include Balai Bahasa in Calendar Checkbox */}
              <div className="border-t border-zinc-100 pt-4 sm:pt-5 dark:border-zinc-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includeBalaiBahasa}
                    onChange={(e) => updateConfig({ includeBalaiBahasa: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Sertakan Link Absensi Balai Bahasa Jatim di Kalender
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Menyertakan link Google Form dan SOP Balai Bahasa Jatim langsung di deskripsi notifikasi kalender HP.
                    </p>
                  </div>
                </label>
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
                <span>Simpan Pengingat ke Google Calendar (1-Klik)</span>
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
                Preview Notifikasi Kalender HP
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Live Preview
              </span>
            </div>

            {/* Simulated Google Calendar Card */}
            <div className="mt-3.5 sm:mt-4 rounded-xl border border-zinc-200 bg-white p-3.5 sm:p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
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
                    Alarm HP: <strong>{config.alertLeadMinutes} mnt sebelum</strong> & saat jam pulang
                  </span>
                </div>
                {config.includeBalaiBahasa && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Building className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate text-emerald-700 dark:text-emerald-400 font-medium">
                      1. GForm Balai Bahasa Jatim
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 min-w-0">
                  <ExternalLink className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="truncate text-blue-700 dark:text-blue-400 font-medium">
                    2. Monev MagangHub Kemnaker
                  </span>
                </div>
              </div>

              {/* Description Snippet */}
              <div className="mt-3 rounded-lg bg-zinc-50 p-2.5 sm:p-3 text-[11px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Isi Deskripsi di Kalender Anda:
                </p>
                <div className="mt-1 space-y-1 font-mono text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-400">
                  {config.includeBalaiBahasa && (
                    <p className="text-emerald-700 dark:text-emerald-300">
                      • [GForm Balai Bahasa] (1x kesempatan, izin kendala ke Bu Retno & Bu Ina)
                    </p>
                  )}
                  <p className="text-blue-700 dark:text-blue-300">
                    • [Monev Kemnaker] (Rincian kegiatan, output, kendala & presensi)
                  </p>
                </div>
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
                      <span>Salin Deskripsi</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick FAQ Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              Mengapa Keduanya Wajib Diisi?
            </h4>

            <div className="mt-3 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                <strong>Balai Bahasa Jatim:</strong> Presensi internal harian tempat kantor magang kita. Menjadi rekapan kehadiran riil kantor.
              </p>
              <p>
                <strong>Monev Kemnaker:</strong> Sistem resmi pemerintah pusat untuk pelaporan logbook program MagangHub dan syarat mutlak evaluasi/uang saku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
