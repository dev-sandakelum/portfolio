"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",    label: "Home" },
  { id: "contact", label: "Contact" },
];

export default function ScrollDots() {
  const [active,  setActive]  = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onSectionChange = (e: Event) => {
      const id = (e as CustomEvent).detail?.id;
      if (id) setActive(id);
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

  return (
    <div
      className="fixed right-6 top-1/2 z-50 -translate-y-1/2 flex-col items-center gap-3"
      style={{ display: "flex" }}
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
            /* data attrs let CSS drive all colour/size transitions */
            data-active={isActive ? "true" : undefined}
            data-hovered={isHovered && !isActive ? "true" : undefined}
            className="scroll-dot"
          />
        );
      })}
    </div>
  );
}
