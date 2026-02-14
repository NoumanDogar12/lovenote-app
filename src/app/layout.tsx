import type { Metadata } from "next";
import {
  Playfair_Display,
  Lato,
  Cormorant_Garamond,
  Inter,
  Quicksand,
  Nunito,
  DM_Serif_Display,
  DM_Sans,
  Bebas_Neue,
  Source_Sans_3,
  Caveat,
  Poppins,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-cormorant", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "LoveNote - Ask Your Valentine In Style",
    template: "%s | LoveNote",
  },
  description:
    "Create a beautiful, personalized Valentine's Day proposal. Pick a template, add your photos & messages, and share the magic. Just $9.99.",
  keywords: [
    "valentine",
    "valentine's day",
    "proposal",
    "be my valentine",
    "love note",
    "valentine card",
    "valentine website",
  ],
  openGraph: {
    title: "LoveNote - Ask Your Valentine In Style",
    description:
      "Create a beautiful, personalized Valentine's Day proposal. Just $9.99.",
    type: "website",
    siteName: "LoveNote",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveNote - Ask Your Valentine In Style",
    description:
      "Create a beautiful, personalized Valentine's Day proposal. Just $9.99.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    playfair, lato, cormorant, inter, quicksand, nunito,
    dmSerif, dmSans, bebas, sourceSans, caveat, poppins,
  ].map((f) => f.variable).join(" ");

  return (
    <html lang="en">
      <body className={`${fontVars} font-[var(--font-lato)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
