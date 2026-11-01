import { siteConfig } from "@/lib/config";

// Web app manifest — lets the site be installed to a phone's home screen and
// launch standalone (no browser chrome), so it behaves like an app.
export default function manifest() {
  return {
    name: `${siteConfig.name} — Technology & Digital Solutions`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F1F2F4",
    theme_color: "#F1F2F4",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
