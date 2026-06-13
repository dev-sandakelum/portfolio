import Link from "next/link";
import { CATEGORIES, getCategoryCounts, getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles — hasitha-sandakelum",
  description: "Tech articles in Sinhala and English covering GitHub, Azure, and more.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("si-LK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesIndexPage() {
  const counts = getCategoryCounts();
  const recent = getAllArticles().slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-14">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
            hasitha-sandakelum
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            ලිපි <span className="text-slate-400 text-2xl font-normal">/ Articles</span>
          </h1>
          <p className="text-sm text-slate-500">
            සිංහල සහ English මාධ්‍යයෙන් tech ලිපි — GitHub, Azure, සහ තවත් බොහෝ ක්ෂේත්‍ර.
          </p>
        </div>

        {/* Category Grid */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            ප්‍රවර්ග / Categories
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/article/${cat.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${cat.color} ${cat.textColor}`}>
                  {cat.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 group-hover:text-slate-900">
                    {cat.label}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{cat.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    {counts[cat.slug] ?? 0}
                  </span>
                  <svg
                    className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        {recent.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              මෑත ලිපි / Recent Articles
            </h2>
            <ul className="space-y-3">
              {recent.map((article) => {
                const cat = CATEGORIES.find((c) => c.slug === article.meta.category);
                return (
                  <li key={`${article.meta.category}/${article.meta.id}`}>
                    <Link
                      href={`/article/${article.meta.category}/${article.meta.id}`}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                    >
                      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${cat?.color ?? "bg-slate-700"} ${cat?.textColor ?? "text-white"}`}>
                        {cat?.icon ?? "📄"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 leading-snug">
                          {article.meta.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400 truncate">
                          {article.meta.description}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-slate-400">{formatDate(article.meta.date)}</span>
                          <span className="text-slate-200">·</span>
                          <span className="text-xs text-slate-400">{article.meta.readingTime} min read</span>
                        </div>
                      </div>
                      <svg
                        className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-slate-500"
                        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
