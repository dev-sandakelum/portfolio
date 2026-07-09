"use client";
import { useEffect, useRef } from "react";

/**
 * Mounts an IntersectionObserver on #contact.
 * When ≥50% visible → sets data-theme="contact" on <html>.
 * When leaving      → removes it.
 *
 * Also renders a fixed full-viewport bg image div (covers nav too)
 * that fades in/out via CSS driven by [data-theme="contact"].
 */
export default function ContactThemeSync() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.setAttribute("data-theme", "contact");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="contact-bg-fixed"
    />
  );
}
