"use client";

import { usePathname } from "next/navigation";

// Each route mounts inside a freshly keyed wrapper that plays a short
// entrance (fade + lift). The fill mode is `backwards`, not `both`: once the
// entrance ends the wrapper keeps no transform, so the whole page is not left
// promoted to one giant GPU layer (heavy on phones) and fixed/sticky
// children behave normally. Entrance-only by design: the App
// Router has already unmounted the old page by the time a wrapper could
// animate it out, and waiting on that exit is what left pages blank before.

export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-[pageIn_0.45s_cubic-bezier(0.22,1,0.36,1)_backwards]">
      {children}
    </div>
  );
}
