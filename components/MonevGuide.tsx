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
    <div className="space-y-8">
      {/* 1. Cara Pasang di Google Calendar HP */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Cara Memastikan Notifikasi Alarm Bunyi di HP (Android & iPhone)
            </h3>
            <p className="text-xs text-zinc-500">
              Cukup lakukan langkah ini satu kali agar Google Calendar aktif membunyikan notifikasi setiap sore.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                1
              </span>
              <span>Buka dari Browser HP</span>
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Buka website ini dari browser HP Anda, lalu tap tombol <strong>&ldquo;Simpan ke Google Calendar&rdquo;</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                2
              </span>
              <span>Pastikan Notifikasi &ldquo;Alert&rdquo;</span>
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Di halaman konfirmasi event Google Calendar, pastikan pengingat diset ke <strong>Notifikasi (Notification / Pop-up)</strong>, bukan cuma email.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                3
              </span>
              <span>Izinkan Notifikasi Google Calendar</span>
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pada menu Pengaturan HP &gt; Aplikasi &gt; Google Calendar &gt; Notifikasi &gt; Pastikan opsi <strong>&ldquo;Izinkan Suara & Layar Kunci&rdquo;</strong> aktif.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Aturan Monev MagangHub Kemnaker */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Aturan Penting Logbook Monev MagangHub Kemnaker
            </h3>
            <p className="text-xs text-zinc-500">
              Hal-hal yang sering menjadi penyebab evaluasi magang bermasalah atau uang saku tertunda.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-start gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Batas Pengisian Harian:</strong>
              <p className="mt-0.5">
                Sebagian besar instansi dan sistem Kemnaker menerapkan batas pengisian logbook pada hari yang sama (sebelum pukul 23:59 WIB). Melebihi hari tersebut sistem berpotensi mengunci entri hari sebelumnya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Presensi Datang & Pulang:</strong>
              <p className="mt-0.5">
                Jangan hanya mengisi deskripsi kegiatan, pastikan status presensi (Masuk dan Pulang) sudah ter-submit agar tercatat hadir secara sah.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Verifikasi Mingguan Mentor:</strong>
              <p className="mt-0.5">
                Setiap akhir pekan (Jumat sore), ingatkan mentor/pembimbing lapangan untuk me-review dan memvalidasi logbook mingguan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Panduan Deploy Vercel (Sesuai Permintaan User) */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Panduan Deploy ke Vercel (100% Gratis & Otomatis)
            </h3>
            <p className="text-xs text-zinc-500">
              Aplikasi Next.js ini dirancang khusus agar langsung siap jalan di Vercel tanpa perlu database eksternal.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Langkah 1: Upload ke Akun GitHub Anda
            </h4>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-[11px] font-mono text-zinc-100">
{`git add .
git commit -m "feat: setup pengingat logbook maganghub"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/alarm-maganghub.git
git push -u origin main`}
            </pre>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Langkah 2: Hubungkan ke Vercel
            </h4>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">vercel.com</a> dan login dengan akun GitHub Anda.</li>
              <li>Klik tombol <strong>&ldquo;Add New...&rdquo;</strong> lalu pilih <strong>&ldquo;Project&rdquo;</strong>.</li>
              <li>Pilih repositori <strong>alarm-maganghub</strong> yang baru Anda buat.</li>
              <li>Framework preset otomatis terdeteksi sebagai <strong>Next.js</strong>. Biarkan semua default lalu klik <strong>&ldquo;Deploy&rdquo;</strong>.</li>
              <li>Dalam 1 menit, web Anda live dengan domain <code>https://alarm-maganghub.vercel.app</code>.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
