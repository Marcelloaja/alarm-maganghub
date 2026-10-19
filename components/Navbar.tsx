"use client";

import React from "react";
import { CalendarCheck2, ExternalLink } from "lucide-react";
import { MONEV_URL } from "@/lib/calendar";

export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: "alarm" | "drafter" | "guide";
  setActiveTab: (tab: "alarm" | "drafter" | "guide") => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/20">
            <CalendarCheck2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                MonevHub Alarm
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-400/20">
                MagangHub Kemnaker
              </span>
            </div>
            <p className="hidden text-xs text-zinc-500 sm:block dark:text-zinc-400">
              Pengingat Absen & Logbook Otomatis di Google Calendar HP
            </p>
          </div>
        </div>

        {/* Tab Navigation & Monev CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center rounded-lg bg-zinc-100 p-1 text-xs font-medium dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setActiveTab("alarm")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                activeTab === "alarm"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
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
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
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
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Panduan
            </button>
          </nav>

          <a
            href={MONEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-xs hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span>Portal Monev</span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
