import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pengingat Logbook MagangHub Kemnaker | Google Calendar Alarm",
  description:
    "Alat bantu pengingat absen & pengisian logbook harian peserta MagangHub Kemnaker langsung ke Google Calendar HP tanpa perlu terus membuka website.",
  keywords: [
    "MagangHub",
    "Monev Kemnaker",
    "Pengingat Logbook",
    "Google Calendar Magang",
    "Absen MagangHub",
  ],
  authors: [{ name: "Peserta MagangHub Kemnaker" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
