import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  getCategoryInfo,
  CATEGORIES,
} from "@/lib/articles";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) return {};
  return {
    title: `${cat.label} Articles — hasitha-sandakelum`,
    description: cat.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("si-LK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-10">

        {/* Back */}
        <Link
          href="/article"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-slate-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          ලිපි / Articles
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${cat.color} ${cat.textColor} shadow-sm`}>
            {cat.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{cat.label}</h1>
            <p className="text-sm text-slate-500">{cat.description}</p>
          </div>
        </div>

        {/* Articles list */}
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-400">ලිපි නොමැත — ඉක්මනින් එකතු වේ.</p>
            <p className="text-xs text-slate-300 mt-1">No articles yet — coming soon.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {articles.map((article) => (
              <li key={article.meta.id}>
                <Link
                  href={`/article/${category}/${article.meta.id}`}
                  className="group block rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 group-hover:text-slate-900 leading-snug">
                        {article.meta.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                        {article.meta.titleEn}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {article.meta.description}
                      </p>
                    </div>
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-slate-500"
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Tags + meta */}
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-slate-400">{formatDate(article.meta.date)}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-xs text-slate-400">{article.meta.readingTime} min read</span>
                    {article.meta.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
