/** @type {import('next').NextConfig} */

// Character frames are never edited in place (a new cut would get a new
// folder), so browsers can keep them for a year. Other media you might swap
// under the same file name (project photos, the film, logos) is cached for a
// week and refreshed in the background, so a replacement shows up promptly.
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
const week = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // AVIF first (smallest), WebP fallback, for everything served via next/image.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/images/character/:path*", headers: immutable },
      { source: "/images/projects/:path*", headers: week },
      { source: "/videos/:path*", headers: week },
      { source: "/brand/:path*", headers: week },
      { source: "/:file(logo.png|logo-compact.png|favicon-mark.png|icon-192.png|icon-512.png)", headers: week },
    ];
  },
};

export default nextConfig;
