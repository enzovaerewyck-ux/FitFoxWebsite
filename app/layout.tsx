import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { brand, seo } from "@/config/brand";
import { MotionProvider } from "@/components/layout/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: brand.url,
    siteName: brand.name,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${brand.name} — ${brand.promise}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-night focus:px-4 focus:py-2 focus:text-on-night"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
