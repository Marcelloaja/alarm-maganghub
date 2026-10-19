"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CalendarGenerator from "@/components/CalendarGenerator";
import LogbookDrafter from "@/components/LogbookDrafter";
import MonevGuide from "@/components/MonevGuide";
import Footer from "@/components/Footer";
import {
  CalendarClock,
  FileEdit,
  HelpCircle,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  BellRing,
} from "lucide-react";
import { MONEV_URL } from "@/lib/calendar";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"alarm" | "drafter" | "guide">("alarm");

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {/* Top Hero Section */}
        <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
              <BellRing className="h-3.5 w-3.5" />
              <span>Pengingat Google Calendar untuk Peserta MagangHub</span>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-zinc-50">
              Jangan Sampai Lupa Isi Logbook & Absen Pulang MagangHub Kemnaker
            </h1>

            <p className="mt-3 text-sm text-zinc-600 sm:text-base dark:text-zinc-400 leading-relaxed">
              Pasang alarm pengingat berulang langsung ke <strong>Google Calendar HP Anda</strong>. Anda akan menerima notifikasi suara dan pop-up di HP setiap sore sebelum jam pulang kerja, lengkap dengan link langsung ke portal Monev dan panduan catatan harian.
            </p>

            {/* Feature Pills */}
            <div className="mt-5 flex flex-wrap gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                Langsung masuk Google Calendar di HP
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                Notifikasi 15 menit sebelum cutoff
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                Tidak perlu buka website terus-menerus
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Headers */}
        <div className="mb-6 flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab("alarm")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === "alarm"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <CalendarClock className="h-4 w-4" />
            <span>1. Atur Alarm Google Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("drafter")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === "drafter"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <FileEdit className="h-4 w-4" />
            <span>2. Format & Draf Logbook</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === "guide"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>3. Panduan Notifikasi & Deploy Vercel</span>
          </button>
        </div>

        {/* Dynamic Tab Contents */}
        {activeTab === "alarm" && <CalendarGenerator />}
        {activeTab === "drafter" && <LogbookDrafter />}
        {activeTab === "guide" && <MonevGuide />}
      </main>

      <Footer />
    </div>
  );
}
