"use client";

import React, { useState } from "react";
import {
  Smartphone,
  AlertTriangle,
  CheckCheck,
  Rocket,
  Building,
  Copy,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { BALAI_BAHASA_FORM_URL, MONEV_URL } from "@/lib/calendar";

export default function MonevGuide() {
  const [copiedBroadcast, setCopiedBroadcast] = useState(false);

  const broadcastMessage = `Mau menginformasikan terkait peraturan absensi yang baru, yaa. Karena akhir-akhir ini masih ada beberapa teman yang kurang disiplin dalam melakukan absensi, jadi mulai besok akan diberlakukan aturan baru yang berlaku sampai masa magang kita berakhir.

*Link Absensi :*
${BALAI_BAHASA_FORM_URL}

Mulai berlaku: Kamis, 15 Oktober 2026

Berikut beberapa ketentuannya:
1. Setiap peserta magang hanya memiliki 1 kali kesempatan saja, jadi tolong dimanfaatkan dengan baik, yaa.
2. Kalau ada kendala atau alasan tertentu, seperti ban bocor, kecelakaan, atau kendala lainnya, langsung konfirmasi di grup besar yang ada Ibu Retno dan Ibu Ina, yaa. Jangan lupa untuk segera memberi kabar supaya bisa diketahui.
3. Kalau kalian sudah melakukan absensi tetapi ternyata tidak tercatat, bisa langsung konfirmasi dengan menyertakan bukti atau screenshot absensinya.

Tolong teman-teman bisa lebih memperhatikan absensi masing-masing yaa. Terima kasih banyak atas perhatian dan kerja samanya teman-teman 🫰🏻💪🏼`;

  const handleCopyBroadcast = () => {
    navigator.clipboard.writeText(broadcastMessage);
    setCopiedBroadcast(true);
    setTimeout(() => setCopiedBroadcast(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Official SOP Balai Bahasa Jatim */}
      <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/60 p-4 sm:p-6 shadow-xs dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
            <Building className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-100">
                Aturan Baru Absensi Balai Bahasa Jawa Timur
              </h3>
              <span className="rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                Berlaku s.d. Akhir Magang
              </span>
            </div>
            <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
              Mulai berlaku: <strong>Kamis, 15 Oktober 2026</strong>. Wajib ditaati seluruh peserta magang di Balai Bahasa Jawa Timur.
            </p>

            <div className="mt-4 space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="rounded-xl border border-emerald-200/80 bg-white p-3 dark:border-emerald-900/50 dark:bg-zinc-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">1. Kesempatan Pengisian:</span>
                <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
                  Setiap peserta magang <strong>hanya memiliki 1 kali kesempatan saja</strong> per hari. Pastikan mengisi dengan data yang teliti dan benar.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200/80 bg-white p-3 dark:border-emerald-900/50 dark:bg-zinc-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">2. Prosedur Kendala Darurat:</span>
                <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
                  Jika mengalami kendala (ban bocor, kecelakaan, atau kondisi darurat lainnya), <strong>langsung konfirmasi di grup besar yang ada Ibu Retno dan Ibu Ina</strong> agar segera terdata.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200/80 bg-white p-3 dark:border-emerald-900/50 dark:bg-zinc-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">3. Klaim Absen Tidak Tercatat:</span>
                <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
                  Jika sudah melakukan absensi tetapi ternyata belum tercatat di rekapan, segera konfirmasi dengan <strong>melampirkan bukti / screenshot</strong> pengisian formulir.
                </p>
              </div>
            </div>

            {/* Broadcast Copy Box */}
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                  Teks Pengumuman Resmi Grup:
                </span>
                <button
                  type="button"
                  onClick={handleCopyBroadcast}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {copiedBroadcast ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600">Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Salin Pesan Pengumuman</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cara Pasang di Google Calendar HP */}
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
              Lakukan sekali saja agar Google Calendar otomatis membunyikan notifikasi setiap sore sebelum jam 4 pulang kerja.
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
              Buka website ini dari browser HP Anda, lalu tap tombol <strong>&ldquo;Simpan Pengingat ke Google Calendar&rdquo;</strong>.
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
              <span>Izinkan Suara & Layar Kunci</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Di Pengaturan HP &gt; Aplikasi &gt; Google Calendar &gt; Notifikasi &gt; Pastikan opsi <strong>&ldquo;Izinkan Suara & Layar Kunci&rdquo;</strong> aktif.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Aturan Monev MagangHub Kemnaker */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <CheckCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Kewajiban Monev MagangHub Kemnaker
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Sistem resmi pemerintah pusat untuk pelaporan program & administrasi pencairan dana magang.
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Batas Pengisian Harian:</strong>
              <p className="mt-0.5 leading-relaxed">
                Logbook harian wajib diisi pada hari yang sama sebelum pukul 23:59 WIB. Melebihi hari tersebut sistem berpotensi mengunci entri tanggal bersangkutan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Presensi Datang & Pulang:</strong>
              <p className="mt-0.5 leading-relaxed">
                Selain menulis rincian kegiatan dan output, pastikan tombol presensi (Masuk & Pulang) sudah ter-submit agar kehadiran berstatus sah.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100">Verifikasi Mingguan Mentor:</strong>
              <p className="mt-0.5 leading-relaxed">
                Setiap Jumat sore, koordinasikan dengan mentor lapangan untuk memvalidasi logbook mingguan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Panduan Deploy Vercel */}
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
              Repositori GitHub:
            </h4>
            <p className="mt-1 text-zinc-500">
              Proyek ini sudah ter-push ke: <code className="rounded bg-zinc-200 px-1 py-0.5 dark:bg-zinc-800 text-[11px]">https://github.com/Marcelloaja/alarm-maganghub</code>
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Langkah Deploy Vercel:
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
