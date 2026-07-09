import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Hasitha Sandakelum — Developer & Designer",
  description:
    "21-year-old developer from Sri Lanka building products at the intersection of code and design.",
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
        background: "#08090d",
        color: "#eef0f4",
      }}
    >
      <body
        style={{ 
          background: "#08090d",
          color: "#eef0f4",
          fontFamily: "var(--font-inter), sans-serif",
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
