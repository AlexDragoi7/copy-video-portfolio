import type { Metadata } from "next";
import { Special_Elite, EB_Garamond } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${specialElite.variable} ${ebGaramond.variable}`}>
      <body className="bg-neutral-200 font-body text-text antialiased">{children}</body>
    </html>
  );
}
