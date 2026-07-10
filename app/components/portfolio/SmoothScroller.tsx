"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["hero", "contact"];

const IS_MOBILE = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

// Quintic ease-in-out for desktop JS scroll
function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function animateScroll(
  container: HTMLElement,
  from: number,
  to: number,
  duration: number,
  onDone?: () => void
) {
  const start = performance.now();
  const delta = to - from;
  function step(now: number) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = from + delta * easeInOutQuint(progress);
    if (progress < 1) requestAnimationFrame(step);
    else onDone?.();
  }
  requestAnimationFrame(step);
}

export default function SmoothScroller() {
  const isScrolling  = useRef(false);
  const currentIndex = useRef(0);

  useEffect(() => {
    const container = document.getElementById("snap-root");
    if (!container) return;

    const mobile = IS_MOBILE();

    if (mobile) {
      // ── MOBILE: hand off entirely to native CSS scroll-snap ──────
      // No JS animation — browser handles touch physics natively (no lag)
      container.style.scrollSnapType = "y mandatory";
      (container.style as unknown as Record<string, string>)["webkitOverflowScrolling"] = "touch";
      // Fire sectionchange on scroll so ScrollDots stay in sync
      const onScroll = () => {
        const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        let closest = 0, minDist = Infinity;
        sections.forEach((s, i) => {
          const dist = Math.abs(s.offsetTop - container.scrollTop);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        if (closest !== currentIndex.current) {
          currentIndex.current = closest;
          window.dispatchEvent(new CustomEvent("sectionchange", { detail: { id: SECTION_IDS[closest] } }));
        }
      };
      container.addEventListener("scroll", onScroll, { passive: true });

      // Expose a goTo for ScrollDots that uses scrollIntoView (native, smooth)
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const goTo = (index: number) => {
        sections[index]?.scrollIntoView({ behavior: "smooth" });
        currentIndex.current = index;
        window.dispatchEvent(new CustomEvent("sectionchange", { detail: { id: SECTION_IDS[index] } }));
      };
      (window as unknown as Record<string, unknown>).__portfolioGoTo = goTo;

      // Snap to hero on load
      goTo(0);

      return () => {
        container.removeEventListener("scroll", onScroll);
        delete (window as unknown as Record<string, unknown>).__portfolioGoTo;
      };
    }

    // ── DESKTOP: JS-driven smooth scroll ────────────────────────────
    container.style.scrollSnapType = "none";

    const getSections = () =>
      SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const goTo = (index: number) => {
      const secs = getSections();
      if (index < 0 || index >= secs.length || isScrolling.current) return;
      isScrolling.current  = true;
      currentIndex.current = index;
      window.dispatchEvent(new CustomEvent("sectionchange", { detail: { id: SECTION_IDS[index] } }));
      animateScroll(container, container.scrollTop, secs[index].offsetTop, 1000,
        () => { isScrolling.current = false; });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const secs = getSections();
      let closest = 0, minDist = Infinity;
      secs.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - container.scrollTop);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      currentIndex.current = closest;
      goTo(e.deltaY > 0 ? Math.min(closest + 1, secs.length - 1) : Math.max(closest - 1, 0));
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goTo(Math.min(currentIndex.current + 1, SECTION_IDS.length - 1)); }
      if (["ArrowUp",  "PageUp"].includes(e.key))         { e.preventDefault(); goTo(Math.max(currentIndex.current - 1, 0)); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End")  { e.preventDefault(); goTo(SECTION_IDS.length - 1); }
    };

    (window as unknown as Record<string, unknown>).__portfolioGoTo = goTo;

    container.addEventListener("wheel",   onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    goTo(0);

    return () => {
      container.removeEventListener("wheel",   onWheel);
      window.removeEventListener("keydown", onKey);
      delete (window as unknown as Record<string, unknown>).__portfolioGoTo;
    };
  }, []);

  return null;
}
