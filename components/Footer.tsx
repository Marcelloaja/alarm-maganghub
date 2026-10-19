"use client";

import React from "react";
import { ExternalLink, Heart } from "lucide-react";
import { MONEV_URL } from "@/lib/calendar";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-6 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>
            Dibuat untuk sesama peserta MagangHub Kemnaker RI.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={MONEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <span>Monev MagangHub</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <span>•</span>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Google Calendar
          </a>
          <span>•</span>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Deploy di Vercel
          </a>
        </div>
      </div>
    </footer>
  );
}
