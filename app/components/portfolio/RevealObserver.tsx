"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const container = document.getElementById("snap-root");
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      {
        root: container ?? null,
        threshold: 0.12,
      }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
