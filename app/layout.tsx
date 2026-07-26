import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/portfolio/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const BASE_URL = "https://sandakelum.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Hasitha Sandakelum — Developer & Designer",
    template: "%s — Hasitha Sandakelum",
  },
  description:
    "ICT undergraduate from Sri Lanka building modern web apps, open-source tools, and developer content in Sinhala and English. Microsoft Student Ambassador.",

  keywords: [
    "Hasitha Sandakelum",
    "developer",
    "designer",
    "Sri Lanka",
    "Next.js",
    "React",
    "TypeScript",
    "full-stack",
    "Microsoft Student Ambassador",
    "portfolio",
    "ICT",
    "University of Ruhuna",
    "web development",
    "open source",
    "Sinhala tech",
  ],

  authors: [{ name: "Hasitha Sandakelum", url: BASE_URL }],
  creator: "Hasitha Sandakelum",
  publisher: "Hasitha Sandakelum",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Hasitha Sandakelum",
    title: "Hasitha Sandakelum — Developer & Designer",
    description:
      "ICT undergraduate from Sri Lanka building modern web apps, open-source tools, and developer content in Sinhala and English.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hasitha Sandakelum — Developer & Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hasitha Sandakelum — Developer & Designer",
    description:
      "ICT undergraduate from Sri Lanka building modern web apps, open-source tools, and developer content in Sinhala and English.",
    images: ["/og-image.png"],
    creator: "@hasithasandakelum",
  },

  alternates: {
    canonical: BASE_URL,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      style={{ 
        background: "var(--bg, #08090d)",
        color: "var(--text, #eef0f4)",
      }}
    >
      <body
        style={{ 
          background: "transparent",
          color: "var(--text, #eef0f4)",
          fontFamily: "var(--font-inter), sans-serif",
        }}
        suppressHydrationWarning
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
