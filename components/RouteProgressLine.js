"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// A thin gold line that sweeps across the top of the viewport the instant a
// navigation starts, giving immediate visual feedback that the click
// registered — the "did that even work?" pause is what makes navigation
// feel slow, more than the actual transition duration does.

export default function RouteProgressLine() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setActive(true);
    const timer = setTimeout(() => setActive(false), 420);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-[2px] bg-gold-gradient z-[100] transition-all ease-out ${
        active ? "w-full opacity-100 duration-300" : "w-0 opacity-0 duration-150"
      }`}
      aria-hidden="true"
    />
  );
}
