"use client";

import { usePathname } from "next/navigation";

// Each route mounts inside a freshly keyed wrapper that plays a short
// entrance (fade + lift + slight de-blur). Entrance-only by design: the App
// Router has already unmounted the old page by the time a wrapper could
// animate it out, and waiting on that exit is what left pages blank before.

export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-[pageIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
      {children}
    </div>
  );
}
