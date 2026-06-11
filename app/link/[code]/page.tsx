"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getShortlinkByCode } from "@/lib/shortlinks";

export default function LinkRedirectPage() {
  const params = useParams<{ code: string }>();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  const link = code ? getShortlinkByCode(code) : undefined;

  useEffect(() => {
    if (link) {
      window.location.replace(link.destinationUrl);
    }
  }, [link]);

  if (!link) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">Link not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <p className="text-sm text-slate-600">Redirecting…</p>
    </main>
  );
}
