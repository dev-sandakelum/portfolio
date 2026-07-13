"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe all current .reveal elements
    function observeAll() {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        io.observe(el);
      });
    }

    observeAll();

    // Re-scan whenever new nodes are added to the document (tab switches)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
