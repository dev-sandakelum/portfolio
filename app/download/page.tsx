import Link from "next/link";
import { SKILL_CATEGORIES, getSkillCategoryCounts } from "@/lib/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads — hasitha-sandakelum",
  description: "Free downloadable skill sheets, cheat sheets, and learning resources.",
};

export default function DownloadIndexPage() {
  const counts = getSkillCategoryCounts();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl space-y-12">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            hasitha-sandakelum
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Downloads
          </h1>
          <p className="text-sm text-slate-500">
            නොමිළේ downloadable skill sheets, cheat sheets සහ learning resources.
          </p>
        </div>

        {/* Category grid */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Categories
          </h2>
          <div className="space-y-3">
            {SKILL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/download/${cat.slug}/skill`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${cat.color} ${cat.textColor}`}>
                  {cat.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 group-hover:text-slate-900">
                    {cat.label}
                    <span className="ml-2 text-xs font-normal text-slate-400">/ {cat.labelSi}</span>
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{cat.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-600">
                    {counts[cat.slug] ?? 0} files
                  </span>
                  <svg className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
