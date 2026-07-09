"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",    label: "Home" },
  { id: "contact", label: "Contact" },
];

export default function ScrollDots() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [isContact, setIsContact] = useState(false);

  useEffect(() => {
    const onSectionChange = (e: Event) => {
      const id = (e as CustomEvent).detail?.id;
      if (id) {
        setActive(id);
        setIsContact(id === "contact");
      }
    };
    window.addEventListener("sectionchange", onSectionChange);
    return () => window.removeEventListener("sectionchange", onSectionChange);
  }, []);

  const scrollTo = (id: string) => {
    const index = SECTIONS.findIndex((s) => s.id === id);
    if (index !== -1 && typeof (window as unknown as Record<string, unknown>).__portfolioGoTo === "function") {
      ((window as unknown as Record<string, unknown>).__portfolioGoTo as (i: number) => void)(index);
    }
  };

  // Dot colours adapt to current theme
  const inactiveColor = isContact ? "rgba(74,59,128,0.35)" : "rgba(255,255,255,0.22)";
  const activeGlow    = isContact ? "0 0 14px rgba(134,103,194,0.7)" : "0 0 14px rgba(156,106,222,0.6)";
  const activeGrad    = isContact
    ? "linear-gradient(180deg,#8667C2 0%,#E573AB 100%)"
    : "var(--gradient)";

  return (
    <div
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive  = active === id;
        const isHovered = hovered === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Go to ${label}`}
            title={label}
            style={{
              width:        isActive ? 10 : 6,
              height:       isActive ? 26 : 6,
              borderRadius: 100,
              background:   isActive ? activeGrad : inactiveColor,
              border:       "none",
              padding:      0,
              cursor:       "pointer",
              transition:   "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              boxShadow:    isActive ? activeGlow : "none",
              transform:    isHovered && !isActive ? "scale(1.6)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}
