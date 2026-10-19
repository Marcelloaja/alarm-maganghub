"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Copy,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ClipboardCheck,
  Building2,
  Code2,
  Palette,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react";
import { MONEV_URL } from "@/lib/calendar";

interface RolePreset {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  kegiatan: string;
  output: string;
  kendala: string;
  solusi: string;
}

const PRESETS: RolePreset[] = [
  {
    id: "it",
    name: "IT & Software / Tech",
    icon: Code2,
    kegiatan: "Melanjutkan pengembangan modul fitur sistem dan perbaikan bug sesuai arahan mentor tim teknologi.",
    output: "Commit branch pengerjaan fitur, dokumentasi API, dan testing modul selesai dijalankan.",
    kendala: "Tidak ada kendala berarti / Sinkronisasi dependencies lokal sempat error namun terselesaikan.",
    solusi: "Melakukan re-install package dan koordinasi singkat dengan rekan satu tim.",
  },
  {
    id: "admin",
    name: "Administrasi & Umum",
    icon: Briefcase,
    kegiatan: "Melakukan rekapitulasi surat masuk/keluar, pengarsipan berkas dokumen fisik dan digital instansi.",
    output: "Tersusunnya rekap data dokumen periode berjalan ke dalam lembar kerja spreadsheet.",
    kendala: "Kelengkapan berkas dari unit lain belum seluruhnya diserahkan.",
    solusi: "Melakukan follow-up konfirmasi ke PIC terkait agar berkas dapat dilengkapi esok hari.",
  },
  {
    id: "design",
    name: "Desain Grafis & Media",
    icon: Palette,
    kegiatan: "Membuat materi visual poster dan feed media sosial untuk publikasi informasi kegiatan organisasi.",
    output: "Draf visual feed 3 slide dalam format Figma/PNG siap review oleh tim publikasi.",
    kendala: "Revisi penyesuaian palet warna brand guideline instansi.",
    solusi: "Menyesuaikan kode hex warna dan layout tipografi sesuai instruksi mentor.",
  },
  {
    id: "data",
    name: "Riset & Analisis Data",
    icon: FileSpreadsheet,
    kegiatan: "Membersihkan (cleaning) dataset survei dan menyusun visualisasi grafik tren bulanan.",
    output: "Dashboard ringkasan metrik performa dalam format spreadsheet / visual presentation.",
    kendala: "Beberapa entri data mentah memiliki nilai null dan duplikasi.",
    solusi: "Melakukan pembersihan data anomali menggunakan formula pengelompokan data.",
  },
];

export default function LogbookDrafter() {
  const [kegiatan, setKegiatan] = useState("");
  const [output, setOutput] = useState("");
  const [kendala, setKendala] = useState("Tidak ada kendala berarti.");
  const [solusi, setSolusi] = useState("Pekerjaan berjalan lancar sesuai timeline.");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maganghub_logbook_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setKegiatan(parsed.kegiatan || "");
        setOutput(parsed.output || "");
        setKendala(parsed.kendala || "");
        setSolusi(parsed.solusi || "");
      } else {
        // default to first preset
        applyPreset(PRESETS[0]);
      }
    } catch {
      applyPreset(PRESETS[0]);
    }
  }, []);

  const saveToStorage = (updated: {
    kegiatan: string;
    output: string;
    kendala: string;
    solusi: string;
  }) => {
    try {
      localStorage.setItem("maganghub_logbook_draft", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const applyPreset = (preset: RolePreset) => {
    setKegiatan(preset.kegiatan);
    setOutput(preset.output);
    setKendala(preset.kendala);
    setSolusi(preset.solusi);
    saveToStorage({
      kegiatan: preset.kegiatan,
      output: preset.output,
      kendala: preset.kendala,
      solusi: preset.solusi,
    });
  };

  const handleReset = () => {
    setKegiatan("");
    setOutput("");
    setKendala("");
    setSolusi("");
    saveToStorage({ kegiatan: "", output: "", kendala: "", solusi: "" });
  };

  const compiledText = [
    `Rincian Kegiatan:`,
    kegiatan || "-",
    ``,
    `Output / Hasil Kerja:`,
    output || "-",
    ``,
    `Kendala yang Dihadapi:`,
    kendala || "-",
    ``,
    `Solusi / Rencana Besok:`,
    solusi || "-",
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Form & Presets */}
      <div className="space-y-6 lg:col-span-7">
        {/* Presets Bar */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Template Bidang Magang
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Kosongkan Form</span>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PRESETS.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 text-center text-xs font-medium text-zinc-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-700 transition-colors dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                >
                  <Icon className="h-4 w-4" />
                  <span className="leading-tight">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              1. Rincian Kegiatan Hari Ini
            </label>
            <textarea
              rows={3}
              value={kegiatan}
              onChange={(e) => {
                setKegiatan(e.target.value);
                saveToStorage({ kegiatan: e.target.value, output, kendala, solusi });
              }}
              placeholder="Jelaskan aktivitas atau tugas yang Anda kerjakan hari ini..."
              className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              2. Output / Hasil Capaian
            </label>
            <textarea
              rows={2}
              value={output}
              onChange={(e) => {
                setOutput(e.target.value);
                saveToStorage({ kegiatan, output: e.target.value, kendala, solusi });
              }}
              placeholder="Hasil konkrit (dokumen, file, presentasi, laporan, fitur selesai)..."
              className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                3. Kendala (Jika Ada)
              </label>
              <input
                type="text"
                value={kendala}
                onChange={(e) => {
                  setKendala(e.target.value);
                  saveToStorage({ kegiatan, output, kendala: e.target.value, solusi });
                }}
                placeholder="Contoh: Tidak ada kendala berarti"
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                4. Solusi / Rencana Besok
              </label>
              <input
                type="text"
                value={solusi}
                onChange={(e) => {
                  setSolusi(e.target.value);
                  saveToStorage({ kegiatan, output, kendala, solusi: e.target.value });
                }}
                placeholder="Contoh: Melanjutkan pengerjaan tahap 2"
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Compiled Preview & Copy Action */}
      <div className="space-y-6 lg:col-span-5">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <ClipboardCheck className="h-4 w-4 text-blue-600" />
              Teks Siap Salin ke Monev
            </span>
            <span className="text-[11px] text-zinc-400">
              {compiledText.length} karakter
            </span>
          </div>

          {/* Compiled Output Box */}
          <div className="mt-3.5 whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs font-mono text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 leading-relaxed min-h-[220px]">
            {compiledText}
          </div>

          {/* Actions */}
          <div className="mt-4 space-y-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                  <span>Berhasil Disalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Draft Logbook</span>
                </>
              )}
            </button>

            <a
              href={MONEV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <span>Buka Portal Monev Kemnaker</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Tip Box */}
        <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
          <p className="font-semibold">💡 Tips Verifikasi Mentor:</p>
          <p className="mt-1 text-amber-700 dark:text-amber-300/90 leading-relaxed">
            Pastikan bagian <strong>Output / Hasil Kerja</strong> selalu terisi secara spesifik (misal nama dokumen, nomor berkas, link presentasi, atau modul kerja) agar pembimbing magang menyetujui logbook tanpa catatan perbaikan.
          </p>
        </div>
      </div>
    </div>
  );
}
