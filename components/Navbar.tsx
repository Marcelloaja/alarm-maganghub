"use client";

import React from "react";
import { CalendarCheck2, ExternalLink, FileSpreadsheet } from "lucide-react";
import { MONEV_URL, BALAI_BAHASA_FORM_URL } from "@/lib/calendar";

export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: "alarm" | "drafter" | "guide";
  setActiveTab: (tab: "alarm" | "drafter" | "guide") => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs ring-1 ring-blue-700/20">
            <CalendarCheck2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900 truncate dark:text-zinc-50">
                MonevHub Alarm
              </span>
              <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-300">
                Balai Bahasa Jatim
              </span>
              <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-950/50 dark:text-blue-300">
                Kemnaker
              </span>
            </div>
            <p className="hidden text-xs text-zinc-500 sm:block dark:text-zinc-400 truncate">
              Pengingat Absen Balai Bahasa Jatim & Logbook Kemnaker
            </p>
          </div>
        </div>

        {/* Tab Navigation (Desktop) & Direct Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop Only Nav */}
          <nav className="hidden lg:flex items-center rounded-lg bg-zinc-100 p-1 text-xs font-medium dark:bg-zinc-900 mr-2">
            <button
              type="button"
              onClick={() => setActiveTab("alarm")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                activeTab === "alarm"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Atur Alarm
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("drafter")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                activeTab === "drafter"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Draft Logbook
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                activeTab === "guide"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Aturan & Panduan
            </button>
          </nav>

          {/* Quick link: Form Balai Bahasa */}
          <a
            href={BALAI_BAHASA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Form Absensi Harian Balai Bahasa Jawa Timur"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/80 bg-emerald-50/70 px-2.5 py-1.5 text-xs font-medium text-emerald-900 shadow-xs hover:bg-emerald-100/70 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
          >
            <span className="sm:inline hidden">GForm Balai Bahasa</span>
            <span className="sm:hidden text-xs">Absen GForm</span>
            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70 shrink-0" />
          </a>

          {/* Quick link: Monev Kemnaker */}
          <a
            href={MONEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Portal Monev MagangHub Kemnaker"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-800 shadow-xs hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="sm:inline hidden">Monev Kemnaker</span>
            <span className="sm:hidden text-xs">Monev</span>
            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400 shrink-0" />
          </a>
        </div>
      </div>
    </header>
  );
}
