"use client";

import { siteConfig } from "@/lib/config";

export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
    siteConfig.whatsappDefaultMessage
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label="Chat on WhatsApp"
      className="group fixed right-4 md:right-6 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105"
      style={{ bottom: "calc(var(--tabbar-h) + env(safe-area-inset-bottom) + 16px)" }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse-ring_2.4s_ease-out_1.5s_3]" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="relative h-[22px] w-[22px] md:h-6 md:w-6" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.36 4 14.94c0 2.35.64 4.55 1.76 6.45L4 29l7.82-1.7a13.05 13.05 0 0 0 4.2.7c6.62 0 12.02-5.36 12.02-11.94C28.04 8.36 22.64 3 16.02 3zm0 21.6c-1.4 0-2.75-.32-3.98-.94l-.28-.14-4.66 1 1.02-4.5-.18-.3a9.5 9.5 0 0 1-1.5-5.18c0-5.24 4.3-9.5 9.6-9.5 5.29 0 9.6 4.26 9.6 9.5 0 5.24-4.31 9.56-9.62 9.56zm5.4-7.13c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.75-.71 2-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35z" />
      </svg>
    </a>
  );
}
