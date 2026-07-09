"use client";
import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver on #contact.
 * When ≥50% visible → sets data-theme="contact" on <html>.
 * When leaving      → removes it.
 * CSS transitions on :root vars handle the smooth colour shift.
 */
export default function ContactThemeSync() {
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

  return null;
}
