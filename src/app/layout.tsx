import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SteamBg from "@/components/SteamBg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://www.umeblog.com";
const siteDescription =
  "Go・AWSを中心に、バックエンドとインフラを設計・構築するエンジニアのポートフォリオ。技術記事・個人開発・日常を発信しています。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ume.Blog",
    template: "%s | Ume.Blog",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Ume.Blog",
    title: "Ume.Blog",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ume.Blog",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SteamBg />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
