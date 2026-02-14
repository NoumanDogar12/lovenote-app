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

const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "LoveNote - Will You Be My Valentine? | Create a Valentine Proposal Website",
    template: "%s | LoveNote",
  },
  description:
    "Create a beautiful, personalized 'Will You Be My Valentine?' website with photos, love messages, music & animations. Pick a template, customize everything, and share a unique valentine link. The most romantic way to ask your valentine online.",
  keywords: [
    "will you be my valentine",
    "be my valentine",
    "valentine website",
    "valentine proposal website",
    "valentine link generator",
    "valentine card online",
    "digital valentine card",
    "personalized valentine",
    "valentine proposal online",
    "ask your valentine",
    "valentine yes or no website",
    "valentine surprise link",
    "custom valentine website",
    "animated valentine proposal",
    "valentine card with photos",
    "valentine card maker",
    "valentine website builder",
    "send valentine online",
    "romantic valentine proposal",
    "valentine's day",
    "love note",
  ],
  openGraph: {
    title: "LoveNote - Create a Beautiful Valentine Proposal Website",
    description:
      "The most romantic way to ask 'Will You Be My Valentine?' - Create a personalized website with photos, messages, music & animations. Share a unique link.",
    type: "website",
    siteName: "LoveNote",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveNote - Ask Your Valentine In Style",
    description:
      "Create a personalized Valentine proposal website with photos, love messages & music. Share a unique link.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#E11D48",
    "apple-mobile-web-app-title": "LoveNote",
  },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "LoveNote",
        url: siteUrl,
        description:
          "Create a beautiful, personalized Valentine proposal website with photos, love messages, music & animations.",
      },
      {
        "@type": "Organization",
        name: "LoveNote",
        url: siteUrl,
        logo: `${siteUrl}/favicon.ico`,
      },
      {
        "@type": "Product",
        name: "LoveNote Valentine Proposal",
        description:
          "Personalized Valentine's Day proposal website with 6 templates, photos, messages, music, and shareable link.",
        offers: {
          "@type": "Offer",
          price: "9.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${fontVars} font-[var(--font-lato)] antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
