import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import { brand } from "@/config/brand";
import "@fontsource/inter/latin-300.css";
import "./atelier-utilities.css";
import "./globals.css";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const metadataBase = brand.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(metadataBase),
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
  openGraph: {
    type: "website", locale: "id_ID", siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`, description: brand.description,
    images: [{ url: brand.images.original, width: 1672, height: 941, alt: brand.images.originalAlt }],
  },
  twitter: { card: "summary_large_image", images: [brand.images.original] },
};

export const viewport: Viewport = { themeColor: "#08090a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

