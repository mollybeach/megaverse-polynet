/**
 * @title Layout
 * @fileoverview Layout component
 * @path /app/layout.tsx
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RNA Sequencing Analysis",
  description: "Analysis of RNA-seq data comparing CsA and VOC treatments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
     <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-black dark:text-white`}>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
          <Header />
          <main className="p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
