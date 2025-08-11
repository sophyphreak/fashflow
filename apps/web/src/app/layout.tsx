import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "FashFlow — Human‑Like Automation for Depop Sellers",
  description:
    "Automatically relist and like items to boost your visibility — safely and naturally, just like a real person.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "FashFlow — Human‑Like Automation for Depop Sellers",
    description:
      "Save 5+ hours/week with safe, human‑like automation for Depop. Automatic relisting and auto‑like to stay at the top of search.",
    url: "https://fashflow.app",
    siteName: "FashFlow",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "FashFlow",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
