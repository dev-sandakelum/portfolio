"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "education",
  "skills",
  "projects",
  "community",
  "contact",
];

// Ease in-out cubic
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = from + delta * easeInOutCubic(progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  }

  requestAnimationFrame(step);
}

export default function SmoothScroller() {
  const isScrolling = useRef(false);
  const currentIndex = useRef(0);

  useEffect(() => {
    const container = document.getElementById("snap-root");
    if (!container) return;

    // Remove CSS snap so our JS takes full control
    container.style.scrollSnapType = "none";

    const getSections = () =>
      SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const goTo = (index: number) => {
      const sections = getSections();
      if (index < 0 || index >= sections.length) return;
      if (isScrolling.current) return;

      isScrolling.current = true;
      currentIndex.current = index;

      // Dispatch custom event so ScrollDots can sync
      window.dispatchEvent(
        new CustomEvent("sectionchange", { detail: { id: SECTION_IDS[index] } })
      );

      animateScroll(
        container,
        container.scrollTop,
        sections[index].offsetTop,
        820,           // duration ms — tweak for feel
        () => {
          isScrolling.current = false;
        }
      );
    };

    // ── Wheel ──────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const sections = getSections();
      // Find closest section by current scrollTop
      let closest = 0;
      let minDist = Infinity;
      sections.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - container.scrollTop);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      currentIndex.current = closest;

      const next = e.deltaY > 0
        ? Math.min(closest + 1, sections.length - 1)
        : Math.max(closest - 1, 0);

      goTo(next);
    };

    // ── Touch ──────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore tiny swipes

      const sections = getSections();
      let closest = 0;
      let minDist = Infinity;
      sections.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - container.scrollTop);
        if (dist < minDist) { minDist = dist; closest = i; }
      });

      const next = delta > 0
        ? Math.min(closest + 1, sections.length - 1)
        : Math.max(closest - 1, 0);

      goTo(next);
    };

    // ── Keyboard ───────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(currentIndex.current + 1, SECTION_IDS.length - 1));
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(currentIndex.current - 1, 0));
      }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End")  { e.preventDefault(); goTo(SECTION_IDS.length - 1); }
    };

    // ── Expose goTo globally for ScrollDots ───────────
    (window as unknown as Record<string, unknown>).__portfolioGoTo = goTo;

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    // Snap on first load to hero
    goTo(0);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      delete (window as unknown as Record<string, unknown>).__portfolioGoTo;
    };
  }, []);

  return null;
}
