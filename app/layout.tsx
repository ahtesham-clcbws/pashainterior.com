import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation-context";
import { ConsultationModal } from "@/components/consultation-modal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pasha Interior | Luxury Engineering & Design",
  description: "Pasha Interior crafts timeless, sophisticated spaces with architectural precision. New Delhi's premier luxury design studio.",
  keywords: ["luxury interior design", "Delhi interiors", "premium residential design", "commercial interior design", "Pasha Interior"],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Pasha Interior | Luxury Engineering & Design",
    description: "Crafting timeless, sophisticated spaces with architectural precision.",
    url: "https://pashainterior.com",
    siteName: "Pasha Interior",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasha Interior | Luxury Engineering & Design",
    description: "New Delhi's premier luxury interior design studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-brand-blue/30`}
      >
        <ConsultationProvider>
          {children}
          <ConsultationModal />
        </ConsultationProvider>
      </body>
    </html>
  );
}
