"use client";

import React from "react";
import {
  Smartphone,
  AlertTriangle,
  CheckCheck,
  Rocket,
} from "lucide-react";

export default function MonevGuide() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Cara Pasang di Google Calendar HP */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Cara Memastikan Notifikasi Alarm Bunyi di HP (Android & iPhone)
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Lakukan sekali saja agar Google Calendar otomatis membunyikan notifikasi setiap sore.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px]">
                1
              </span>
              <span>Buka dari Browser HP</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Buka website ini dari browser HP Anda, lalu tap tombol <strong>&ldquo;Simpan ke Google Calendar&rdquo;</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px]">
                2
              </span>
              <span>Pastikan Tipe &ldquo;Notifikasi&rdquo;</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Di halaman Google Calendar, pastikan pengingat diset ke <strong>Notifikasi Pop-up HP</strong> (bukan hanya email).
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px]">
                3
              </span>
              <span>Izinkan Notifikasi Google Calendar</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Di Pengaturan HP &gt; Aplikasi &gt; Google Calendar &gt; Notifikasi &gt; Pastikan opsi <strong>&ldquo;Izinkan Suara & Layar Kunci&rdquo;</strong> aktif.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Aturan Monev MagangHub Kemnaker */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Aturan Penting Logbook Monev MagangHub Kemnaker
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Hal-hal yang sering menjadi penyebab evaluasi bermasalah atau uang saku magang tertunda.
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Batas Pengisian Harian:</strong>
              <p className="mt-0.5 leading-relaxed">
                Sebagian besar instansi menerapkan batas pengisian logbook pada hari yang sama (sebelum 23:59 WIB). Melebihi hari tersebut sistem berpotensi mengunci entri hari sebelumnya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Presensi Datang & Pulang:</strong>
              <p className="mt-0.5 leading-relaxed">
                Jangan hanya mengisi deskripsi kegiatan, pastikan status presensi (Masuk dan Pulang) sudah ter-submit agar kehadiran tercatat valid.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Verifikasi Mingguan Mentor:</strong>
              <p className="mt-0.5 leading-relaxed">
                Setiap akhir pekan (Jumat sore), ingatkan pembimbing/mentor magang untuk me-review dan memvalidasi logbook mingguan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Panduan Deploy Vercel (Sesuai Permintaan User) */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Panduan Deploy ke Vercel (100% Gratis)
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Aplikasi Next.js ini dirancang khusus agar langsung siap jalan di Vercel tanpa perlu database.
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 space-y-3.5 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Langkah 1: Upload ke GitHub Anda (Sudah Selesai!)
            </h4>
            <p className="mt-1 text-zinc-500">
              Proyek ini sudah ter-push ke: <code className="rounded bg-zinc-200 px-1 py-0.5 dark:bg-zinc-800 text-[11px]">https://github.com/Marcelloaja/alarm-maganghub</code>
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Langkah 2: Hubungkan ke Vercel
            </h4>
            <ol className="mt-2 list-decimal pl-4 space-y-1.5 leading-relaxed">
              <li>Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">vercel.com</a> dan login dengan akun GitHub Anda.</li>
              <li>Klik tombol <strong>&ldquo;Add New...&rdquo;</strong> lalu pilih <strong>&ldquo;Project&rdquo;</strong>.</li>
              <li>Pilih repositori <strong>alarm-maganghub</strong>.</li>
              <li>Klik <strong>&ldquo;Deploy&rdquo;</strong>. Web Anda langsung aktif dan dapat diakses dari HP!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
