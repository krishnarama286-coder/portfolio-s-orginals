import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "SURYA: THE SERIES — Surya Srinivas K",
  description:
    "Web Developer • Entrepreneur • Hackathon Builder • Music Lover • Gamer. Surya builds for the web with a playlist on and a high score in mind.",
  authors: [{ name: "Surya Srinivas K" }],
  openGraph: {
    title: "SURYA: THE SERIES",
    description: "Surya builds for the web with a playlist on and a high score in mind.",
    type: "website",
    images: [{ url: "/profile/surya.jpg", alt: "Surya Srinivas K" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
