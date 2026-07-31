import type { Metadata } from "next";
import { Special_Elite, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Dragoi — Copywriter",
  description:
    "Copy that keeps them there — emails, ads, product pages, landing pages, technical docs. Whatever the project needs, in whatever format gets it read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${specialElite.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-neutral-200 font-body text-text antialiased">{children}</body>
    </html>
  );
}
