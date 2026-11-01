import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollRail from "@/components/ScrollRail";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import RouteProgressLine from "@/components/RouteProgressLine";
import MotionObserver from "@/components/MotionObserver";
import MobileTabBar from "@/components/MobileTabBar";
import { siteConfig } from "@/lib/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Technology & Digital Solutions Company`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web development",
    "e-commerce development",
    "web applications",
    "mobile applications",
    "custom software",
    "UI/UX design",
    "digital transformation",
    "AVI GLOBAL SOLUTIONS",
  ],
  openGraph: {
    title: `${siteConfig.name} | Technology & Digital Solutions Company`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: ["/images/og-cover.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Technology & Digital Solutions Company`,
    description: siteConfig.description,
    images: ["/images/og-cover.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
};

// Viewport + theme colour. `viewportFit: "cover"` lets the dark background
// run into the notch/home-indicator areas on phones, which is what makes an
// installed PWA feel native rather than like a page in a browser.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F1F2F4",
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-paper text-graphite font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CustomCursor />
        <SmoothScroll />
        <MotionObserver />
        <RouteProgressLine />
        <ScrollRail />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileTabBar />
      </body>
    </html>
  );
}
