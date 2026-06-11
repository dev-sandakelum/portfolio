"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getShortlinkByCode } from "@/lib/shortlinks";

export default function LinkRedirectPage() {
  const params = useParams<{ slug: string[] }>();
  const code = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const link = code ? getShortlinkByCode(code) : undefined;
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // fade in
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!link) return;

    // animate progress bar to ~90% quickly, then stall until redirect
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = elapsed / duration;
      // ease-out curve, caps at 0.92
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 3);
      setProgress(Math.min(eased * 92, 92));
      if (elapsed < duration) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => window.location.replace(link.destinationUrl), 200);
    }, duration);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [link]);

  if (!link) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div
          className="text-center transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">Link not found</h1>
          <a href="/link" className="mt-6 inline-block text-sm text-indigo-500 hover:underline">
            ← Back to links
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-50 px-4">

      {/* Progress bar at top */}
      <div className="fixed inset-x-0 top-0 h-0.5 bg-slate-100">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 100 ? "200ms" : "100ms",
            transitionTimingFunction: "ease-out",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-lg transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        {/* Icon */}
        {link.icon ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm">
            <Image
              src={link.icon}
              alt={link.label}
              width={48}
              height={48}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-sm">
            {code.split("/").pop()?.toUpperCase() ?? "→"}
          </div>
        )}

        {/* Label */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Redirecting you to</p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">{link.label}</h1>
          {link.subtitle && (
            <p className="mt-1 text-sm text-slate-400">{link.subtitle}</p>
          )}
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-indigo-400"
              style={{
                animation: "bounce 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Destination */}
        <p className="max-w-xs truncate text-center text-xs text-slate-300">
          {link.destinationUrl}
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
